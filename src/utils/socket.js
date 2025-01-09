// socket.js
import { io } from "socket.io-client";

const socket = io("http://localhost:8000", {
    // const socket = io("https://api.multinetworkingcompany.com", {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});

export default socket;
