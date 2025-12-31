const jwt = require("jsonwebtoken");
const Chat = require("./models/chat.model");
const Notification = require("./models/notification.model");
const User = require("./models/User.model");
const RoomMember = require("./models/room_member.model");
const RoomMessage = require("./models/room_message.model");
const RoomModel = require("./models/room_member.model");
const ResourceRequest = require("./models/resource_request.model");

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

  REQUEST_NOTIFICATION: "request:notification",
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
      socket.handshake.auth?.token || socket.handshake.headers?.authorization;

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
    socket.emit(EVENTS.PRESENCE_SNAPSHOT, {
      onlineUserIds: getOnlineUserIds(),
    });

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
      //   console.log("DM_SEND from", userId, "to", to, "msg:", message);
      if (!to || !message?.trim()) return;

      const room = DM_ROOM(userId, to);
      let notification = {};
      try {
        await Chat.create({
          sender: userId,
          receiver: to,
          message,
          isRead: false,
        });
        const answer = await Notification.create({
          user: to,
          type: "dm",
          sender: userId,
          message: message?.slice(0, 50) || "",
          isRead: false,
        });
        const populated = await answer.populate("sender");
        await User.findByIdAndUpdate(answer.sender, {
          $addToSet: { notifications: answer._id },
        });
        notification = populated;
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
      console.log("DM notification", notification);
      io.to(USER_ROOM(to)).emit(EVENTS.DM_NOTIFICATION, {
        user: notification.user,
        type: notification.type,
        sender: notification.sender,
        message: notification.message,
        isRead: notification.isRead,
        createdAt: notification.createdAt,
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

      if (!isMember) return;

      // save message
      let saved;
      try {
        saved = await RoomMessage.create({
          room: roomId,
          sender: userId,
          message: message.trim(),
        });
        const roomMembers = await RoomMember.find({ room: roomId });
        const to = roomMembers.filter((member) => member.user !== userId);
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

      try {
        const members = await RoomMember.find({ room: roomId }).populate(
          "user"
        );

        for (const m of members) {
          // لا تبعت إشعار لنفسك
          if (String(m.user._id) === String(userId)) continue;

          let notification = await Notification.create({
            type: "room",
            user: m.user._id, // receiver
            sender: userId,
            room: roomId,
            message: message?.slice(0, 50) || "",
            isRead: false,
          });

          notification = await notification.populate("sender user room");

          // خزّن الإشعار عند العضو
          await User.findByIdAndUpdate(m.user._id, {
            $addToSet: { notifications: notification._id },
          });

          console.log("notification", notification);
          io.to(USER_ROOM(m.user._id)).emit(EVENTS.ROOM_NOTIFICATION, {
            _id: notification._id,
            user: notification.user,
            type: notification.type,
            sender: notification.sender,
            room: notification.room,
            message: notification.message,
            isRead: notification.isRead,
            createdAt: notification.createdAt,
          });
        }
      } catch (e) {
        console.error("ROOM_NOTIFICATION error:", e);
      }
    });
    socket.on("request:create", async ({ requestId }) => {
      console.log("request:create", requestId);
      if (!requestId) return;

      try {
        const request = await ResourceRequest.findById(requestId).populate(
          "resource owner requestor"
        );
        if (!request) return;

        // Notify owner
        const notification = await Notification.create({
          type: "request",
          user: request.owner._id,
          sender: request.requestor._id,
          resource: request.resource._id,
          message: `${request.requestor.name} requested access to ${request.resource.title}`,
          isRead: false,
        });

        await User.findByIdAndUpdate(request.owner._id, {
          $addToSet: { notifications: notification._id },
        });

        const fullNotification = await notification.populate("sender resource");
        console.log("fullNotification", fullNotification);
        io.to(USER_ROOM(request.owner._id)).emit(EVENTS.REQUEST_NOTIFICATION, {
          ...fullNotification.toObject(),
          request: request,
        });
      } catch (err) {
        console.error("request:create error:", err);
      }
    });

    socket.on("request:update", async ({ requestId }) => {
      console.log("request:update", requestId);
      if (!requestId) return;

      try {
        const request = await ResourceRequest.findById(requestId).populate(
          "resource owner requestor"
        );
        if (!request) return;

        // Notify requester
        const notification = await Notification.create({
          type: "request",
          user: request.requestor._id,
          sender: request.owner._id,
          resource: request.resource._id,
          message: `Your request for ${request.resource.title} has been ${request.status}`,
          isRead: false,
        });

        await User.findByIdAndUpdate(request.requestor._id, {
          $addToSet: { notifications: notification._id },
        });

        const fullNotification = await notification.populate("sender resource");

        io.to(USER_ROOM(request.requestor._id)).emit(
          EVENTS.REQUEST_NOTIFICATION,
          {
            ...fullNotification.toObject(),
            request: request,
          }
        );
      } catch (err) {
        console.error("request:update error:", err);
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
