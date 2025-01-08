import { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import img34 from "../Assets/images/forget.png";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../utils/axiosInstance";

import logo from "../Assets/images/logoimg.png";

import loginimg1 from "../Assets/images/loginimg1.png";
import { ChevronLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { email };
      const responce = await forgotPassword(JSON.stringify(payload));
      if (responce.success == true) {
        console.log("responce.success", responce.success);
        navigate("/checkMail");
      }
    } catch (error) {
      console.log("Error:- Unable to send reset email", error);
    } finally {
      setLoading(false);
    }
  };

  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
      {/* <div className="login-bg-img  overflow-hidden h-screen" */}
      {/* > */}

      {/* <img src={logo} alt="" height={45} width={160} className="pt-10 sm:px-4 px-2  cursor-pointer"onClick={handleHome}/> */}

      {/* <Container
   sx={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
   marginTop: "4rem",
  
  }}

    >
            

      <Grid
        container
        sx={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
          
   
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: "#f1daf1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={img34}
            alt="Forgot Password Illustration"
            sx={{ maxWidth: "80%", height: "auto" }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            <LockOutlinedIcon
              sx={{
                fontSize: "40px",
                color: "#c04ae2",
                mb: 1,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 1 }}>
              Forgot Your Password?
            </Typography>
            <Typography
              variant="body1"
              sx={{ textAlign: "center", color: "#555", mb: 3 }}
            >
              Enter your email address below to receive password reset
              instructions.
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                backgroundColor: "#c04ae2",
                color: "#fff",
                padding: "0.8rem",
                textTransform: "none",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#c04ae2",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        
          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
              fontSize: "14px",
              color: "#c04ae2",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Back to Sign In
          </Typography>
        </Grid>
      </Grid>
    </Container> */}

      <div className="login-bg-img">
        <div className="container">
          <img
            src="./mainlogo.png"
            alt=""
            height={45}
            width={120}
            style={{ marginTop: "30px" }}
          />
          <div className="row">
            <div className="col-md-6">
            <img className="login-img sm:block hidden" src="/forgot.png" alt="Login" />
            </div>
            <div className="col-md-6 d-flex  " style={{ marginTop: "50px" }}>
              <div className="loginform">
                <div className="all-circle">
                  <div className="login-discription">
                    Not logged into your account yet?
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
                <div className="px-3 py-20">
                  <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-bold py-4 text-center mx-auto">
                    Forget Password ?
                    <p className="text-[1.5rem] max-sm:text-[1.1rem]  md:pt-2 font-bold text-[#ff3a4b] ">
                      No Worries{" "}
                      <span className="text-black">
                        we'll send you reset instructions
                      </span>
                    </p>
                  </h1>
                  <form className="px-1 lg:py-5" onSubmit={handleSubmit}>
                    <input
                      className="login-input text-black placeholder:text-black "
                      placeholder="Enter Your Email"
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className=" mt-5 text-white font-bold text-[1.1rem]  bg-[#ff3a4b] py-2 w-full h-[50px] rounded-lg"
                    >
                      {loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        "Send Reset Password"
                      )}
                    </button>
                  </form>

                  <button
                    onClick={() => navigate("/login")}
                    className="flex items-center gap-2 text-[1.2rem] font-semibold mx-auto mt-4"
                  >
                    {" "}
                    <span>
                      <ChevronLeft size={20} />
                    </span>
                    Back To login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default ForgotPassword;
