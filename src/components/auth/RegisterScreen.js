import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import validator from "validator";
import { removeError, setError } from "../../actions/ui";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterWithEmailAndPassword } from "../../actions/auth";

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: "Gabriel",
    email: "gabomon.r@gmail.com",
    password: "123456",
    password2: "123456",
  });
  const { name, email, password, password2 } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      dispatch(startRegisterWithEmailAndPassword(email, password, name));
    }
  };
  const isFormValid = () => {
    if (!!!name.trim()) {
      dispatch(setError("Name is required"));
      return !!name.trim();
    } else if (!!!email.trim() || !validator.isEmail(email)) {
      dispatch(setError("Email is not valid"));
      return false;
    } else if (!!!password.trim()) {
      dispatch(setError("Password is required"));
      return false;
    } else if (password.trim().length < 5) {
      dispatch(setError("Password should be at least 6 characters"));
      return false;
    } else if (!!!password2.trim()) {
      dispatch(setError("Password2 is required"));
      return false;
    } else if (password2.trim().length < 5) {
      dispatch(setError("Password2 should be at least 6 characters"));
      return false;
    } else if (password.trim() !== password2.trim()) {
      dispatch(setError("Passwords not match"));
      return false;
    }
    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className="auth__title mb-5 animate__animated animate__flipInX">
        Register
      </h3>
      <form
        onSubmit={handleRegister}
        className="animate__animated animate__fadeIn"
      >
        {msgError && <div className="auth__alert-error">{msgError}</div>}
        <input
          type="text"
          placeholder="Name"
          name="name"
          autoComplete="off"
          className="auth__input"
          value={name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          className="auth__input"
          value={email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          className="auth__input"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          autoComplete="off"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-primary btn-block mb-5">
          Register
        </button>
        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
