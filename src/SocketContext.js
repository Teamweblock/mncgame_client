import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Create a context
export const SocketContext = createContext();

// Singleton Socket Client
class SocketClient {
  constructor() {
    if (!SocketClient.instance) {
      this.socket = io(process.env.BACKEND_URL || "http://localhost:8000", {
        withCredentials: true,
        autoConnect: false, // Prevents auto-connect
        reconnection: true, // Ensures auto-reconnect
        reconnectionAttempts: 5, // Number of attempts to reconnect
        reconnectionDelay: 1000, // Delay between attempts
      });
      SocketClient.instance = this;
    }
    return SocketClient.instance;
  }

  connect() {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  disconnect() {
    this.socket.disconnect();
  }

  getSocket() {
    return this.socket;
  }
}

const socketInstance = new SocketClient();

// Provider Component
export const SocketProvider = ({ children }) => {
  const [socket] = useState(socketInstance.getSocket());

  useEffect(() => {
    socket.connect(); // Ensure connection on mount

    // Handle reconnection and rejoin room if needed
    socket.on("connect", () => {
      const roomCode = localStorage.getItem("roomCode");
      if (roomCode) {
        socket.emit("rejoinRoom", { roomCode });
      }
    });

    return () => {
      // Prevent disconnecting on page navigation
      // Only disconnect if the user is actually leaving the app
      window.addEventListener("beforeunload", () => {
        socket.disconnect();
      });
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
