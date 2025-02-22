import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentTime = Math.floor(Date.now() / 1000); // Convert milliseconds to seconds

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

    const interval = setInterval(checkTokenValidity, 60000); // Check every 1 minute
    return () => clearInterval(interval);
  }, [navigate]);
};

export default useAuthCheck;
