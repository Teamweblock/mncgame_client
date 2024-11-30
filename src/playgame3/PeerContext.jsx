
// PeerContext.js
import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import Peer from 'peerjs';

const PeerContext = createContext();

export const usePeerConnection = () => {
  return useContext(PeerContext);
};

export const PeerProvider = ({ children }) => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const data = [
    { id: 1, person: "person-1" },
    { id: 2, person: "person-2" },
    { id: 3, person: "person-3" },
    { id: 4, person: "person-4" }
  ];

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.play();
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            for (let i = 0; i < remoteVideoRefs?.length; i++) {
              if (remoteVideoRefs[i].current && !remoteVideoRefs[i].current.srcObject) {
                remoteVideoRefs[i].current.srcObject = remoteStream;
                remoteVideoRefs[i].current.play();
                break;
              }
            }
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });

    peerInstance.current = peer;

    return () => {
      peerInstance.current.destroy();
    };
  }, []);

  const call = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);
        call.on('stream', (remoteStream) => {
          for (let i = 0; i < remoteVideoRefs?.length; i++) {
            if (remoteVideoRefs[i].current && !remoteVideoRefs[i].current.srcObject) {
              remoteVideoRefs[i].current.srcObject = remoteStream;
              remoteVideoRefs[i].current.play();
              break;
            }
          }
        });
      })
      .catch((err) => {
        console.error('Failed to get local stream', err);
      });
  };

  const generateRandomIds = (num) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num).map(item => item.person);
  };

  const handleRandomCall = () => {
    const randomIds = generateRandomIds(3);
    randomIds.forEach(id => call(id));
  };

  const value = {
    peerId,
    remotePeerIdValue,
    setRemotePeerIdValue,
    remoteVideoRefs,
    currentUserVideoRef,
    call,
    handleRandomCall
  };

  return (
    <PeerContext.Provider value={value}>
      {children}
    </PeerContext.Provider>
  );
};
