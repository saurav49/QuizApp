import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTheme } from "../../hooks/index";
import { useAuth } from "../../hooks/useAuth";

import { RiLoginCircleLine } from "react-icons/ri";
import { HiEye, HiOutlineEyeOff } from "react-icons/hi";
import { validateEmail, validatePassword } from "../../utils";
import Loader from "react-loader-spinner";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { handleLogin, showLoader } = useAuth();

  const navigateToSignUpPage = () => {
    navigate("/SignUp");
  };

  const handleUserCredentials = async (email: string, password: string) => {
    if (email.length === 0 || password.length === 0) {
      setError("Input field cannot be empty");
    }

    if (!validateEmail(email)) {
      setEmail("");
      setError("Enter valid email");
    }

    if (!validatePassword(password)) {
      setPassword("");
      setError("Enter valid password");
    }

    const { success, errorMessage } = await handleLogin(
      email,
      password,
      setEmail,
      setPassword
    );

    success
      ? setError("")
      : errorMessage !== undefined
      ? setError(errorMessage)
      : setError("Something went wrong in handleLogin");
  };

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.loginPage} ${styles.loginPageDark}`
          : `${styles.loginPage} ${styles.loginPageLight}`
      }
    >
      <div
        className={
          theme === "dark"
            ? `${styles.loginComponent} ${styles.loginComponentDark}`
            : `${styles.loginComponent} ${styles.loginComponentLight}`
        }
      >
        <h2>Welcome Back</h2>
        <p className={styles.navigateBtn}>
          Don't Have An Account
          <span onClick={() => navigateToSignUpPage()}>Sign Up</span>
        </p>

        <div className={styles.inputComponent}>
          <input
            className={
              theme === "dark" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputComponent} style={{ marginLeft: "1.1em" }}>
          <input
            className={
              theme === "dark" ? `${styles.inputDark}` : `${styles.inputLight}`
            }
            type={showPassword ? "text" : "password"}
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
        {error.length > 0 && <span> {error} </span>}
        <button
          className={styles.btn}
          onClick={() => handleUserCredentials(email, password)}
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
              Login <RiLoginCircleLine className={styles.btnIcon} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export { Login };
