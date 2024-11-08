import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ProfilePicture = () => {

  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/logout', {
        method: 'POST',
        credentials: 'include' // This ensures cookies are sent with the request
      });

      if (response.status === 200) {
        // Clear local storage
        localStorage.clear();
        
        // Navigate to login page
        navigate('/');
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  return (
    <div className="relative inline-block">
      <div
        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-10 h-10 cursor-pointer"
        style={{ backgroundImage: 'url("https://cdn.usegalileo.ai/sdxl10/85dd54b6-9653-4190-8f16-2ea78dec2ac4.png")' }}
        onClick={handleProfileClick}
      />

      {showLogout && (
        <div className="absolute mt-2 p-3 bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-md right-0 w-24">
          <button
            onClick={handleLogout}
            className="text-sm text-gray-700 font-semibold hover:text-red-500 focus:outline-none transition-colors duration-200 ease-in-out"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicture;
