import { useState } from "react";
import { useParams } from "react-router-dom";
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

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { clientToken:token, newPassword ,confirmPassword};
      const response = await resetaPassword(JSON.stringify(payload));
      if (response) {
        setMessage(response.message || "Password reset successfully!");
        setError(false);
      }
    } catch (err) {
      setMessage("Error: Unable to reset password");
      setError(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
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
    </Container>
  );
};

export default ResetPassword;
