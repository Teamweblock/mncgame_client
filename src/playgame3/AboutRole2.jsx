

// AboutRole.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePeerConnection } from './PeerContext';
import icon1 from "../Assets/gameimages/icon1.png";
import logo from "../Assets/gameimages/mnclogo2.png";
import img1 from "../Assets/gameimages/img9.png";
import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import "../Assets/CSS/Game3/AboutRole.css"

const AboutRole2 = () => {
  const [modalVisible, setModalVisible] = useState(false); 
  const [offset, setOffset] = useState({ x: 0, y: 0 });

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
  const navigate = useNavigate();
  const {
    peerId,
    remotePeerIdValue,
    setRemotePeerIdValue,
    call,
    handleRandomCall,
  } = usePeerConnection();

  const handleCallAndNavigate = (remotePeerId) => {
    call(remotePeerId);
    navigate('/endmeeting');
  };
  const handleEndmeeting = () => {
    // navigate("/endmeeting", { state: { autoCall: true } });
    navigate('/endmeeting');
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  
  return (
    <>
      <div className="Game3-bg2">
        <img src={logo} className="mnc-logo" alt="Logo" />
        <img src={icon1} className="icon1-game3" alt="Icon" style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}/>
        <div className="aboutrole-width">
          <div className="about-group">
            <div className="about-img">
              <img src={img1} className="aboutimg" alt="About" />
            </div>
            <div className="about-para">

              <h2 className="about-role-title">About Role</h2>
              <p className="about-role-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
              </p>
              <p className="about-role-text">
                When an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged.
              </p>
              <h1>CFO</h1>
            </div>

            {/* <div className="dropdown show">
              <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown link
              </a>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <a className="dropdown-item" onClick={handleEndmeeting} href="#">Meeting with Your Team</a>
                <a className="dropdown-item" href="#">Meeting with Other Team</a>
              </div>
            </div> */}
          
          </div>
        
        </div>
        <div className='text-center btn-group2'>
          <button className='meeting1' onClick={handleEndmeeting}>Meeting with Your Team</button>
           <button className='meeting2'>Meeting with Other Team</button>
           </div>

        <Modal
          isOpen={modalVisible}
          onRequestClose={closeModal}
          contentLabel="Meeting Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          <h2 >Meeting with Your Team</h2>
          <p>Meeting Id:{peerId}</p>
          <button onClick={closeModal}>Close</button>
        </Modal>
        {/* <h6 className='game-footer-text'><span style={{fontWeight:"700", color:"white"}}>MULTI</span> NETWORKING COMPANY</h6> */}
      </div>
    </>
  );
};

export default AboutRole2;
