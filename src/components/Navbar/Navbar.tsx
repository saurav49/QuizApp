import { FcIdea } from "react-icons/fc";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

import { useTheme } from "../../hooks/index";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.navbar} ${styles.navbarDark}`
          : `${styles.navbar} ${styles.navbarLight}`
      }
    >
      <h1 onClick={() => navigate("/")}>
        <FcIdea className={styles.quizIcon} />
        <span>Quiz App</span>
      </h1>
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
    </div>
  );
};

export { Navbar };
