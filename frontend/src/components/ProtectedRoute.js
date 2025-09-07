import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // ✅ if no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children; // ✅ if logged in, render the child component
}

export default ProtectedRoute;
