import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import Select1 from "react-dropdown-select";
import { getUserProfile } from "../utils/axiosInstance";
import UserProfile from "../Auth/UserProfile";
import UserProfileEdit from "../Auth/UserProfileEdit";

const UpdateProfile = () => {
  // Name: jay jathar Date: 16/1/25 State to handle country codes fetched from API
  const [countryCodes, setCountryCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [userData, setUserData] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        if (profileData) {
          setUserData(profileData?.userData);
        }
      } catch (error) {
        console.error("Error fetching user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // const handleclick = () => {
  //   alert("clicked");
  // };

  const handleclick = () => {
    // Trigger the file input click programmatically
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      // You can handle file upload here
    }
  };

  const handleSelectChange = (values, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: values.map((v) => v.value),
    }));
  };

  //jay
  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all"); // Name: jay jathar Date: 16/1/25 Mocked API call for country data
        const data = await response.json();

        // Name: jay jathar Date: 16/1/25 Extract country code and name
        const codes = data.map((country) => ({
          code: country.idd.root
            ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}` // Name: jay jathar Date: 16/1/25 Construct country code
            : "+",
          country: country.name.common,
        }));

        // Name: jay jathar Date: 16/1/25 Filter valid country codes
        const validCodes = codes.filter((code) => code.code !== "+");
        setCountryCodes(validCodes); // Name: jay jathar Date: 16/1/25 Update state with valid country codes
        setLoading(false); // Name: jay jathar Date: 16/1/25 Set loading state to false after data is fetched
      } catch (error) {
        console.error("Error fetching country codes:", error);
        setLoading(false); // Name: jay jathar Date: 16/1/25 Handle error and stop loading
      }
    };

    fetchCountryCodes(); // Name: jay jathar Date: 16/1/25 API call runs once on component mount
  }, []);

  const fields = [
    { label: "First Name", placeholder: "Enter first name", type: "text" },
    { label: "Last Name", placeholder: "Enter last name", type: "text" },
    {
      label: "Mobile Number",
      placeholder: "Enter mobile number",
      type: "mobile", // Name: jay jathar Date: 16/1/25 Custom type for handling country code dropdown
    },
    { label: "Email", placeholder: "Enter email", type: "text" },
  ];

  const education = [
    { label: "Current Job", placeholder: "Enter current job" },
    { label: "Company Name", placeholder: "Enter company name" },
    { label: "LinkedIn Profile", placeholder: "Enter LinkedIn profile URL" },
    {
      label: "Skills & Expertise",
      placeholder: "Enter your skills and expertise",
    },
  ];

  const professional = [
    { label: "Current Job", placeholder: "Enter current job", type: "text" },
    { label: "Company Name", placeholder: "Enter company name", type: "text" },
    { label: "Job Role", placeholder: "Enter job role", type: "text" },
    {
      label: "LinkedIn Profile",
      placeholder: "Enter LinkedIn profile URL",
      type: "text",
    },
    {
      label: "Skills",
      placeholder: "Enter your skills",
      options: ["JavaScript", "React", "Node.js", "Python"],
    },
    {
      label: "Expertise",
      placeholder: "Enter your expertise",
      options: ["Frontend", "Backend", "Full Stack", "DevOps"],
    },
  ];

  //option fopr skills and expertise check
  return (
    <>
      <div className="flex lg:w-[90%] w-full px-2">
        <Sidebar />
        <div className="mt-3 md:ml-[300px] w-full">
          <ProfileHeader />
          <h1 className="text-[1.3rem] font-bold text-[#0e2b54] max-md:px-4">
            Edit Your Profile
          </h1>

          {/* Profile Form */}
          <div className="rounded-lg border bg-[#eff2f9] relative mt-4">
            <div className="flex items-center justify-between absolute md:-top-16 left-4 right-4 -top-10">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex justify-center items-center">
                <UserProfileEdit
                  userProfile={userData}
                  loading={loading}
                  handleclick={handleclick}
                />
                <div>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <img
                src="/profile1.png"
                alt="profile"
                className="md:ml-10 h-40 w-40 max-md:h-28 max-md:w-28"
              />
            </div>

            <form className="mt-20 w-[90%] mx-auto">
              {" "}
              {/*Name: jay jathar Date: 16/1/25 Form for updating profile details*/}
              <div className="grid sm:grid-cols-2 gap-4">
                {fields.map((field, index) => (
                  <div key={index}>
                    <label
                      htmlFor="currentJob"
                      className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                    >
                      {field.label}
                    </label>
                    <input
                      id="currentJob"
                      className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}

                {fields.map((field, index) =>
                  field.type === "mobile" ? (
                    <div key={index}>
                      <label
                        htmlFor="mobileNumber"
                        className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                      >
                        {field.label}
                      </label>
                      <div className="flex shadow-lg border rounded-full h-[50px] mt-1">
                        <select
                          id="countryCode"
                          className="bg-white border-none rounded-l-full px-3 outline-none text-gray-400 text-[1rem]"
                        >
                          {loading ? (
                            <option>Loading...</option> // Name: jay jathar Date: 16/1/25 Show loading message while fetching data
                          ) : (
                            countryCodes.map((code, idx) => (
                              <option key={idx} value={code.code}>
                                {code.code} ({code.country})
                              </option> // Name: jay jathar Date: 16/1/25 Display country code and name
                            ))
                          )}
                        </select>{" "}
                        {/*Name: jay jathar Date: 16/1/25 Dropdown for country codes*/}
                        <input
                          type="text"
                          id="mobileNumber"
                          className="flex-1 p-1 outline-none rounded-r-full text-gray-400 text-[1rem] px-2"
                          placeholder={field.placeholder}
                        />
                      </div>
                    </div>
                  ) : (
                    <div key={index}>
                      <label
                        htmlFor={field.label}
                        className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                      >
                        {field.label}
                      </label>
                      <input
                        id={field.label}
                        className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
                        placeholder={field.placeholder}
                      />
                    </div>
                  )
                )}
              </div>
              {/* Address Section */}
              <div className="mt-3">
                <label
                  htmlFor="address"
                  className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  className="mt-1 block shadow-lg w-full h-20 px-4 py-2 border rounded-lg outline-none text-[1rem] text-gray-400 resize-none overflow-y-auto"
                  placeholder="Enter your address"
                />
              </div>
              {/* Education Details */}
              <h1 className="text-[1.3rem] font-bold text-[#0e2b54] my-4 px-4">
                Education Details
              </h1>
              <div className="grid sm:grid-cols-2 gap-4">
                {education.map((field, index) => (
                  <div key={index}>
                    <label
                      htmlFor={field.label}
                      className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.label}
                      className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
                      placeholder={field.placeholder}
                    />
                  </div>
                ))}
              </div>
              {/* Professional Details */}
              <h1 className="text-[1.3rem] font-bold text-[#0e2b54] my-4 px-4">
                Professional Details
              </h1>
              <div className="grid sm:grid-cols-2 gap-4">
                {professional.map((field, index) => (
                  <div key={index}>
                    <label
                      htmlFor="currentJob"
                      className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                    >
                      {field.label}
                    </label>
                    {field.type === "text" ? (
                      <input
                        id="currentJob"
                        className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
                        placeholder={field.placeholder}
                      />
                    ) : (
                      <Select1
                        options={field.options.map((option) => ({
                          value: option,
                          label: option,
                        }))}
                        multi
                        placeholder={field.placeholder}
                        onChange={(values) =>
                          handleSelectChange(values, field.label.toLowerCase())
                        }
                        className="mt-1 shadow-lg block w-full p-2 border bg-white !rounded-full h-[50px] justify-center outline-none text-gray-400 text-[1rem] px-4"
                      >
                        {field.options.map((option, index) => (
                          <option
                            key={index}
                            value={option}
                            className="border rounded-full bg-black"
                          >
                            {option}
                          </option>
                        ))}
                      </Select1>
                      // <Select
                      //   id="currentJob"
                      //   className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] justify-center outline-none text-gray-400 text-[1rem] px-4"
                      //   placeholder={field.placeholder}
                      // >
                      //   {field.options.map((option, index) => (
                      //     <option
                      //       key={index}
                      //       value={option}
                      //       className="border rounded-full"
                      //     >
                      //       {option}
                      //     </option>
                      //   ))}
                      // </Select>
                    )}
                  </div>
                ))}
              </div>
              {/* Buttons */}
              <div className="flex gap-4 justify-center mt-10 mb-5">
                <button className="px-8 py-2 h-[50px] bg-[#facd32] font-bold text-[1.3rem] text-slate-50 hover:bg-white hover:text-[#facd32] transition duration-700 rounded-lg">
                  Update
                </button>
                <button className="px-8 py-2 h-[50px] bg-[#6E9FFF] font-bold text-[1.3rem] text-slate-50 border border-[#6E9FFF] hover:bg-white hover:text-[#6E9FFF] transition duration-700 rounded-lg">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;

// import React, { useState } from "react";
// import { ChevronDown } from "lucide-react";
// import Sidebar from "./Sidebar";
// import ProfileHeader from "./ProfileHeader";
// // import Select from 'react-select';
// import Select from "react-dropdown-select";

// const UpdateProfile = () => {
// const [formData, setFormData] = useState({});

// const handleSelectChange = (values, field) => {
//   setFormData((prevData) => ({
//     ...prevData,
//     [field]: values.map((v) => v.value),
//   }));
// };

//   const fields = [
//     { label: "First Name", placeholder: "Enter first name" },
//     { label: "Last Name", placeholder: "Enter last name" },
//     { label: "Mobile Number", placeholder: "Enter mobile number" },
//     { label: "Email", placeholder: "Enter email" },
//   ];

//   const education = [
//     { label: "Current Job", placeholder: "Enter current job" },
//     { label: "Company Name", placeholder: "Enter company name" },
//     { label: "LinkedIn Profile", placeholder: "Enter LinkedIn profile URL" },
//     {
//       label: "Skills & Expertise",
//       placeholder: "Enter your skills and expertise",
//     },
//   ];

// const professional = [
//   { label: "Current Job", placeholder: "Enter current job", type: "text" },
//   { label: "Company Name", placeholder: "Enter company name", type: "text" },
//   { label: "Job Role", placeholder: "Enter job role", type: "text" },
//   {
//     label: "LinkedIn Profile",
//     placeholder: "Enter LinkedIn profile URL",
//     type: "text",
//   },
//   {
//     label: "Skills",
//     placeholder: "Enter your skills",
//     options: ["JavaScript", "React", "Node.js", "Python"],
//   },
//   {
//     label: "Expertise",
//     placeholder: "Enter your expertise",
//     options: ["Frontend", "Backend", "Full Stack", "DevOps"],
//   },
// ];

//   return (
//     <>
//       <div className="flex lg:w-[90%] w-full px-2">
//         <Sidebar />
//         <div className=" mt-3     md:ml-[300px] w-full ">
//           <ProfileHeader />
//           <h1 className="text-[1.3rem] font-bold text-[#0e2b54] max-md:px-4">
//             Edit Your Profile
//           </h1>

//           {/* Profile Form */}
//           <div className="rounded-lg border bg-[#eff2f9]  relative mt-4">
//             <div className="flex items-center justify-between absolute md:-top-16 left-4 right-4  -top-10">
//               <div className="h-16 w-16 rounded-full bg-blue-500 flex justify-center items-center" />
//               <img
//                 src="/profile1.png"
//                 alt="profile"
//                 className="md:ml-10 h-40 w-40 max-md:h-28 max-md:w-28 "
//               />
//             </div>

//             <form className="mt-20 w-[90%] mx-auto">
//               <div className="grid sm:grid-cols-2 gap-4">
//                 {fields.map((field, index) => (
//                   <div key={index}>
//                     <label
//                       htmlFor="currentJob"
//                       className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
//                     >
//                       {field.label}
//                     </label>
//                     <input
//                       id="currentJob"
//                       className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
//                       placeholder={field.placeholder}
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-3">
//                 <label
//                   htmlFor="address"
//                   className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
//                 >
//                   Address
//                 </label>
//                 <textarea
//                   id="address"
//                   className="mt-1 block shadow-lg w-full h-20 px-4 py-2 border rounded-lg outline-none text-[1rem] text-gray-400"
//                   placeholder="Enter your address"
//                 />
//               </div>

//               <h1 className="text-[1.3rem] font-bold text-[#0e2b54] my-4 px-4">
//                 Education Details
//               </h1>
//               <div className="grid sm:grid-cols-2 gap-4">
//                 {education.map((field, index) => (
//                   <div key={index}>
//                     <label
//                       htmlFor="currentJob"
//                       className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
//                     >
//                       {field.label}
//                     </label>
//                     <input
//                       id="currentJob"
//                       className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
//                       placeholder={field.placeholder}
//                     />
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-3">
//                 <label
//                   htmlFor="address"
//                   className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
//                 >
//                   Address
//                 </label>
//                 <textarea
//                   id="address"
//                   className="mt-1 block shadow-lg w-full h-20 px-4 py-2 border rounded-lg outline-none text-[1rem] text-gray-400"
//                   placeholder="Enter your address"
//                 />
//               </div>

//               <h1 className="text-[1.3rem] font-bold text-[#0e2b54] my-4 px-4">
//                 Professional Details
//               </h1>
//               <div className="grid sm:grid-cols-2 gap-4">
// {professional.map((field, index) => (
//   <div key={index}>
//     <label
//       htmlFor="currentJob"
//       className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
//     >
//       {field.label}
//     </label>
//     {field.type === "text" ? (
//       <input
//         id="currentJob"
//         className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
//         placeholder={field.placeholder}
//       />
//     ) : (
//       <Select
//         options={field.options.map((option) => ({
//           value: option,
//           label: option,
//         }))}
//         multi
//         placeholder={field.placeholder}
//         onChange={(values) =>
//           handleSelectChange(values, field.label.toLowerCase())
//         }
//         className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] justify-center outline-none text-gray-400 text-[1rem] px-4"
//       >
//         {field.options.map((option, index) => (
//           <option
//             key={index}
//             value={option}
//             className="border rounded-full"
//           >
//             {option}
//           </option>
//         ))}
//       </Select>
//       // <Select
//       //   id="currentJob"
//       //   className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] justify-center outline-none text-gray-400 text-[1rem] px-4"
//       //   placeholder={field.placeholder}
//       // >
//       //   {field.options.map((option, index) => (
//       //     <option
//       //       key={index}
//       //       value={option}
//       //       className="border rounded-full"
//       //     >
//       //       {option}
//       //     </option>
//       //   ))}
//       // </Select>
//     )}
//   </div>
// ))}
//               </div>

//               <div className="flex gap-4 justify-center mt-10 mb-5">
//                 <button className="px-8 py-2 h-[50px] bg-[#facd32] font-bold text-[1.3rem] text-slate-50 hover:bg-white hover:text-[#facd32] transition duration-700 rounded-lg">
//                   Update
//                 </button>
//                 <button className="px-8 py-2 h-[50px] border bg-[#88affe] text-[1.3rem] font-bold rounded-lg text-slate-50 hover:bg-white transition duration-700 hover:text-[#88affe]">
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Contact Section */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default UpdateProfile;
