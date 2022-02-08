import Swal from "sweetalert2";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

const _auth = getAuth();

const parseError = (errorMessage) => {
  if (errorMessage.includes("not-found")) {
    return "Review your credentials";
  } else {
    return errorMessage
      .substring(errorMessage.indexOf(":") + 1, errorMessage.length)
      .replaceAll("(", "")
      .replaceAll(")", "")
      .replaceAll("-", " ")
      .replaceAll("/", ", ");
  }
};

export const startLoginWithEmailAndPassword =
  (email, password) => (dispatch) => {
    dispatch(startLoading());
    signInWithEmailAndPassword(_auth, email, password)
      .then(async ({ user }) => {
        await dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((e) => {
        dispatch(finishLoading());
        Swal.fire({
          icon: "error",
          title: "I can't log in",
          text: parseError(e.message),
        });
      });
  };

export const startRegisterWithEmailAndPassword =
  (email, password, name) => (dispatch) => {
    createUserWithEmailAndPassword(_auth, email, password)
      .then(async ({ user }) => {
        await updateProfile(user, { displayName: name });
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) =>
        Swal.fire({
          icon: "error",
          title: "User could not be created",
          text: parseError(e.message),
        })
      );
  };

export const startGoogleLogin = () => (dispatch) => {
  signInWithPopup(_auth, googleAuthProvider).then(({ user }) => {
    dispatch(login(user.uid, user.displayName));
  });
};

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName,
  },
});

export const startLogout = () => async (dispatch) => {
  await signOut(_auth);
  dispatch(logout());
  dispatch(noteLogout());
};

export const logout = () => ({
  type: types.logout,
});
