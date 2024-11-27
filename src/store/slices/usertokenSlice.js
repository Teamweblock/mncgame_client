import { createSlice } from "@reduxjs/toolkit";

export const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    return decoded.exp < currentTime; // Compare expiration time with current time
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // Treat invalid tokens as expired
  }
};

const usertokenSlice = createSlice({
  name: "user",
  initialState: { isAuthenticated: false, userData: null },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
    },
  },
});

export default usertokenSlice.reducer;
export const { login, logout } = usertokenSlice.actions;
