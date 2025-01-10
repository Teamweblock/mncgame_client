import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  // baseURL: "https://api.multinetworkingcompany.com",
  baseURL: process.env.BACKEND_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
const axiosApi = axios.create({
  // baseURL: "https://api.multinetworkingcompany.com",
  baseURL: process.env.BACKEND_URL || "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});
// Request interceptor to add the token to headers and userId to request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token); // Debugging line
    if (token) {
      config.headers["x-access-token"] = token; // Attach token to header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired
      localStorage.removeItem("token");
      alert("Session expired. Please log in again.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const signUp = async (payload) => {
  try {
    const data = await axiosInstance.post("/player/register", payload);
    if (data && data.status === 201) {
      toast.success("Sign Up successfully.");
      return data.data;
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const signIn = async (payload) => {
  try {
    const data = await axiosApi.post("/player/login", payload);
    if (data && data.status === 200) {
      toast.success("LOG In successfully.");
      return data.data;
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const googleAuth = async (payload) => {
  try {
    const data = await axiosApi.post(`/player/auth/google`, payload);
    if (data && data.status === 200) {
      toast.success("LOG In successfully.");
      return data.data;
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const forgotPassword = async (payload) => {
  try {
    const data = await axiosInstance.post("/player/forgotpassword", payload);
    if (data && data.status === 200) {
      toast.success("Password reset link sent!");
      return data.data;
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const resetaPassword = async (payload) => {
  try {
    const data = await axiosInstance.post("/player/resetpassword", payload);
    if (data && data.status === 200) {
      toast.success("Password reset successfully!");
      return data.data;
    }
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

// API call for getting user profile
export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/player/profile"); // Adjust the endpoint to match your backend
    return response.data; // Return the user profile data
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null; // Return null in case of an error
  }
};

// API call for getting user profile
export const getUserRecent = async () => {
  try {
    const response = await axiosInstance.post("/player/recentactivity"); // Adjust the endpoint to match your backend
    return response.data; // Return the user profile data
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null; // Return null in case of an error
  }
};

// API call for getting user profile
export const getweekgameview = async () => {
  try {
    const response = await axiosInstance.post("/player/weeklyanalysis"); // Adjust the endpoint to match your backend
    return response.data; // Return the user profile data
  } catch (error) {
    console.error("Error fetching user profile", error);
    return null; // Return null in case of an error
  }
};
export const Check1validlevel = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/checkVaildlevel",
      payload
    );
    if (response && response?.status === 200) {
      return true; // Return true to indicate success
    }
    toast.error("Unexpected response from the server.");
    return false; // Return false to indicate failure
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const checkmultiVaildlevel = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/checkmultiVaildlevel",
      payload
    );
    if (response && response?.status === 200) {
      return true; // Return true to indicate success
    }
    toast.error("Unexpected response from the server.");
    return false; // Return false to indicate failure
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const joinmultipleGame = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/joinmultipleGame",
      payload
    );
    if (response && response?.status === 200) {
      return response.data;
    }
    toast.error("Unexpected response from the server.");
    return false; // Return false to indicate failure
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const joinmeetGame = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/thirdGame/joinmeetGame",
      payload
    );
    if (response && response?.status === 200) {
      return response.data;
    }
    toast.error("Unexpected response from the server.");
    return false; // Return false to indicate failure
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

// The API call for getting questions for a specific level
export const getQuestionsForsingleLevel = async (payload, navigate) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/single/getQuestionsForLevel",
      payload
    );

    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Level questions fetched successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    // Check for specific error message and navigate
    if (
      error?.response?.status === 400 &&
      errorMessage === "You have already completed this level."
    ) {
      navigate("/game1singlelevelpage"); // Replace '/specific-path' with the desired route
    }
    return null; // Return null to indicate failure
  }
};

// The API call for getting questions for a specific level
export const getQuestionsFormultipleLevel = async (payload, navigate) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/multiple/getQuestionsForLevel",
      payload
    );

    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Level questions fetched successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error?.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    // Check for specific error message and navigate
    if (
      error?.response?.status === 400 &&
      errorMessage === "You have already completed this level."
    ) {
      navigate("/game1multiplelevelpage"); // Replace '/specific-path' with the desired route
    }
    return null; // Return null to indicate failure
  }
};

// The API call for joining a multiplayer game
export const joinMultipleGame = async (payload) => {
  try {
    const response = await axiosInstance.post("/joinmultipleGame", payload);
    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Joined multiplayer game successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

export const submitGame1singleAnswer = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/submitanswer",
      payload
    );
    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Answer submitted successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

export const submitGame1Answer = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/multiple/submitanswer",
      payload
    );
    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Answer submitted successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

// The API call for getting questions for a specific level
export const get1GameResult = async (payload) => {
  console.log("payload", payload);

  try {
    const response = await axiosInstance.post(
      "/firstGame/getplayerResult",
      payload
    );
    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Player Result fetched successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

// secondGame

export const Check2validlevel = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/secoundGame/checkVaildlevel",
      payload
    );
    if (response && response?.status === 200) {
      return true; // Return true to indicate success
    }
    toast.error("Unexpected response from the server.");
    return false; // Return false to indicate failure
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

// The API call for getting questions for a specific level
export const get2GameQuestions = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/secoundGame/getQuestionsForLevel",
      payload
    );
    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Level questions fetched successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

export const submitGame2Answer = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/secoundGame/submitanswer",
      payload
    );
    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Answer submitted successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

// The API call for getting questions for a specific level
export const get2GameResult = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/secoundGame/getplayerResult",
      payload
    );
    // Check if the response is successful
    if (response && response?.status === 200) {
      toast.success("Player Result fetched successfully.");
      return response.data; // Return the actual data
    }
    // Handle unexpected status codes
    toast.error("Unexpected response from the server.");
    return null;
  } catch (error) {
    // Handle errors
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

// -----------------------
export const getProducts = async (perPage) => {
  try {
    const data = await axiosInstance.get(`/products?&limit=${perPage}`);
    if (data && data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error, "error");
    toast.error(error.message);
    return error;
  }
};

export const getCategories = async () => {
  try {
    const data = await axiosInstance.get(`/products/categories`);
    if (data && data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error, "error");
    toast.error(error.message);
    return error;
  }
};

export const getSingleProducts = async (id) => {
  try {
    const data = await axiosInstance.get(`/products/${id}`);
    if (data && data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error, "error");
    toast.error(error.message);
    return error;
  }
};

export const addToCart = async (payload) => {
  try {
    const data = await axiosInstance.post(`/carts`, payload);
    if (data && data.status === 200) {
      toast.success("Product add into Cart.");
      return data.data;
    }
  } catch (error) {
    console.log(error, "error");
    toast.error(error.message);
    return error;
  }
};
export const updateCart = async (payload) => {
  try {
    const data = await axiosInstance.put(`/carts`, payload);
    if (data && data.status === 200) {
      //    toast.success("Product add into Cart.")
    }
  } catch (error) {
    console.log(error, "error");
    toast.error(error.message);
    return error;
  }
};

export const getUsersCart = async () => {
  try {
    const data = await axiosInstance.get(`/carts/user/1`);
    if (data && data.status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error, "error");
    toast.error(error.message);
    return error;
  }
};
