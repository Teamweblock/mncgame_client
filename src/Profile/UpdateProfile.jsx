import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import ProfileHeader from "./ProfileHeader";
import Select from "react-dropdown-select";
import { getUserProfile, updatePlayer } from "../utils/axiosInstance";
import UserProfileEdit from "../Auth/UserProfileEdit";
const API_URL = process.env.BACKEND_URL || "http://localhost:8000";

const UpdateProfile = () => {
  const fileInputRef = useRef(null);
  const [countryCodes, setCountryCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // Track selected image
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    educationDetails: {
      // currentJob: "",
      // companyName: "",
      // linkedInProfile: "",
      // skills_expertise: [],
    },
    professionalDetails: {
      // currentJob: "",
      // companyName: "",
      // jobRole: "",
      // linkedInProfile: "",
      // skills: [],
      // expertise: [],
    },
    avatar: null, // Default avatar path or null
  });

  // Error states
  const [errors, setErrors] = useState({});
  // Form submission state
  const [submitted, setSubmitted] = useState(false);
  // Persist form data from localStorage if it exists
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("formData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  // Save form data to localStorage whenever form data changes
  useEffect(() => {
    if (submitted) return; // Don't save to localStorage if it's just being submitted
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // Input change handlers
  const handleInputChange = (e, section = null) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (section) {
        // If a section is provided, update nested fields
        return {
          ...prev,
          [section]: {
            ...prev[section],
            [name]: value,
          },
        };
      } else {
        // Otherwise, update top-level fields
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  // Validation functions
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = "First Name should contain only letters";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last Name is required";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = "Last Name should contain only letters";
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the selected image in state
      setUserData((prevData) => ({
        ...prevData,
        avatar: URL.createObjectURL(file), // Preview the selected image
      }));
    }
  };

  // Trigger file input when edit icon is clicked
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit
    setSubmitted(true);

    if (validate()) {
      try {
        const formDataToSend = new FormData();

        // Append text fields
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("mobileNumber", formData.mobileNumber);
        formDataToSend.append("address", formData.address || "");

        // Append JSON fields
        formDataToSend.append(
          "educationDetails",
          JSON.stringify({
            currentJob: formData.educationDetails?.currentJob || "",
            companyName: formData.educationDetails?.companyName || "",
            linkedInProfile: formData.educationDetails?.linkedInProfile || "",
            skills_expertise: formData.educationDetails?.skills_expertise || [],
          })
        );

        formDataToSend.append(
          "professionalDetails",
          JSON.stringify({
            currentJob: formData.professionalDetails?.currentJob || "",
            companyName: formData.professionalDetails?.companyName || "",
            jobRole: formData.professionalDetails?.jobRole || "",
            linkedInProfile:
              formData.professionalDetails?.linkedInProfile || "",
            skills: formData.professionalDetails?.skills || [],
            expertise: formData.professionalDetails?.expertise || [],
          })
        );

        // Append image file
        if (selectedImage) {
          formDataToSend.append("avatar", selectedImage);
        }

        console.log("formData", formData);

        // Call updatePlayer API
        const response = await updatePlayer(formDataToSend);

        if (response) {
          setUserData((prevData) => ({
            ...prevData,
            avatar: response.updatedPlayer.avatar, // Update avatar
          }));
          setSelectedImage(null); // Clear selected image

          // Refresh the page after a successful update
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          console.error("Failed to update profile");
        }
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const codes = data.map((country) => ({
          code: country.idd.root
            ? `${country.idd.root}${country.idd.suffixes?.[0] || ""}`
            : "+",
          country: country.name.common,
        }));
        const validCodes = codes.filter((code) => code.code !== "+");
        setCountryCodes(validCodes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching country codes:", error);
        setLoading(false);
      }
    };
    fetchCountryCodes();
  }, []);

  // Fetch user profile on mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfile();
        if (profileData?.userData) {
          setUserData(profileData.userData);
          setFormData({
            firstName: profileData?.userData?.firstName || "",
            lastName: profileData?.userData?.lastName || "",
            email: profileData?.userData?.email || "",
            mobileNumber: profileData?.userData?.mobileNumber || "",
            address: profileData?.userData?.address || "",
            educationDetails: profileData?.userData?.educationDetails || {},
            professionalDetails:
              profileData?.userData?.professionalDetails || {},
            avatar: profileData?.userData?.avatar || "/profile1.png",
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleSelectChange = (values, label, section) => {
    setFormData((prev) => {
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [label]: values.map((v) => v.value),
        },
      };
    });
  };

  const education = [
    { label: "currentJob", placeholder: "Enter current job", type: "text" },
    { label: "companyName", placeholder: "Enter company name", type: "text" },
    {
      label: "linkedInProfile",
      placeholder: "Enter LinkedIn profile URL",
      type: "text",
    },
    {
      label: "skills_expertise",
      placeholder: "Enter your skills",
      options: [
        // Fundamental Skills
        "Leadership and Team Management",
        "Communication Skills",
        "Problem Solving",
        "Critical Thinking",

        // Analytical Skills
        "Data Analysis",
        "Research and Strategy",
        "Decision Making",
        "Quantitative Analysis",

        // Management Skills
        "Project Management",
        "Time Management",
        "Risk Management",
        "People Management",
      ],
    },
  ];

  const professional = [
    { label: "currentJob", placeholder: "Enter current job", type: "text" },
    { label: "companyName", placeholder: "Enter company name", type: "text" },
    { label: "jobRole", placeholder: "Enter job role", type: "text" },
    {
      label: "linkedInProfile",
      placeholder: "Enter LinkedIn profile URL",
      type: "text",
    },
    {
      label: "skills",
      placeholder: "Enter your skills",
      options: [
        "Leadership and Team Management",
        "Problem Solving",
        "Communication Skills",
        "Time Management",
        "Negotiation Skills",
      ],
    },
    {
      label: "expertise",
      placeholder: "Enter your expertise",
      options: [
        "Business Strategy",
        "Data Science",
        "Software Engineering",
        "Cybersecurity",
        "Financial Management",
      ],
    },
  ];

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
            <form onSubmit={handleSubmit} className="mt-20 w-[90%] mx-auto">
              {/* Profile Image Section */}
              <div className="flex items-center justify-between absolute md:-top-16 left-4 right-4 -top-10">
                <div className="h-16 w-16 rounded-full bg-blue-500 flex justify-center items-center">
                  {/* UserProfileEdit Component */}
                  <UserProfileEdit
                    userProfile={userData}
                    loading={loading}
                    handleclick={handleImageClick} // Pass the click handler
                    bgColor="#f37ce7"
                  />
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
                {/* Display the full-size profile image */}
                <img
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : `${API_URL}/${userData?.avatar?.replace(/\\/g, "/")}` ||
                        "/profile1.png"
                  }
                  alt="profile"
                  className="md:ml-10 h-40 w-40 max-md:h-28 max-md:w-28 rounded-full object-cover"
                />
              </div>

              {/* Name Fields */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="text-[#0e2b54] font-medium mb-1">
                    First Name
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={handleInputChange}
                    className={`mt-1 shadow-lg block w-full p-2 border text-gray-400 rounded-full h-[50px] outline-none text-[1rem] px-4 ${
                      errors.firstName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <div className="text-[#0e2b54] font-medium mb-1">
                    Last Name
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    value={formData?.lastName}
                    onChange={handleInputChange}
                    className={`mt-1 shadow-lg block w-full p-2 border text-gray-400 rounded-full h-[50px] outline-none text-[1rem] px-4 ${
                      errors.lastName ? "border-red-500" : ""
                    }`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Mobile and Email Fields */}
              <div className="grid grid-cols-1 gap-4 mt-6 xl:grid-cols-2">
                <div>
                  <div className="text-[#0e2b54] font-medium mb-1">
                    Mobile Number
                  </div>
                  <div className="flex shadow-lg border rounded-full h-[50px]">
                    <select className="bg-white border-none rounded-l-full px-3 outline-none text-gray-400 text-xs w-full max-w-full pe-8 space-x-4 overflow-x-auto whitespace-normal xm:whitespace-normal">
                      {loading ? (
                        <option>Loading...</option>
                      ) : (
                        countryCodes.map((code, idx) => (
                          <option key={idx} value={code?.code}>
                            {code?.code} ({code?.country})
                          </option>
                        ))
                      )}
                    </select>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={formData?.mobileNumber}
                      onChange={handleInputChange}
                      className={`flex-initial p-1 outline-none text-gray-400 rounded-r-full text-[15px] w-[185px] ${
                        errors.mobileNumber ? "border-red-500" : ""
                      }`}
                      placeholder="Enter mobile number"
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-red-500 text-end text-sm mt-1">
                      {errors?.mobileNumber}
                    </p>
                  )}
                </div>

                <div>
                  <div className="text-[#0e2b54] font-medium mb-1">Email</div>
                  <input
                    type="email"
                    name="email"
                    disabled
                    value={formData?.email}
                    onChange={handleInputChange}
                    className={`mt-1 shadow-lg block w-full p-2 text-gray-400 text-[1rem] border rounded-full h-[50px] outline-none  px-4 ${
                      errors?.email ? "border-red-500" : ""
                    }`}
                    placeholder="Enter email"
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-sm mt-1">{errors?.email}</p>
                  )}
                </div>
              </div>

              {/* Address Field */}
              <div className="mt-3">
                <label
                  htmlFor="address"
                  className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  className="mt-1 block shadow-lg w-full h-20 px-4 py-2 border rounded-lg outline-none text-[1rem] text-gray-400 resize-none overflow-y-auto"
                  placeholder="Enter your address"
                  value={formData?.address}
                  onChange={handleInputChange}
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
                      {field?.label.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {field.type === "text" ? (
                      <input
                        id={field.label}
                        name={field.label}
                        className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
                        placeholder={field.placeholder}
                        value={formData?.educationDetails[field.label] || ""}
                        onChange={(e) =>
                          handleInputChange(e, "educationDetails")
                        }
                      />
                    ) : (
                      <>
                        <Select
                          options={field.options.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          multi
                          searchable
                          placeholder={field?.placeholder}
                          value={(
                            formData?.educationDetails?.[field.label] || []
                          ).map((v) => ({
                            value: v,
                            label: v,
                          }))}
                          onChange={(values) => {
                            handleSelectChange(
                              values,
                              field.label,
                              "educationDetails"
                            );
                          }}
                          className="mt-1 shadow-lg block w-full p-2 border bg-white !rounded-full h-[50px] justify-center outline-none text-gray-400 text-[1rem] px-4"
                        />
                      </>
                    )}
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
                      htmlFor={field.label}
                      className="block text-[#0e2b54] font-semibold text-[1.2rem] px-4"
                    >
                      {field?.label.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    {field.type === "text" ? (
                      <input
                        id={field.label}
                        name={field.label}
                        className="mt-1 shadow-lg block w-full p-2 border rounded-full h-[50px] outline-none text-gray-400 text-[1rem] px-4"
                        placeholder={field.placeholder}
                        value={
                          formData?.professionalDetails[field?.label] || ""
                        }
                        onChange={(e) =>
                          handleInputChange(e, "professionalDetails")
                        }
                      />
                    ) : (
                      <>
                        <Select
                          options={field.options.map((option) => ({
                            value: option,
                            label: option,
                          }))}
                          multi
                          searchable
                          placeholder={field?.placeholder}
                          value={(
                            formData?.professionalDetails?.[field.label] || []
                          ).map((v) => ({
                            value: v,
                            label: v,
                          }))}
                          onChange={(values) => {
                            console.log("Selected values:", values); // Debugging log
                            handleSelectChange(
                              values,
                              field.label,
                              "professionalDetails"
                            );
                          }}
                          className="mt-1 shadow-lg block w-full p-2 border bg-white !rounded-full h-[50px] justify-center outline-none text-gray-400 text-[1rem] px-4"
                        />
                        {/* <Select
                          options={field.options.map((skill) => ({
                            value: skill,
                            label: skill,
                          }))}
                          multi
                          searchable
                          placeholder="Select Skills"
                          value={(
                            formData?.professionalDetails?.skills || []
                          ).map((skill) => ({
                            value: skill,
                            label: skill,
                          }))}
                          onChange={(values) => {
                            setFormData((prev) => ({
                              ...prev,
                              professionalDetails: {
                                ...prev.professionalDetails,
                                skills: values.map((v) => v.value),
                              },
                            }));
                          }}
                          className="mt-1 shadow-lg block w-full p-2 border bg-white !rounded-full h-[50px] justify-center outline-none text-gray-400 text-[1rem] px-4"
                        /> */}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-center mt-10 mb-5">
                <button
                  type="submit"
                  className="px-8 py-2 h-[50px] bg-[#facd32] font-bold text-[1.3rem] text-slate-50 hover:bg-white hover:text-[#facd32] transition duration-700 rounded-lg"
                >
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
