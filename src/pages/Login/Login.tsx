import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTheme } from "../../hooks/index";
import { RiLoginCircleLine } from "react-icons/ri";
import { backendURL } from "../../utils";
import axios from "axios";
import { HiEye, HiOutlineEyeOff } from "react-icons/hi";

const Login = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigateToSignUpPage = () => {
    navigate("/SignUp");
  };

  const handleLogin = async () => {
    if (email === "" || password === "") {
      setError("Email or Password cannot be empty!");
    }

    const response = await axios.post(`${backendURL}/user/login`, {
      user: { email, password },
    });
    console.log({ response });

    if (response.data.success) {
      setEmail("");
      setPassword("");

      navigate("/question");
    }
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
          onClick={() => handleLogin()}
          disabled={error.length > 0}
        >
          Login <RiLoginCircleLine className={styles.btnIcon} />
        </button>
      </div>
    </div>
  );
};

export { Login };
