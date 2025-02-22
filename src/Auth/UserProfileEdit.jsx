import { User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
const API_URL = process.env.BACKEND_URL || "http://localhost:8000";

const UserProfileEdit = ({
  loading,
  userProfile,
  handleclick,
  bgColor = "#f37ce7",
}) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  return (
    <div
      className={`rounded-full h-10 w-10 flex justify-center items-center ${bgColor}`}
    >
      {
        /* {loading ? (
        <User color="white" />
      ) : profile && profile?.avatar ? (
        // If avatar exists, display it
        <img
          src={
            `${API_URL}/${profile?.avatar?.replace(/\\/g, "/")}` ||
            "/profile1.png"
          }
          alt="Profile Avatar"
          className="rounded-full w-full h-full object-cover"
        />
      ) : (
        // If no avatar, show edit icon
        <span
          className="text-white text-lg font-semibold cursor-pointer"
          onClick={handleclick} // Trigger file input
        >
          <FiEdit className="text-white text-2xl" />
        </span>
      )} */
        <span
          className="text-white text-lg font-semibold cursor-pointer"
          onClick={handleclick} // Trigger file input
        >
          <FiEdit className="text-white text-2xl" />
        </span>
      }
    </div>
  );
};

export default UserProfileEdit;
