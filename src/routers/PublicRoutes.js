import React from "react";
import { Navigate } from "react-router-dom";

export const PublicRoutes = ({ isAuthenticated, children }) =>
  isAuthenticated ? <Navigate to="/" /> : children;
