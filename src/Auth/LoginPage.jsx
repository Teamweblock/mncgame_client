import React, { useEffect, useState } from "react";
import loginimg1 from "../Assets/images/loginimg1.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../store/slices/usertokenSlice";
import "react-toastify/dist/ReactToastify.css";
import { googleAuth, signIn } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn(JSON.stringify(formData));
      if (res && res.token) {
        const currentTime = new Date().getTime();
         const expirationTime = currentTime + 8 * 60 * 60 * 1000; // 8 hours in milliseconds
        // const expirationTime = currentTime + 2 * 60 * 1000; // 2 minutes in milliseconds
        localStorage.setItem("token", res.token);
        localStorage.setItem("tokenExpiration", expirationTime);

        // Set auto-logout timer
        const remainingTime = expirationTime - currentTime;
        setTimeout(() => handleAutoLogout(), remainingTime);

        dispatch(login(res.token));
        setFormData({});
        navigate("/");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
    }
  };

  const handleAutoLogout = () => {
    localStorage.clear();
    // localStorage.removeItem("token");
    // localStorage.removeItem("tokenExpiration");
    // localStorage.removeItem("playerType");
    // localStorage.removeItem("levelNumber");
    // localStorage.removeItem("role");
    toast.error("Your session has expired. Please log in again.");
    navigate("/login");
  };

  const responseGoogle = async (authResult) => {
    try {
      const tokenId = authResult.credential;
      const result = await googleAuth(JSON.stringify({ tokenId }));
      const token = result?.token;
      if (token) {
        const currentTime = new Date().getTime();
        const expirationTime = currentTime + 2 * 60 * 1000; // 2 minutes in milliseconds
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiration", expirationTime);

        // Schedule auto-logout
        const remainingTime = expirationTime - currentTime;
        setTimeout(() => handleAutoLogout(), remainingTime);

        dispatch(login(token));
        navigate("/");
      } else {
        console.error("Google login failed:", result);
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleError = (error) => {
    console.error("Google login error:", error);
  };

  const handleSignUp = () => navigate("/signup");
  const handleForgetPassword = () => navigate("/forgotPassword");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("tokenExpiration");
    const currentTime = new Date().getTime();

    if (token && expirationTime) {
      if (currentTime > expirationTime) {
        handleAutoLogout();
      } else {
        const remainingTime = expirationTime - currentTime;
        setTimeout(() => handleAutoLogout(), remainingTime);
      }
    }
  }, [navigate]);

  return (
    <div className="login-bg-img">
      <div className="container">
        <img src="./mainlogo.png" alt="" height={45} width={120} style={{ marginTop: "30px" }} />
        <div className="row">
          <div className="col-md-6">
            <img className="login-img sm:block hidden" src={loginimg1} alt="Login" />
          </div>
          <div className="col-md-6 d-flex" style={{ marginTop: "50px" }}>
            <div className="loginform">
              <h1 className="login-heading text-center mx-auto">
                <span style={{ color: "#fec200" }}>Hello,</span> login to your paradise!
              </h1>
              <form onSubmit={handleSubmit} className="px-1 py-5">
                <input
                  className="login-input"
                  placeholder="Email"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                />
                <div className="border-b w-full relative justify-between">
                  <input
                    className="login-input"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                  <div
                    className="cursor-pointer text-xl mt-2 absolute right-2 bottom-3"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <p onClick={handleForgetPassword} className="forget-password-text">
                  Forget Password?
                </p>
                <button type="submit" className="login-btn">Login</button>
                <div className="pt-2">
                  <GoogleLogin onSuccess={responseGoogle} onError={handleError} />
                </div>
              </form>
              <p className="text-center py-3">
                Don't have an account?{" "}
                <span onClick={handleSignUp} style={{ color: "orange", cursor: "pointer" }}>
                  Signup
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;


// import React, { useEffect, useState } from "react";
// import loginimg1 from "../Assets/images/loginimg1.png";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { login } from "../store/slices/usertokenSlice";
// import "react-toastify/dist/ReactToastify.css";
// import { googleAuth, signIn } from "../utils/axiosInstance";
// import { useDispatch } from "react-redux";
// import { GoogleLogin } from "@react-oauth/google";
// import jwtDecode from "jwt-decode";
// import { toast } from "react-toastify";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await signIn(JSON.stringify(formData));
//       if (res && res.token) {
//         const currentTime = new Date().getTime();
//         const expirationTime = currentTime + 2 * 60 * 1000; // 2 minutes in milliseconds
//         localStorage.setItem("token", res.token);
//         localStorage.setItem("tokenExpiration", expirationTime);

//         // Set auto-logout timer
//         const remainingTime = expirationTime - currentTime;
//         setTimeout(() => handleAutoLogout(), remainingTime);

//         dispatch(login(res.token));
//         setFormData({});
//         navigate("/");
//       } else {
//         toast.error("Login failed. Please try again.");
//       }
//     } catch (error) {
//       toast.error("An error occurred while logging in.");
//     }
//   };

//   const handleAutoLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("tokenExpiration");
//     localStorage.removeItem("playerType");
//     localStorage.removeItem("levelNumber");
//     localStorage.removeItem("role");
//     toast.error("Your session has expired. Please log in again.");
//     navigate("/login");
//   };

//   const responseGoogle = async (authResult) => {
//     try {
//       const tokenId = authResult.credential;
//       const result = await googleAuth(JSON.stringify({ tokenId }));
//       const token = result?.token;
//       if (token) {
//         const currentTime = new Date().getTime();
//         const expirationTime = currentTime + 2 * 60 * 1000; // 2 minutes in milliseconds
//         localStorage.setItem("token", token);
//         localStorage.setItem("tokenExpiration", expirationTime);

//         // Schedule auto-logout
//         const remainingTime = expirationTime - currentTime;
//         setTimeout(() => handleAutoLogout(), remainingTime);

//         dispatch(login(token));
//         navigate("/");
//       } else {
//         console.error("Google login failed:", result);
//       }
//     } catch (error) {
//       console.error("Google login error:", error);
//     }
//   };

//   const handleError = (error) => {
//     console.error("Google login error:", error);
//   };

//   const handleSignUp = () => navigate("/signup");
//   const handleForgetPassword = () => navigate("/forgotPassword");

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const expirationTime = localStorage.getItem("tokenExpiration");
//     const currentTime = new Date().getTime();

//     if (token && expirationTime) {
//       if (currentTime > expirationTime) {
//         handleAutoLogout();
//       } else {
//         const remainingTime = expirationTime - currentTime;
//         setTimeout(() => handleAutoLogout(), remainingTime);
//       }
//     }
//   }, [navigate]);

//   return (
//     <div className="login-bg-img">
//       <div className="container">
//         <img src="./mainlogo.png" alt="" height={45} width={120} style={{ marginTop: "30px" }} />
//         <div className="row">
//           <div className="col-md-6">
//             <img className="login-img sm:block hidden" src={loginimg1} alt="Login" />
//           </div>
//           <div className="col-md-6 d-flex" style={{ marginTop: "50px" }}>
//             <div className="loginform">
//               <h1 className="login-heading text-center mx-auto">
//                 <span style={{ color: "#fec200" }}>Hello,</span> login to your paradise!
//               </h1>
//               <form onSubmit={handleSubmit} className="px-1 py-5">
//                 <input
//                   className="login-input"
//                   placeholder="Email"
//                   type="email"
//                   name="email"
//                   onChange={handleChange}
//                   required
//                 />
//                 <div className="border-b w-full relative justify-between">
//                   <input
//                     className="login-input"
//                     placeholder="Password"
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     onChange={handleChange}
//                     required
//                   />
//                   <div
//                     className="cursor-pointer text-xl mt-2 absolute right-2 bottom-3"
//                     onClick={() => setShowPassword((prev) => !prev)}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </div>
//                 </div>
//                 <p onClick={handleForgetPassword} className="forget-password-text">
//                   Forget Password?
//                 </p>
//                 <button type="submit" className="login-btn">Login</button>
//                 <div className="pt-2">
//                   <GoogleLogin onSuccess={responseGoogle} onError={handleError} />
//                 </div>
//               </form>
//               <p className="text-center py-3">
//                 Don't have an account?{" "}
//                 <span onClick={handleSignUp} style={{ color: "orange", cursor: "pointer" }}>
//                   Signup
//                 </span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;



// import React, { useEffect, useState } from "react";
// import loginimg1 from "../Assets/images/loginimg1.png";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { login } from "../store/slices/usertokenSlice";
// import "react-toastify/dist/ReactToastify.css";
// import { googleAuth, signIn } from "../utils/axiosInstance";
// import { useDispatch } from "react-redux";
// import { GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { toast } from 'react-toastify'; 

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({});
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await signIn(JSON.stringify(formData));

//     if (res && res.token) {
    
//       const currentTime = new Date().getTime();
//       // const expirationTime = currentTime + 2 * 60 * 60 * 1000;
//       // const expirationTime = currentTime + 8 * 60 * 60 * 1000; // 8 hours in milliseconds
//       const expirationTime = currentTime + 2 * 60 * 1000; // 2 minutes in milliseconds
    
//       localStorage.setItem("token", res.token);
//       localStorage.setItem("tokenExpiration", expirationTime);

//        // Set auto-logout
//        const remainingTime = expirationTime - currentTime;
//        setTimeout(() => handleAutoLogout(), remainingTime);
    
//       dispatch(login(res.token));
//       setFormData({});
//       navigate("/");
//     }else {
//       toast.error("Login failed. Please try again.");
//     }
//   };

  // const handleAutoLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("tokenExpiration");
  //   toast.error("Your session has expired. Please log in again.");
  //   navigate("/login");
  // };

//   const handleAutoLogout = () => {
//     // Remove only the 'token' key from localStorage
//     Object.keys(localStorage).forEach((key) => {
//       if (key !== "token") {
//         localStorage.removeItem(key);
//       }
//     });
  
//     toast.error("Your session has expired. Please log in again.");
//     navigate("/login");
//   };

//   const responseGoogle = async (authResult) => {
//     try {
//       const tokenId = authResult.credential;
//       const decoded = jwtDecode(tokenId); // Decoded user information
//       const result = await googleAuth(JSON.stringify({ tokenId }));
//       const token = result?.token;
//       if (result && token) {
//         localStorage.setItem("token", result.token);
//         console.log("token save ho gya j ajay", );
        
//         dispatch(login(result.token));
//         console.log("token save ho gya j", );

//         navigate("/");
//       } else {
//         console.error("Google login failed at backend:", result);
//       }
//     } catch (error) {
//       console.error("Google login error:", error);
//     }
//   };

//   // const responseGoogle = async (authResult) => {
//   //   try {
//   //     const tokenId = authResult.credential;
//   //     const decoded = jwtDecode(tokenId); // Decoded user information
//   //     const result = await googleAuth(JSON.stringify({ tokenId }));
//   //     const token = result?.token;
//   //     if (result && token) {
//   //       const currentTime = new Date().getTime();
//   //       const expirationTime = currentTime + 8 * 60 * 60 * 1000; // 8 hours
//   //       // const expirationTime = currentTime + 2 * 60 * 1000; // 2 minutes in milliseconds

//   //       localStorage.setItem("token", token);
//   //       localStorage.setItem("tokenExpiration", expirationTime);

//   //       // Schedule auto-logout
//   //       const remainingTime = expirationTime - currentTime;
//   //       setTimeout(handleAutoLogout, remainingTime);

//   //       dispatch(login(token));
//   //       navigate("/");
//   //     } else {
//   //       console.error("Google login failed at backend:", result);
//   //     }
//   //   } catch (error) {
//   //     console.error("Google login error:", error);
//   //   }
//   // };

//   const handleError = (error) => {
//     console.error("Google login error:", error);
//   };

//   const handleSignUp = () => {
//     navigate("/signup");
//   };

//   const handleForgetPassword = () => {
//     navigate("/forgotPassword");
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const expirationTime = localStorage.getItem("tokenExpiration");
//     const currentTime = new Date().getTime();
  
//     // Log the current token and expiration status
//     console.log("Current Token:", token);
//     console.log("Token Expiration Time:", expirationTime);
//     console.log("Current Time:", currentTime);

//     if (token && expirationTime) {
//       if (currentTime > expirationTime) {
//         handleAutoLogout();
//       } else {
//         // Calculate remaining time and set timeout for auto-logout
//         const remainingTime = expirationTime - currentTime;
//         setTimeout(() => handleAutoLogout(), remainingTime);
//       }
//     }
  
//     // if (token && expirationTime && currentTime > expirationTime) {
//     //   localStorage.removeItem("token");
//     //   localStorage.removeItem("tokenExpiration");
  
//     //   console.log("Token has expired and has been removed.");
//     //   toast.error("Your session has expired. Please log in again.");
//     //   navigate("/login"); 
//     // } else {
//     //   console.log("Token is valid.");
//     // }
//   }, [navigate]);
  


//   return (
//     <div className="login-bg-img">
//       <div className="container">
//           <img src="./mainlogo.png" alt="" height={45} width={120} style={{marginTop:"30px"}}/>
//         <div className="row">
//           <div className="col-md-6">
//             <img className="login-img sm:block hidden" src={loginimg1} alt="Login" />
//           </div>
//           <div className="col-md-6 d-flex  " style={{marginTop:"50px"}}>
//             <div className="loginform">
//               <div className="all-circle">
//               <div  className="login-discription">
//                 Not logged into your account yet?
//               </div>
//               <div className="both-circle">
//               <div className="black-circle">
//                 <div className="white-circle"></div>
//               </div>
//               <div className="black-circle">
//                 <div className="white-circle"></div>
//               </div>
//               <div className="black-circle">
//                 {/* <div className="white-circle"></div> */}
//               </div>
//               </div>
//               </div>
//               <div className="px-3">
//                 <h1
//                 className="login-heading text-center mx-auto"
//                   style={{
                  
//                   }}
//                 >
//                   <span style={{ color: "#fec200" }}>Hello,</span> login to{" "}
//                   your paradise!
//                 </h1>
//                 <form onSubmit={handleSubmit} className="px-1 py-5">
//                   <input
//                     className="login-input"
//                     placeholder="Email"
//                     type="email"
//                     name="email"
//                     onChange={handleChange}
//                     required
//                   />
//                   <div className="border-b w-full relative justify-between">
//                     <input
//                       className="login-input"
//                       placeholder="Password"
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       onChange={handleChange}
//                       required
//                     />
//                     <div
//                       className="cursor-pointer text-xl mt-2 absolute right-2 bottom-3"
//                       onClick={() => setShowPassword((prev) => !prev)}
//                     >
//                       <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
//                     </div>
//                   </div>
//                   <p
//                     style={{
//                       float: "inline-end",
//                       margin: "10px 0px",
//                       fontWeight: "700",
//                       color: "orange",
//                       cursor: "pointer",
//                     }}
//                     onClick={handleForgetPassword}
//                   >
//                     Forget Password?
//                   </p>
//                   <button type="submit" className="login-btn ">
//                     Login
//                   </button>
//                   <div className="pt-2  ">
//                     <GoogleLogin
                    
//                       onSuccess={responseGoogle}
//                       onError={handleError}
//                     />
//                   </div>
//                 </form>
//                 <p className="text-center py-3" style={{ fontWeight: "700" }}>
//                   Don't have an account?{" "}
//                   <span
//                     onClick={handleSignUp}
//                     style={{ color: "orange", cursor: "pointer" }}
//                   >
//                     Signup
//                   </span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
