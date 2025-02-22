import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify"; // Move this import to the top

const API_URL = process.env.BACKEND_URL || "http://localhost:8000";

export const VideoStream = ({ isAudioEnabled, isVideoEnabled, player }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const initStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: isVideoEnabled,
          audio: isAudioEnabled,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
        setStream(mediaStream);
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    initStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isAudioEnabled, isVideoEnabled]);

  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => {
        track.enabled = isAudioEnabled;
      });
      stream.getVideoTracks().forEach((track) => {
        track.enabled = isVideoEnabled;
      });
    }
  }, [isAudioEnabled, isVideoEnabled, stream]);

  const getInitials = (player) => {
    if (!player?.name) return "?"; // Default if name is missing
    const nameParts = player.name.split(" ");
    return nameParts.length >= 2
      ? `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase()
      : nameParts[0].charAt(0).toUpperCase();
  };

  return (
    <div className="relative w-full h-full min-h-[160px] glass-card overflow-hidden rounded-lg flex justify-center items-center">
      {isVideoEnabled ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      ) : player?.imgSrc ? (
        <img
          src={`${API_URL}/${player?.imgSrc.replace(/\\/g, "/")}`}
          alt={player.role || "Player"}
          className="rounded-full w-36 h-36 mb-4 border-4 border-gray-200 shadow-md"
        />
      ) : (
        <div className="w-36 h-36 flex justify-center items-center text-2xl font-bold bg-gray-300 rounded-full border-4 border-gray-200 shadow-md">
          {getInitials(player)}
        </div>
      )}
    </div>
  );
};
