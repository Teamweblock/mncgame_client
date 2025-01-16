import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
// import Select from 'react-select';
import Select from "react-dropdown-select";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({});

  const handleSelectChange = (values, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: values.map((v) => v.value),
    }));
  };


  const fields = [
    { label: "First Name", placeholder: "Enter first name" },
    { label: "Last Name", placeholder: "Enter last name" },
    { label: "Mobile Number", placeholder: "Enter mobile number" },
    { label: "Email", placeholder: "Enter email" },
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

  return (
    <>
      <div className="flex lg:w-[90%] w-full px-2">
        <Sidebar />
        <div className=" mt-3     md:ml-[300px] w-full ">
          <ProfileHeader />
          <h1 className="text-[1.3rem] font-bold text-[#0e2b54] max-md:px-4">
            Edit Your Profile
          </h1>

          {/* Profile Form */}
          <div className="rounded-lg border bg-[#eff2f9]  relative mt-4">
            <div className="flex items-center justify-between absolute md:-top-16 left-4 right-4  -top-10">
              <div className="h-16 w-16 rounded-full bg-blue-500 flex justify-center items-center" />
              <img
                src="/profile1.png"
                alt="profile"
                className="md:ml-10 h-40 w-40 max-md:h-28 max-md:w-28 "
              />
            </div>

            <form className="mt-20 w-[90%] mx-auto">
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
              </div>

              <div className="mt-3">
                <label
                  htmlFor="address"
                  className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  className="mt-1 block shadow-lg w-full h-20 px-4 py-2 border rounded-lg outline-none text-[1rem] text-gray-400"
                  placeholder="Enter your address"
                />
              </div>

              <h1 className="text-[1.3rem] font-bold text-[#0e2b54] my-4 px-4">
                Education Details
              </h1>
              <div className="grid sm:grid-cols-2 gap-4">
                {education.map((field, index) => (
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
              </div>

              <div className="mt-3">
                <label
                  htmlFor="address"
                  className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  className="mt-1 block shadow-lg w-full h-20 px-4 py-2 border rounded-lg outline-none text-[1rem] text-gray-400"
                  placeholder="Enter your address"
                />
              </div>

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
                      <Select
                        options={field.options.map((option) => ({
                          value: option,
                          label: option,
                        }))}
                        multi
                        placeholder={field.placeholder}
                        onChange={(values) =>
                          handleSelectChange(values, field.label.toLowerCase())
                        }
                        className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] justify-center outline-none text-gray-400 text-[1rem] px-4"
                      >
                        {field.options.map((option, index) => (
                          <option
                            key={index}
                            value={option}
                            className="border rounded-full"
                          >
                            {option}
                          </option>
                        ))}
                      </Select>
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

              <div className="flex gap-4 justify-center mt-10 mb-5">
                <button className="px-8 py-2 h-[50px] bg-[#facd32] font-bold text-[1.3rem] text-slate-50 hover:bg-white hover:text-[#facd32] transition duration-700 rounded-lg">
                  Update
                </button>
                <button className="px-8 py-2 h-[50px] border bg-[#88affe] text-[1.3rem] font-bold rounded-lg text-slate-50 hover:bg-white transition duration-700 hover:text-[#88affe]">
                  Cancel
                </button>
              </div>
            </form>
          </div>

          {/* Contact Section */}
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
