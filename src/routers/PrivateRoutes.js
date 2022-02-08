import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ isAuthenticated, children }) =>
  isAuthenticated ? children : <Navigate to="/auth/login" />;
