import React, { useEffect, useState } from "react";
import loginimg1 from "../Assets/images/loginimg1.png";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { login } from "../store/slices/usertokenSlice";
import "react-toastify/dist/ReactToastify.css";
import { googleAuth, signIn } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

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
    const res = await signIn(JSON.stringify(formData));
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      dispatch(login(res.token));
      setFormData({});
      navigate("/");
    }
  };

  const responseGoogle = async (authResult) => {
    try {
      const tokenId = authResult.credential;
      const decoded = jwtDecode(tokenId); // Decoded user information
      const result = await googleAuth(JSON.stringify({ tokenId }));
      const token = result?.token;
      if (result && token) {
        localStorage.setItem("token", result.token);
        dispatch(login(result.token));
        navigate("/");
      } else {
        console.error("Google login failed at backend:", result);
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  const handleError = (error) => {
    console.error("Google login error:", error);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleForgetPassword = () => {
    navigate("/forgotPassword");
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }, []);

  return (
    <div className="login-bg-img">
      <div className="container">
          <img src="./mainlogo.png" alt="" height={45} width={120} style={{marginTop:"30px"}}/>
        <div className="row">
          <div className="col-md-6">
            <img className="login-img" src={loginimg1} alt="Login" />
          </div>
          <div className="col-md-6 d-flex  " style={{marginTop:"50px"}}>
            <div className="loginform">
              <div className="all-circle">
              <div  className="login-discription">
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
              <div style={{ width: "80%", margin: "auto" }}>
                <h1
                className="login-heading"
                  style={{
                  
                  }}
                >
                  <span style={{ color: "#fec200" }}>Hello,</span> login to{" "}
                  your paradise!
                </h1>
                <form onSubmit={handleSubmit} className="px-5 py-5">
                  <input
                    className="login-input"
                    placeholder="Email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    required
                  />
                  <div className="input-group flex flex-nowrap">
                    <input
                      className="login-input"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={handleChange}
                      required
                    />
                    <div
                      className="cursor-pointer text-xl mt-2"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                    </div>
                  </div>
                  <p
                    style={{
                      float: "inline-end",
                      margin: "10px 0px",
                      fontWeight: "700",
                      color: "orange",
                      cursor: "pointer",
                    }}
                    onClick={handleForgetPassword}
                  >
                    Forget Password?
                  </p>
                  <button type="submit" className="login-btn">
                    Login
                  </button>
                  <div className="pt-2  ">
                    <GoogleLogin
                    
                      onSuccess={responseGoogle}
                      onError={handleError}
                    />
                  </div>
                </form>
                <p className="text-center py-3" style={{ fontWeight: "700" }}>
                  Don't have an account?{" "}
                  <span
                    onClick={handleSignUp}
                    style={{ color: "orange", cursor: "pointer" }}
                  >
                    Signup
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
