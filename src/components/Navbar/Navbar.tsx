import {
  HiOutlineSun,
  HiOutlineMoon,
  FcIdea,
  RiLogoutBoxRFill,
  FaUserCircle,
} from "../../icons/Icons";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

import { useTheme } from "../../hooks/index";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const { token, handleLogout } = useAuth();

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.navbar} ${styles.navbarDark}`
          : `${styles.navbar} ${styles.navbarLight}`
      }
    >
      <h1 className={styles.brandName} onClick={() => navigate("/")}>
        <FcIdea className={styles.quizIcon} />
        <span>Quiz App</span>
      </h1>
      <div className={styles.btnsWrapper}>
        <button
          className={
            theme === "dark"
              ? `${styles.navbarBtn} ${styles.navbarBtnDark}`
              : `${styles.navbarBtn} ${styles.navbarBtnLight}`
          }
          onClick={() =>
            setTheme((theme: string) => (theme === "dark" ? "light" : "dark"))
          }
        >
          {theme === "dark" ? (
            <span>
              <HiOutlineMoon />
            </span>
          ) : (
            <span>
              <HiOutlineSun />
            </span>
          )}
        </button>
        {token && (
          <div className={styles.logoutBtnWrapper}>
            <button
              className={
                theme === "dark"
                  ? `${styles.navbarLogoutBtn} ${styles.navbarLogoutBtnDark}`
                  : `${styles.navbarLogoutBtn} ${styles.navbarLogoutBtnLight}`
              }
              onClick={() => handleLogout()}
            >
              <RiLogoutBoxRFill />
            </button>
            <span className={styles.logOutbtnTextStyle}>LOGOUT</span>
          </div>
        )}
        <div className={styles.logoutBtnWrapper} style={{ marginLeft: "2em" }}>
          <button
            className={
              theme === "dark"
                ? `${styles.navbarLogoutBtn} ${styles.navbarBtnDark}`
                : `${styles.navbarLogoutBtn} ${styles.navbarBtnLight}`
            }
            onClick={() => navigate("/user")}
          >
            <FaUserCircle />
          </button>
          <span className={styles.logOutbtnTextStyle}>USER</span>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
