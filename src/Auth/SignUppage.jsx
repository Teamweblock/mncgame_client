import React, { useEffect, useState } from "react";
import loginimg1 from "../Assets/images/signup.png";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { signUp } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/usertokenSlice";
import { toast } from "react-toastify";

const SignUppage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     navigate("/");
  //   }
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
    } else {
      setError("");
      const res = await signUp(formData);
      dispatch(login(res));
      if (res) {
        setFormData({});
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <div className="login-bg-img">
        <div className="container">
          <img
            src="./mainlogo.png"
            alt=""
            height={45}
            width={120}
            style={{ marginTop: "100px" }}
          />

          <div className="row m-auto pb-16 md:pb-[135px] lg:pb-[80px] xl:pb-[40px]">
            <div className="col-md-6 mt-5">
              <img className="login-img sm:block hidden" src={loginimg1} alt="Login" />
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center text-center">
              <div className="loginform">
                {/* <div
                  style={{
                    borderBottom: "5px solid black",
                    padding: "10px",
                    fontWeight: "700",
                  }}
                >
                  Not logged in yet?
                </div> */}
                <div className="all-circle">
                  <div className="login-discription">Not account yet?</div>
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
                <div>
                  <h1 className="text-6xl font-bold  max-lg:text-3xl max-sm:text-2xl text-center pt-3">
                    <span style={{ color: "orange" }}>Create</span>, Your
                    <br /> account today!
                  </h1>
                  <form className="px-3 py-5" onSubmit={handleSubmit}>
                    {/* First Name and Last Name Input Fields */}
                    <div className="flex sm:gap-4 max-sm:flex-col">
                      <input
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="login-input"
                        aria-label="First Name"
                      />

                      <input
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="login-input"
                        aria-label="Last Name"
                      />
                    </div>

                    {/* Email Input Field */}

                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="login-input"
                      aria-label="Email"
                    />

                    {/* Password Input Field */}
                    <div className="border-b w-full relative justify-between">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="login-input relative"
                        aria-label="Password"
                      />
                      <div
                        className="cursor-pointer text-xl mt-2 absolute right-2 bottom-3"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label="Toggle Password Visibility"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>

                    {/* Confirm Password Input Field */}
                    <div className="border-b w-full relative justify-between">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="login-input"
                        aria-label="Confirm Password"
                      />
                      <div
                        className="cursor-pointer text-xl mt-2 absolute right-2 bottom-3"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-label="Toggle Confirm Password Visibility"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="px-5 mt-4">
                      <button type="submit" className="login-btn">
                        Register Account
                      </button>
                    </div>
                  </form>
                </div>

                <p className="text-center" style={{ fontWeight: "700" }}>
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    style={{ color: "orange", cursor: "pointer" }}
                  >
                    Login
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

export default SignUppage;
