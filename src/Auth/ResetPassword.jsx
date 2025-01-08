import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Container,
  Alert,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { resetaPassword } from "../utils/axiosInstance";
import { Password } from "@mui/icons-material";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { clientToken: token, newPassword, confirmPassword };
      const response = await resetaPassword(JSON.stringify(payload));
      if (response) {
        setMessage(response.message || "Password reset successfully!");
        navigate("/congrates");
        setError(false);
      }
    } catch (err) {
      setMessage("Error: Unable to reset password");
      setError(true);
    }
  };

  return (
    <>
      {/* <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          // backgroundColor: "#f0f0f0",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          marginTop: "2rem",
        }}
      >
        <Avatar sx={{ backgroundColor: "red", mb: 2 }}>
          <LockIcon />
        </Avatar>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Reset Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TextField
            type="password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <TextField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            required
            variant="outlined"
            sx={{ mb: 3 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: "0.8rem", textTransform: "none" }}
          >
            Reset Password
          </Button>
        </Box>
        {message && (
          <Alert
            severity={error ? "error" : "success"}
            sx={{ mt: 3, width: "100%" }}
          >
            {message}
          </Alert>
        )}
      </Container> */}
      <div className="login-bg-img">
        <div className="container">
          <img
            src="/mainlogo.png sm:block hidden"
            alt=""
            height={45}
            width={120}
            style={{ marginTop: "30px" }}
          />
          <div className="row">
            <div className="col-md-6">
              <img className="login-img" src="/reset.png" alt="Login" />
            </div>
            <div className="col-md-6 d-flex  " style={{ marginTop: "50px" }}>
              <div className="loginform">
                <div className="all-circle">
                  <div className="login-discription">
                    Not logged your account yet?
                  </div>
                  <div className="both-circle">
                    <div className="black-circle">
                      <div className="white-circle"></div>
                    </div>
                    <div className="black-circle">
                      <div className="white-circle"></div>
                    </div>
                    <div className="black-circle">
                      {/* <div className="white-circle"></div> */}
                    </div>
                  </div>
                </div>
                <div className="px-3 py-10">
                  <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-bold py-4 text-center mx-auto">
                    Create New Password ?
                    <p className="text-[1.5rem] max-sm:text-[1.1rem]  md:pt-2 font-bold text-[#ff3a4b] ">
                      Your new password{" "}
                      <span className="text-black">
                        must be different from previous used password
                      </span>
                    </p>
                  </h1>
                  <form className="px-1 py-5" onSubmit={handleSubmit}>
                    <input
                      className="login-input text-black placeholder:text-black "
                      placeholder="Password"
                      type="password"
                      name="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                    />
                    <p className="text-[1rem] text-black mt-2 px-[10px] font-semibold">
                      password must contain at least 8 characters
                    </p>
                    <input
                      className="login-input text-black placeholder:text-black "
                      placeholder="confirm password"
                      type="password"
                      name="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                    />

                    <button className=" mt-5 text-white font-bold text-[1.2rem]  bg-[#ff3a4b] py-2 w-full h-[50px] rounded-lg">
                      Reset Password
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
