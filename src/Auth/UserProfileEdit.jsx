import { User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const UserProfileEdit = ({ loading, userProfile, handleclick, bgColor = "#f37ce7" }) => {
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);


  // const getInitials = () => {
  //   if (profile && profile.firstName && profile.lastName) {
  //     return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
  //   }
  //   return ""; // Default initial if no name is available
  // };

  return (
    <div
      className={`rounded-full h-12 w-12 flex justify-center items-center ${bgColor}`}
    >
      {loading ? (
        <User color="white" />
      ) : profile && profile.avatar ? (
        // If avatar exists, display it
        <img
          src={profile.avatar}
          alt="Profile Avatar"
          className="rounded-full w-full h-full object-cover"
        />
      ) : (
        // If no avatar, show initials
        <span className="text-white text-lg font-semibold" onClick={handleclick}>
          {/* {getInitials()} */}
          <FiEdit className="text-white text-2xl"  />
        </span>
      ) }
    </div>
  );
};

export default UserProfileEdit;
