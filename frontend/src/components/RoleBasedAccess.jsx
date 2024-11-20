// src/components/RoleBasedAccess.js
import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

const RoleBasedAccess = ({ allowedDesignations, children }) => {
  const { userInfo } = useContext(UserContext); // Access user context

  // Check if the user's designation is included in the allowed designations
  if (!userInfo?.designation || !allowedDesignations.includes(userInfo.designation)) {
    // If not allowed, render a restricted access message or an empty component
    return null;
  }

  // If designation matches, render the children components
  return <>{children}</>;
};

export default RoleBasedAccess;