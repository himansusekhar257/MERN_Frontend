// PrivateRoutes.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/account/login" />;
  }

  // Render nested routes if user is authenticated
  return <Outlet />;
};

export default PrivateRoutes;
