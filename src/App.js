import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
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
import EndmeetingPage from "./playgame3/EndmeetingPage";
import Game3Result from "./playgame3/game3welcomepage/Game3Result";
import Game2Result from "./playgame2/Game2Result";
import Footer from "../src/Common/Footer";
import AboutPage from "./componets/AboutPage";
import Contact from "./Auth/Contact";
import { ToastContainer } from "react-toastify";
import Game2LevelPage from "./playgame2/Game2LevelPage";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";
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
import MeetplayerWaitingPage from "./playgame3/waitingpage";
import Game1MultiplayerResult from "./playgame1/game1multiplayerresult";
import { SocketProvider } from "./SocketContext";


const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Pages where Navbar & Footer should not be shown
  const noNavbarPaths = [
    "/login",
    "/forgotPassword",
    "/resetaPassword/:token",
    "/game2result",
    "/game3result",
    "/endmeeting",
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
    "/game1singlelevelpage",
    "/game1multiplelevelpage",
    "/waiting-player",
    "/meetwaiting-player",
    "/congrates",
    "/checkMail",
    "/game1multiplayerresult",
  ];

  // Function to check token expiration
  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

          if (decodedToken.exp < currentTime) {
            logoutUser();
          }
        } catch (error) {
          console.error("Invalid token:", error);
          logoutUser();
        }
      }
    };

    const logoutUser = () => {
      localStorage.clear();
      navigate("/login"); // Redirect to login page
    };

    checkTokenValidity();

    // Run check every 1 minute to log out users if their token expires
    const interval = setInterval(checkTokenValidity, 60000);
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div>
      <SocketProvider>
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
          <Route path="/game1result" element={<Game1Result />} />
          <Route path="/game1result2" element={<Game1Result2 />} />
          <Route path="/game1multiplayerresult" element={<Game1MultiplayerResult />} />
          <Route path="/game1singlelevelpage" element={<Game1SingleLevelPage />} />
          <Route path="/game1multiplelevelpage" element={<Game1MultipleLevelPage />} />
          <Route path="/game2levelpage" element={<Game2LevelPage />} />
          <Route path="/welcomepagegame2" element={<WelcomePageGame2 />} />
          <Route path="/game2question" element={<Game2Questions />} />
          <Route path="/welcomepagegame3" element={<WelcomePageGame3 />} />
          <Route path="/chooserole" element={<ChooseRole />} />
          <Route path="/endmeeting" element={<EndmeetingPage />} />
          <Route path="/game3result" element={<Game3Result />} />
          <Route path="/game2result" element={<Game2Result />} />
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
          <Route path="/meetwaiting-player" element={<MeetplayerWaitingPage />} />
        </Routes>
        {!noNavbarPaths.includes(location.pathname) && <Footer />}
        <ToastContainer />
      </SocketProvider>
    </div>
  );
};

export default App;
