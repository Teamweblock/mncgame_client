
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

function VideoCall2() {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  // List of potential peers for random selection
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
            for (let i = 0; i < remoteVideoRefs.length; i++) {
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
  }, []);

  const call = (remotePeerId) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);
        call.on('stream', (remoteStream) => {
          for (let i = 0; i < remoteVideoRefs.length; i++) {
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

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <input 
        type="text" 
        value={remotePeerIdValue} 
        onChange={(e) => setRemotePeerIdValue(e.target.value)} 
        placeholder="Enter remote peer ID"
      />
      <button onClick={() => call(remotePeerIdValue)}>Call</button>
      <button onClick={handleRandomCall}>Call Random 3 Members</button>
      <div>
        <video ref={currentUserVideoRef} autoPlay playsInline style={{ width: '300px' }} />
      </div>
      <div>
        <video ref={remoteVideoRefs[0]} autoPlay playsInline style={{ width: '300px' }} />
        <video ref={remoteVideoRefs[1]} autoPlay playsInline style={{ width: '300px' }} />
        <video ref={remoteVideoRefs[2]} autoPlay playsInline style={{ width: '300px' }} />
       
      </div>
    </div>
  );
}

export default VideoCall2;
