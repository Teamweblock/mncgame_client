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
      // if (responce.success == true) {
      //   navigate("/login");
      // }
    } catch (error) {
      console.log("Error:- Unable to send reset email", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        backgroundColor: "#f9f9f9",
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
        {/* Left Section with Illustration */}
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
            // src="https://via.placeholder.com/400x400.png"
            src={img34}
            alt="Forgot Password Illustration"
            sx={{ maxWidth: "80%", height: "auto" }}
          />
        </Grid>

        {/* Right Section with Form */}
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
          {/* {message && (
            <Alert
              severity={isError ? "error" : "success"}
              sx={{ mt: 2, textAlign: "center" }}
            >
              {message}
            </Alert>
          )} */}
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
            onClick={() => navigate("/login")} // Navigate to the login page
          >
            Back to Sign In
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
