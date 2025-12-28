import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
    autoConnect: false,
    transports: ["websocket"],
});

export function setSocketToken(token) {
    if (!token) {
        socket.auth = {};
        return;
    }
    socket.auth = { token: token.startsWith("Bearer ") ? token : `Bearer ${token}` };
}

export default socket;
