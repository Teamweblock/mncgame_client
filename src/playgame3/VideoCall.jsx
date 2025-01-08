
import { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';

function VideoCall() {
  const [peerId, setPeerId] = useState('');
  const [remoteStreams, setRemoteStreams] = useState([null, null, null]);
  const [randomPeerIds, setRandomPeerIds] = useState([]);
  const remoteVideoRefs = [useRef(null), useRef(null), useRef(null)];
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
      console.log('Incoming call from:', call.peer);
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          if (currentUserVideoRef.current && !currentUserVideoRef.current.srcObject) {
            currentUserVideoRef.current.srcObject = mediaStream;
            currentUserVideoRef.current.onloadedmetadata = () => {
              currentUserVideoRef.current.play();
            };
          }
          call.answer(mediaStream);
          call.on('stream', (remoteStream) => {
            console.log('Received remote stream from:', call.peer);
            setRemoteStreams((prevStreams) => {
              const updatedStreams = [...prevStreams];
              for (let i = 0; i < updatedStreams?.length; i++) {
                if (!updatedStreams[i]) {
                  updatedStreams[i] = remoteStream;
                  break;
                }
              }
              return updatedStreams;
            });
          });
        })
        .catch((err) => {
          console.error('Failed to get local stream', err);
        });
    });

    peerInstance.current = peer;
  }, []);

  useEffect(() => {
    for (let i = 0; i < remoteStreams?.length; i++) {
      if (remoteVideoRefs[i].current && remoteStreams[i]) {
        remoteVideoRefs[i].current.srcObject = remoteStreams[i];
        remoteVideoRefs[i].current.onloadedmetadata = () => {
          remoteVideoRefs[i].current.play();
        };
      }
    }
  }, [remoteStreams]);

  const call = (remotePeerId, index) => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        if (currentUserVideoRef.current && !currentUserVideoRef.current.srcObject) {
          currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.onloadedmetadata = () => {
            currentUserVideoRef.current.play();
          };
        }

        const call = peerInstance.current.call(remotePeerId, mediaStream);
        call.on('stream', (remoteStream) => {
          console.log('Streaming to:', remotePeerId);
          setRemoteStreams((prevStreams) => {
            const updatedStreams = [...prevStreams];
            updatedStreams[index] = remoteStream;
            return updatedStreams;
          });
        });
        call.on('error', (err) => {
          console.error('Call error with peer:', remotePeerId, err);
        });
      })
      .catch((err) => {
        console.error('Failed to get local stream', err);
      });
  };

  const shuffleArray = (array) => {
    let currentIndex = array?.length, randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const handleRandomCall = () => {
    setRemoteStreams([null, null, null]); // Reset streams
    const shuffledData = shuffleArray([...data]);
    const selectedPeers = shuffledData.slice(0, 3);
    setRandomPeerIds(selectedPeers.map(peer => peer.person));
    selectedPeers.forEach((peer, index) => {
      // Assume peer.person is a valid peer ID for demonstration purposes
      call(peer.person, index);
    });
  };

  const handleShowAllRemoteVideos = () => {
    // This function will handle showing all remote video streams
    setRemoteStreams([null, null, null]); // Clear current streams
    randomPeerIds.forEach((peerId, index) => {
      call(peerId, index); // Call each peer and update streams
    });
  };

  return (
    <div className="App">
      <h1>Current user id is {peerId}</h1>
      <button onClick={handleRandomCall}>Call Random 3 Members</button>
      <button onClick={handleShowAllRemoteVideos}>Show All Remote Videos</button>
      <div>
        <video ref={currentUserVideoRef} autoPlay playsInline style={{ width: '300px' }} />
      </div>
      <div>
        <video ref={remoteVideoRefs[0]} autoPlay playsInline style={{ width: '300px' }} />
        <video ref={remoteVideoRefs[1]} autoPlay playsInline style={{ width: '300px' }} />
        <video ref={remoteVideoRefs[2]} autoPlay playsInline style={{ width: '300px' }} />
      </div>
      <div>
        <h2>Random Peer IDs:</h2>
        <ul>
          {randomPeerIds.map((id, index) => (
            <li key={index}>{id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default VideoCall;
