import React from "react";
import { useNavigate } from "react-router-dom";

const CheckMail = () => {
  const navigate = useNavigate();
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
              <img className="login-img sm:block hidden" src="/Checkmaill.png" alt="Login" />
            </div>
            <div className="col-md-6 d-flex  " style={{ marginTop: "50px" }}>
              <div className="loginform">
                <div className="all-circle">
                  <div className="login-discription">
                    Not Login your account yet?
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
                <div className="px-3">
                  <img
                    src="./checkMail1.png"
                    alt=""
                    height={200}
                    width={250}
                    className="flex justify-center mx-auto"
                  />
                  <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-bold  text-center mx-auto">
                    Check Your Mail
                    <div className="text-[1.5rem] max-sm:text-[1rem] pt-3  font-bold text-[#ff3a4b] text-center">
                      Please check your mail,{" "}
                    </div>
                    <div className="text-[1.3rem] max-sm:text-[1.1rem]   font-bold text-black text-center">
                      we have sent you an email that contains a link to reset
                      your password.
                    </div>
                  </h1>
                  <form className="px-1 lg:py-5">
                    {/* <input
                    className="login-input text-black placeholder:text-black "
                    placeholder="Enter Your Email"
                    type="email"
                    name="email"
                   
            
                    required
                  /> */}

                    <button onClick={() => navigate("/login")} className=" mt-2 text-white font-bold text-[1.1rem]  bg-[#ff3a4b] py-2 w-full h-[50px] rounded-lg" >
                      Back To Login
                    </button>
                  </form>

                  <p className="text-[1rem] font-bold text-center px-2 py-4">
                    Did not receive the email ? Check your spam filter or try
                    another email address{" "}
                  </p>

                  {/* <button   className="flex items-center gap-2 text-[1.2rem] font-semibold mx-auto mt-4"> <span><ChevronLeft size={20}/></span>Back To login</button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckMail;
