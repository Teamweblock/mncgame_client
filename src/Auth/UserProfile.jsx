import { User } from "lucide-react";
import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";

const UserProfile = ({ user, loading,userProfile, bgColor = "#f37ce7" }) => {
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);


  useEffect(() => {
    // Here, you can check if the profile exists (e.g., check API or localStorage).
    if (user && user?.firstName && user?.lastName) {
      setProfile(user);
    }
  }, [user]);

  const getInitials = () => {
    if (user && user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(
        0
      )}`.toUpperCase();
    }
    return "";
  };

  // const getInitials = () => {
  //   if (profile && profile.firstName && profile.lastName) {
  //     return `${profile.firstName.charAt(0)}${profile.lastName.charAt(0)}`.toUpperCase();
  //   }
  //   return "U"; // Default initial if no name is available
  // };

  return (
    <div
      className={`rounded-full h-12 w-12 flex justify-center items-center ${bgColor}`}
    >
      {loading ? (
        <User color="white" />
      ) : profile ? (
        profile.avatar ? (
          <img
            src={profile.avatar}
            alt="Profile Avatar"
            className="rounded-full w-full h-full object-cover"
          />
        ) : (
          <span className="text-white text-lg font-semibold">
            {getInitials()}
            
          </span>
        )
      ) : (
        <FiEdit className="text-white text-lg" />
      )}
      {/* {loading ? (
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
        <span className="text-white text-lg font-semibold">
          {getInitials()}
          <FiEdit className="text-white text-lg" />
        </span>
      ) } */}
      {/* : (
        <FiEdit className="text-white text-lg" />
      ) */}
    </div>
  );
};

export default UserProfile;
