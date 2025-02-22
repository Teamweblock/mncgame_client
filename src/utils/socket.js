// socket.js
import { io } from "socket.io-client";

const socket = io(process.env.BACKEND_URL || "http://localhost:8000", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;
