
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePeerConnection } from './PeerContext';  // Adjust the import path as necessary
import logo from "../Assets/gameimages/mnclogo2.png";
import icon1 from "../Assets/gameimages/icon1.png";
import "../Assets/CSS/Game3/EndmeetingPage.css"
import Modal from 'react-modal';


const EndmeetingPage = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [modalVisible, setModalVisible] = useState(false); 
  const [videoEnabled, setVideoEnabled] = useState(true); // State to track video
  const [audioEnabled, setAudioEnabled] = useState(true); // State to track audio
  const navigate = useNavigate();
  
  const {
    peerId,
    remotePeerIdValue,
    setRemotePeerIdValue,
    remoteVideoRefs,
    currentUserVideoRef,
    call,
    handleRandomCall,
    toggleVideo,
    toggleAudio
  } = usePeerConnection();

  const handleCopy = () => {
    navigator.clipboard.writeText(peerId)
      .then(() => {
        alert('Peer ID copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy peer ID: ', err);
      });
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const x = (window.innerWidth / 1 - clientX) / 120;
    const y = (window.innerHeight / 1 - clientY) / 120;
    setOffset({ x, y });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handlegame3Result = () => {
    navigate("/game3result");
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleToggleVideo = () => {
    setVideoEnabled(!videoEnabled);
    toggleVideo(); // Call function from context to handle video toggle
  };

  const handleToggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    toggleAudio(); // Call function from context to handle audio toggle
  };
const currentpersonResult=()=>{
  navigate("/curruntpersonresult")

}
const person1Result1=()=>{
  navigate("/person1result")
}
const person1Result2=()=>{
  navigate("/person2result")
}
const person1Result3=()=>{
  navigate("/person3result")
}
  return (
    <>
      <div className="game3-bg">
        <img src={logo} className="mnc-logo" alt="Logo" />
        <img src={icon1} className="icon1-game3" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }} alt="Icon" />
        <div className="endmeeting-width">
          <div className="video-controls">
            <button className="endmeeting-btn text-center m-auto" onClick={showModal}>Start meeting</button>
          </div>
          <div className="inputpeer-group">
            <input
              type="text"
              value={remotePeerIdValue}
              onChange={(e) => setRemotePeerIdValue(e.target.value)}
              placeholder="Enter remote peer ID"
              className="peer-input"
            />
            <button className="join-btn" onClick={() => call(remotePeerIdValue)}>Join</button>
          </div>
          <div className="all-person">
            <div className="images-group-1">
              <video onClick={currentpersonResult} className="person-image" ref={currentUserVideoRef} autoPlay playsInline style={{ width: '300px' }} />
              <video onClick={person1Result1} className="person-image" ref={remoteVideoRefs[0]} autoPlay playsInline style={{ width: '300px' }} />
            </div>
            <div className="images-group-2">
              <video onClick={person1Result2} className="person-image" ref={remoteVideoRefs[1]} autoPlay playsInline style={{ width: '300px' }} />
              <video onClick={person1Result3} className="person-image" ref={remoteVideoRefs[2]} autoPlay playsInline style={{ width: '300px' }} />
            </div>
            <div className="text-center">
              {/* <button onClick={handlegame3Result} className="endmeeting-btn">END MEETING</button> */}
            </div>
          </div>
          <Modal
            isOpen={modalVisible}
            onRequestClose={closeModal}
            contentLabel="Meeting Modal"
            className="Modal"
            overlayClassName="Overlay"
          >
            <h2>Meeting with Your Team</h2>
            <p className="meetingid"><b>Meeting Id:</b> {peerId}</p>
            <div className="modal-btns">
              <button className="modal-btn" onClick={closeModal}>Close</button>
              <button className="modal-btn" onClick={handleCopy}>Copy</button>
            </div>
          </Modal>
        </div>
        {/* <h6 className='game-footer-text'><span style={{fontWeight:"700", color:"white"}}>MULTI</span> NETWORKING COMPANY</h6> */}
      </div>
    </>
  );
};

export default EndmeetingPage;
