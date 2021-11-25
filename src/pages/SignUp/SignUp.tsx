import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { useTheme } from "../../hooks/index";
import { useAuth } from "../../hooks/useAuth";
import { BsPeopleCircle } from "react-icons/bs";
import { HiEye, HiOutlineEyeOff } from "react-icons/hi";
import { validateEmail, validatePassword, validateUsername } from "../../utils";
import Loader from "react-loader-spinner";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { theme } = useTheme();
  // console.log("SignUp", useAuth);

  const { handleSignUp, showLoader } = useAuth();

  const checkInputValidation = (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    ) {
      return setError("Input Fields cannot be empty");
    }

    if (!validateEmail(email)) {
      return setError("Enter a valid Email");
    }

    if (!validatePassword(password)) {
      return setError(
        "Password should contain atleast 6 characters of atleast lowercase, uppercase and numeric integer"
      );
    }

    if (!validateUsername(username)) {
      return setError("Enter a valid username");
    }

    if (password !== confirmPassword) {
      return setError("Password and confirm password should match");
    }

    console.log("SignUp Hello");
    setError("");

    handleSignUp(
      username,
      email,
      password,
      setUsername,
      setEmail,
      setPassword,
      setConfirmPassword
    );
  };

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
        <p>{error.length > 0 && error}</p>
        <button
          className={styles.btn}
          onClick={() =>
            checkInputValidation(username, email, password, confirmPassword)
          }
        >
          {showLoader ? (
            <Loader
              type="ThreeDots"
              color="#00BFFF"
              height={20}
              width={70}
              timeout={3000}
            />
          ) : (
            <>
              Sign Up <BsPeopleCircle className={styles.btnIcon} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export { SignUp };
