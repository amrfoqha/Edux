const jwt = require("jsonwebtoken");
const Chat = require("./models/chat.model");
const User = require("./models/User.model");
const RoomMember = require("./models/room_member.model");
const RoomMessage = require("./models/room_message.model");

const EVENTS = Object.freeze({
    PRESENCE_SNAPSHOT: "presence:snapshot",
    USER_STATUS: "user:status",
    JOIN_DM: "join:dm",
    LEAVE_DM: "leave:dm",
    DM_SEND: "dm:send",
    DM_RECEIVE: "dm:receive",
    DM_NOTIFICATION: "dm:notification",

    JOIN_ROOM: "room:join",
    LEAVE_ROOM: "room:leave",
    ROOM_SEND: "room:send",
    ROOM_RECEIVE: "room:receive",
    ROOM_NOTIFICATION: "room:notification",
});

const USER_ROOM = (userId) => `user:${userId}`;
const DM_ROOM = (a, b) => `dm:${[String(a), String(b)].sort().join("-")}`;

const ROOM_ROOM = (roomId) => `room:${roomId}`;

module.exports = function (io) {
    // userId -> Set(socketId) (supports multi-tab)
    const userSockets = new Map();

    const addSocket = (userId, socketId) => {
        const set = userSockets.get(userId) ?? new Set();
        set.add(socketId);
        userSockets.set(userId, set);
        return set.size;
    };

    const removeSocket = (userId, socketId) => {
        const set = userSockets.get(userId);
        if (!set) return 0;
        set.delete(socketId);
        if (set.size === 0) userSockets.delete(userId);
        return set.size;
    };

    const getOnlineUserIds = () => Array.from(userSockets.keys());

    const setOnlineStatus = async (userId, isOnline) => {
        await User.findByIdAndUpdate(userId, { isOnline });
        io.emit(EVENTS.USER_STATUS, { userId, isOnline });
        io.emit(EVENTS.PRESENCE_SNAPSHOT, { onlineUserIds: getOnlineUserIds() });
    };

    io.use((socket, next) => {
        const raw =
            socket.handshake.auth?.token ||
            socket.handshake.headers?.authorization;

        if (!raw) return next(new Error("Authentication error: No token provided"));

        const token = raw.startsWith("Bearer ") ? raw.slice(7) : raw;

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.data.userId = decoded.id; // attach userId to socket
            return next();
        } catch (err) {
            return next(new Error("Authentication error: Invalid token"));
        }
    });

    io.on("connection", async (socket) => {
        const userId = socket.data.userId;
        console.log("SOCKET CONNECT", socket.id, "userId:", userId);
        if (!userId) return;

        // Join personal room (for notifications + force logout)
        socket.join(USER_ROOM(userId));

        // Add socket to map
        const count = addSocket(userId, socket.id);

        // Mark online only on first socket
        if (count === 1) {
            try {
                await setOnlineStatus(userId, true);
            } catch (err) {
                console.error("Error setting online:", err);
            }
        }

        //  Send snapshot AFTER adding this socket (so snapshot includes them)
        socket.emit(EVENTS.PRESENCE_SNAPSHOT, { onlineUserIds: getOnlineUserIds() });


        socket.on(EVENTS.JOIN_DM, ({ otherUserId }) => {
            if (!otherUserId) return;
            socket.join(DM_ROOM(userId, otherUserId));
        });

        socket.on(EVENTS.LEAVE_DM, ({ otherUserId }) => {
            if (!otherUserId) return;
            socket.leave(DM_ROOM(userId, otherUserId));
        });

        // Send DM
        socket.on(EVENTS.DM_SEND, async ({ to, message }) => {
            console.log("DM_SEND from", userId, "to", to, "msg:", message);
            if (!to || !message?.trim()) return;

            const room = DM_ROOM(userId, to);

            try {
                await Chat.create({
                    sender: userId,
                    receiver: to,
                    message,
                    isRead: false,
                });
            } catch (err) {
                console.error("Error saving message:", err);
            }

            // Emit to DM viewers
            socket.to(room).emit(EVENTS.DM_RECEIVE, {
                sender: userId,
                receiver: to,
                message,
                createdAt: new Date(),
            });

            // Notify recipient even if not in DM page
            io.to(USER_ROOM(to)).emit(EVENTS.DM_NOTIFICATION, {
                senderId: userId,
                message,
            });
        });

        socket.on("disconnect", async () => {
            const remaining = removeSocket(userId, socket.id);

            // Mark offline only when last socket disconnects
            if (remaining === 0) {
                try {
                    await setOnlineStatus(userId, false);
                } catch (err) {
                    console.error("Error setting offline:", err);
                }
            }
        });

        socket.on(EVENTS.JOIN_ROOM, async ({ id: roomId }) => {
            if (!roomId) return;

            // enforce membership (optional but recommended)
            const isMember = await RoomMember.exists({ room: roomId, user: userId });
            if (!isMember) return; // or socket.emit("room:error", ...)

            socket.join(ROOM_ROOM(roomId));

            // optional: tell others someone joined
            socket.to(ROOM_ROOM(roomId)).emit("room:presence", {
                roomId,
                userId,
                type: "join",
            });
        });

        socket.on(EVENTS.LEAVE_ROOM, async ({ id: roomId }) => {
            if (!roomId) return;

            socket.leave(ROOM_ROOM(roomId));

            socket.to(ROOM_ROOM(roomId)).emit("room:presence", {
                roomId,
                userId,
                type: "leave",
            });
        });

        socket.on(EVENTS.ROOM_SEND, async ({ id: roomId, message }) => {
            console.log(roomId, message);
            if (!roomId || !message?.trim()) return;

            // enforce membership
            const isMember = await RoomMember.exists({ room: roomId, user: userId });
            console.log(isMember);

            if (!isMember) return;

            // save message
            let saved;
            try {
                saved = await RoomMessage.create({
                    room: roomId,
                    sender: userId,
                    message: message.trim(),
                });
            } catch (err) {
                console.error("Error saving room message:", err);
                return;
            }

            const payload = {
                _id: saved._id,
                room: roomId,
                sender: userId,
                message: saved.message,
                createdAt: saved.createdAt,
            };

            // emit to everyone else in room
            socket.to(ROOM_ROOM(roomId)).emit(EVENTS.ROOM_RECEIVE, payload);

            // optional: notify all room members (even if they aren’t inside the room page)
            try {
                const members = await RoomMember.find({ room: roomId }).select("user");
                members.forEach((m) => {
                    const memberId = String(m.user);
                    if (memberId !== String(userId)) {
                        io.to(USER_ROOM(memberId)).emit(EVENTS.ROOM_NOTIFICATION, {
                            roomId,
                            senderId: userId,
                            message: saved.message,
                        });
                    }
                });
            } catch (e) {
                console.error("ROOM_NOTIFICATION error:", e);
            }
        });
    });

    //helper for REST logout: disconnect all sockets and set offline
    io.forceLogoutUser = async (userId) => {
        try {
            await io.in(USER_ROOM(userId)).disconnectSockets(true);
        } catch (err) {
            console.error("forceLogoutUser disconnectSockets error:", err);
        }
        await setOnlineStatus(userId, false);
    };
};
