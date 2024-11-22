import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedDesignations }) => {
  const userDoc = JSON.parse(localStorage.getItem("user"));

  // If userDoc is not found, redirect to the login page
  if (!userDoc) {
    return <Navigate to="/" replace />;
  }

  // Check if user's designation is allowed
  if (!allowedDesignations.includes(userDoc.designation)) {
    return <Navigate to="/" replace />;
  }

  // If userDoc exists and designation is allowed, render the children (protected content)
  return children;
};

export default ProtectedRoute;
