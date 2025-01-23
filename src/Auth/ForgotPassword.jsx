import { useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../utils/axiosInstance";
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
              <img
                className="login-img sm:block hidden"
                src="/forgot.png"
                alt="Login"
              />
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
