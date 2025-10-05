import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    // If there's no token, redirect to the /login page
    return <Navigate to="/login" />;
  }

  return children; // If there is a token, render the child component
};

export default ProtectedRoute;