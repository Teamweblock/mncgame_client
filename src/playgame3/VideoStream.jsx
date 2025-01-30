import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
        toast({
          title: "Media Error",
          description: "Could not access camera or microphone",
          duration: 3000,
        });
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

  return (
    <div className="relative w-full h-full min-h-[200px] glass-card overflow-hidden rounded-lg">
      {isVideoEnabled ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={player?.imgSrc}
          alt={player?.role}
          className="rounded-full w-36 h-36 mb-4 border-4 border-gray-200 shadow-md"
        />
      )}
    </div>
  );
};
