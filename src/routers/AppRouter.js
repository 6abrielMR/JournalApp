import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRouter } from "./PublicRouter";
import { PublicRoutes } from "./PublicRoutes";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }

      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return <h1>Wait...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoutes isAuthenticated={isLoggedIn}>
              <AuthRouter />
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes isAuthenticated={isLoggedIn}>
              <PublicRouter />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
