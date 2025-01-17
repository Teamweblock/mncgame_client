import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});


const axiosApi = axios.create({
  baseURL: "http://localhost:8000",
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
      localStorage.removeItem('token');
      alert('Session expired. Please log in again.');
      window.location.href = '/login';
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
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
      error?.response?.data?.message || error?.message || "An error occurred. Please try again.";
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const Check1validlevel = async (payload) => {
  try {
    const response = await axiosInstance.post("/firstGame/checkVaildlevel", payload);
    if (response && response?.status === 200) {
      return true; // Return true to indicate success
    }
    toast.error("Unexpected response from the server.");
    return false; // Return false to indicate failure
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

export const joinmultipleGame = async (payload) => {
  try {
    const response = await axiosInstance.post("/firstGame/joinmultipleGame", payload);
    if (response && response?.status === 200) {
      return response.data;
    }
    toast.error("Unexpected response from the server.");
    return false; // Return false to indicate failure
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return false; // Return false to indicate failure
  }
};

// The API call for getting questions for a specific level
export const getQuestionsForLevel = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/getQuestionsForLevel",
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

// The API call for joining a multiplayer game
export const joinMultipleGame = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/firstGame/joinmultipleGame",
      payload
    );
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

export const submitGame1Answer = async (payload) => {
  try {
    const response = await axiosInstance.post("/firstGame/submitanswer", payload);
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

// The API call for getting questions for a specific level
export const get1GameResult = async (payload) => {
  console.log('payload', payload);

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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

// secondGame

export const Check2validlevel = async (payload) => {
  try {
    const response = await axiosInstance.post("/secoundGame/checkVaildlevel", payload);
    if (response && response?.status === 200) {
      return true; // Return true to indicate success
    }
    toast.error("Unexpected response from the server.");
    return false; // Return false to indicate failure
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

export const submitGame2Answer = async (payload) => {
  try {
    const response = await axiosInstance.post("/secoundGame/submitanswer", payload);
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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
    toast.error(errorMessage);
    return null; // Return null to indicate failure
  }
};

// The API call for getting questions for a specific level
export const get2GameResult = async (payload) => {
  console.log('payload', payload);

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
      error?.response?.data?.message || error.message || "An error occurred. Please try again.";
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
