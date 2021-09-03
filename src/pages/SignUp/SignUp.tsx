import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useTheme, useAuth } from "../../hooks/index";
import { BsPeopleCircle } from "react-icons/bs";
import { HiEye, HiOutlineEyeOff } from "react-icons/hi";
import { backendURL } from "../../utils";

const SignUp = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    setError,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    handleSignUp,
  } = useAuth();

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.signupPage} ${styles.signupPageDark}`
          : `${styles.signupPage} ${styles.signupPageLight}`
      }
    >
      <div
        className={
          theme === "dark"
            ? `${styles.signupComponent} ${styles.signupComponentDark}`
            : `${styles.signupComponent} ${styles.signupComponentLight}`
        }
      >
        <h2>Create Account</h2>
        <p className={styles.navigateBtn}>
          Already Have An Account
          <span onClick={() => navigateToLoginPage()}>Login</span>
        </p>

        <div className={styles.inputComponent}>
          <input
            className={
              theme === "dark" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.inputComponent}>
          <input
            className={
              theme === "dark" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            name="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </div>
        <div className={styles.inputComponent} style={{ marginLeft: "1.1em" }}>
          <input
            className={
              theme === "dark" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            name="password"
            type={!showPassword ? "password" : "text"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {!showPassword ? (
            <HiEye
              onClick={() => setShowPassword((value) => !value)}
              className={styles.passwordIcon}
            />
          ) : (
            <HiOutlineEyeOff
              onClick={() => setShowPassword((value) => !value)}
              className={styles.passwordIcon}
            />
          )}
        </div>
        <div className={styles.inputComponent} style={{ marginLeft: "1.1em" }}>
          <input
            className={
              theme === "dark" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            name="confirmpassword"
            type={!showConfirmPassword ? "password" : "text"}
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!showConfirmPassword ? (
            <HiEye
              onClick={() => setShowConfirmPassword((value) => !value)}
              className={styles.passwordIcon}
            />
          ) : (
            <HiOutlineEyeOff
              onClick={() => setShowConfirmPassword((value) => !value)}
              className={styles.passwordIcon}
            />
          )}
        </div>
        <p>{error !== "" && error}</p>
        <button
          disabled={password !== confirmPassword}
          className={styles.btn}
          onClick={() => handleSignUp()}
        >
          Sign Up <BsPeopleCircle className={styles.btnIcon} />
        </button>
      </div>
    </div>
  );
};

export { SignUp };
