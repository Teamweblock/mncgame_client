import React from 'react'

const Congrates = () => {
  return (
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
          <img className="login-img" src="/congrates.svg" alt="Login" />
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
                src="./congrates1.png"
                alt=""
                height={200}
                width={300}
                className="flex justify-center mx-auto"
              />
              <h1 className="text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-bold  text-center mx-auto text-[#ff3a4b]">
           Congratulations
              </h1>
            <div className='text-5xl max-lg:text-4xl max-md:text-3xl max-sm:text-2xl font-bold  text-center mx-auto'>Your password has been changed successfully</div>
              <form className="px-1 lg:py-5">
                {/* <input
                className="login-input text-black placeholder:text-black "
                placeholder="Enter Your Email"
                type="email"
                name="email"
               
        
                required
              /> */}

                <button className=" mt-2 text-white font-bold text-[1.1rem]  bg-[#ff3a4b] py-2 w-full h-[50px] rounded-lg">
                  Back To Login
                </button>
              </form>

              <p className="text-[1rem] font-bold text-center px-2 py-4">Did not receive the email ? Check your spam filter or try another email address </p>

              {/* <button   className="flex items-center gap-2 text-[1.2rem] font-semibold mx-auto mt-4"> <span><ChevronLeft size={20}/></span>Back To login</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Congrates