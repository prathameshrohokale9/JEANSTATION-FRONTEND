// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowEmployee = false }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const isEmployee = localStorage.getItem('isEmployee') === 'true';

  if (!user) {
    // Redirect to login if no user is logged in
    return <Navigate to="/login" />;
  }

  if (allowEmployee && !isEmployee) {
    // Redirect to home if user is not an employee but the route requires an employee
    return <Navigate to="/" />;
  }

  // Allow access if user is logged in and meets any other requirements
  return children;
}

export default ProtectedRoute;
