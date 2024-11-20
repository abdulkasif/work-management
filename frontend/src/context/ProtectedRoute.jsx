import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userDoc = JSON.parse(localStorage.getItem("user"));

  // If userDoc is not found, redirect to the login page
  if (!userDoc) {
    return <Navigate to="/" replace />;
  }
  

  // If userDoc exists, render the children (protected content)
  return children;
};

export default ProtectedRoute;
