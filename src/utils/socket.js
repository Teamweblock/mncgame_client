// socket.js
import { io } from "socket.io-client";

const socket = io("http://13.127.231.142:8000", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;
