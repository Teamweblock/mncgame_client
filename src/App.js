import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./Auth/LoginPage";
import SignUppage from "./Auth/SignUppage";
import Game1 from "./Games/Game1";
import Navbar from "./Common/navbar/navbar";
import RegisterForm from "./Auth/RegisterForm";
import Home from "../src/Home/Home";
import GameHome from "../src/GamePage/GameHome";
import WelcomePageGame1 from "./playgame1/game1welcomepage/WelcomePageGame1";
import Game1Players from "./playgame1/Game1Players";
import Game1SinglePlayer from "./playgame1/Game1SinglePlayer";
import Game1MultiPlayer from "./playgame1/Game1MultiPlayers";
import WelcomePageGame3 from "./playgame3/game3welcomepage/WelcomePageGame3";
import Game1Result from "./playgame1/Game1Result";
import Game1Result2 from "./playgame1/Game1Result2";
import WelcomePageGame2 from "./playgame2/game1welcomepage/WelcomePageGame2";
import Game2Questions from "./playgame2/Game2Questions";
import ChooseRole from "./playgame3/ChooseRole";
import AboutRole from "./playgame3/AboutRole";
import EndmeetingPage from "./playgame3/EndmeetingPage";
import Game3Result from "./playgame3/game3welcomepage/Game3Result";
import Game2Result from "./playgame2/Game2Result";
import GroupVideoCall from "./playgame3/GroupVideoCall";
import AboutRole2 from "./playgame3/AboutRole2";
import AboutRole3 from "./playgame3/AboutRole3";
import GroupVideoCall2 from "./playgame3/GroupVideoCall2";
import GroupVideoCall3 from "./playgame3/GroupVideoCall3";
import VideoCall from "./playgame3/VideoCall";
import VideoCall2 from "./playgame3/VideoCall2";
import CuurentPersonResult from "./playgame3/Gane3Result/CuurentPersonResult";
import Person1Result from "./playgame3/Gane3Result/Person1Result";
import Person2Result from "./playgame3/Gane3Result/Person2Result";
import Person3Result from "./playgame3/Gane3Result/Person3Result";
import Footer from "../src/Common/Footer";
import AboutPage from "./componets/AboutPage";
import Contact from "./Auth/Contact";
import { ToastContainer } from "react-toastify";
import Game2LevelPage from "./playgame2/Game2LevelPage";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
import Game1WaitingPage from "./playgame1/Game1WaitingPage";
import Overview from "./Profile/OverView";
import Statics from "./Profile/Statics";
import UpdateProfile from "./Profile/UpdateProfile";
import CheckMail from "./Auth/CheckMail";
import Congrates from "./Auth/Congrates";
import Game1SingleLevelPage from "./playgame1/Game1SingleLevelPage";
import Game1MultipleLevelPage from "./playgame1/Game1MultipleLevelPage";
import SwipeSide from "./Home/Testimonials";
import MultiplayerWaitingPage from "./playgame1/MultiplayerWaitingPage";
import Popup from "./playgame1/Popup";

const App = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token || isTokenExpired(token)) {
  //     // If token doesn't exist or is expired
  //     localStorage.removeItem("token");
  //     navigate("/login");
  //   } else {
  //     // Decode the token and calculate remaining time until expiration
  //     const decoded = JSON.parse(atob(token.split(".")[1]));
  //     const timeUntilExpiration = (decoded.exp * 1000) - Date.now(); // Convert to milliseconds

  //     // Set a timeout to handle auto-logout
  //     const timeout = setTimeout(() => {
  //       localStorage.removeItem("token");
  //       navigate("/login");
  //     }, timeUntilExpiration);

  //     // Cleanup timeout on component unmount
  //     return () => clearTimeout(timeout);
  //   }
  // }, [navigate]);

  const noNavbarPaths = [
    "/login",
    "/forgotPassword",
    "/resetaPassword/:token",
    "/person1result",
    "/person2result",
    "/person3result",
    "/curruntpersonresult",
    "/videocalls",
    "/videocalls2",
    "/aboutrole3",
    "/videocall2",
    "/videocall3",
    "/aboutrole2",
    "/aboutrole3",
    "/videocall",
    "/game2result",
    "/game3result",
    "/endmeeting",
    "/aboutrole",
    "/chooserole",
    "/welcomepagegame1",
    "/welcomepagegame3",
    "/game2question",
    "/signup",
    "/registerform",
    "/game1",
    "/welcomepage",
    "/game1players",
    "/game1singleplayer",
    "/game1multiplayer",
    "/game1result",
    "/welcomepagegame2",
    "/game1result2",
    "/game2levelpage",
    "/user-profile",
    // "/game1levelpage",
    "/game1singlelevelpage",
    "/game1multiplelevelpage",
    "/user-profile",
    "/waiting-player"


  ];
  return (
    <div>
      {!noNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/games" element={<GameHome />} />
        <Route path="/game1" element={<Game1 />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetaPassword/:token" element={<ResetPassword />} />
        <Route path="/signup" element={<SignUppage />} />
        <Route path="/registerform" element={<RegisterForm />} />
        <Route path="/welcomepagegame1" element={<WelcomePageGame1 />} />
        <Route path="/game1players" element={<Game1Players />} />
        <Route path="/game1singleplayer" element={<Game1SinglePlayer />} />
        <Route path="/game1multiplayer" element={<Game1MultiPlayer />} />
        <Route path="/game1waiting" element={<Game1WaitingPage />} />
        <Route path="/game1result" element={<Game1Result />} />
        <Route path="/game1result2" element={<Game1Result2 />} />
        {/* <Route path="/game1levelpage" element={<Game1LevelPage />} /> */}
        <Route path="/game1singlelevelpage" element={<Game1SingleLevelPage />} />
        <Route path="/game1multiplelevelpage" element={<Game1MultipleLevelPage />} />
        <Route path="/game2levelpage" element={<Game2LevelPage />} />
        <Route path="/welcomepagegame2" element={<WelcomePageGame2 />} />
        <Route path="/game2question" element={<Game2Questions />} />
        <Route path="/welcomepagegame3" element={<WelcomePageGame3 />} />
        <Route path="/chooserole" element={<ChooseRole />} />
        <Route path="/aboutrole" element={<AboutRole />} />
        <Route path="/endmeeting" element={<EndmeetingPage />} />
        <Route path="/game3result" element={<Game3Result />} />
        <Route path="/game2result" element={<Game2Result />} />
        <Route path="/videocall" element={<GroupVideoCall />} />
        <Route path="/videocall2" element={<GroupVideoCall2 />} />
        <Route path="/videocall3" element={<GroupVideoCall3 />} />
        <Route path="/aboutrole2" element={<AboutRole2 />} />
        <Route path="/aboutrole3" element={<AboutRole3 />} />
        <Route path="/videocalls" element={<VideoCall />} />
        <Route path="/videocalls2" element={<VideoCall2 />} />
        <Route path="/curruntpersonresult" element={<CuurentPersonResult />} />
        <Route path="/person1result" element={<Person1Result />} />
        <Route path="/person2result" element={<Person2Result />} />
        <Route path="/person3result" element={<Person3Result />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contactus" element={<Contact />} />

        <Route path="/profile/overview" element={<Overview />} />
        <Route path="/profile/statistics" element={<Statics />} />
        <Route path="/profile/update" element={<UpdateProfile />} />
        <Route path="/checkMail" element={<CheckMail />} />
        <Route path="/congrates" element={<Congrates />} />

        <Route path="/swipersie" element={<SwipeSide />} />
        <Route path="/waiting-player" element={<MultiplayerWaitingPage />} />
        <Route path="/popup" element={<Popup />} />


      </Routes>
      {!noNavbarPaths.includes(location.pathname) && <Footer />}
      <ToastContainer />
    </div>
  );
};

export default App;
