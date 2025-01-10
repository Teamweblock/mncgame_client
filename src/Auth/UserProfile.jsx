import { User } from "lucide-react";
import React, { useState, useEffect } from "react";

const UserProfile = ({ user, loading, bgColor = "#f37ce7" }) => {
  const [profile, setProfile] = useState(null);

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
        <span className="text-white text-lg font-semibold">
          {getInitials()}
        </span>
      )}
    </div>
  );
};

export default UserProfile;
