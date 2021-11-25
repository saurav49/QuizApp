import styles from "./User.module.css";
import { useTheme } from "../../hooks/index";
import { FaUserCircle, MdCancel } from "../../icons/Icons";
import { useNavigate } from "react-router";
import { deleteQuizResponse, InitializeUserData } from "../../utils";
import { useQuizData } from "../../hooks/useQuizData";
import { QuizTaken } from "../../context/authContext";

const UserPage = () => {
  const { state, dispatch } = useQuizData();
  const { theme } = useTheme();
  const navigate = useNavigate();

  InitializeUserData();
  console.log({ state });

  const handleDelete = (quizId: string) => {
    const userId = JSON.parse(localStorage.getItem("userId") as string);
    deleteQuizResponse(userId, quizId, dispatch);

    // REFRESH THE PAGE
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  };

  const handleResultData = (quiz: QuizTaken) => {
    console.log({ quiz });
    navigate("/result", {
      state: {
        type: "COMING_FROM_USER",
        quizRes: quiz,
      },
    });
  };

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.userContainer} ${styles.userContainerDark}`
          : `${styles.userContainer} ${styles.userContainerLight}`
      }
    >
      <div
        className={
          theme === "dark"
            ? `${styles.userInfo} ${styles.userInfoDark}`
            : `${styles.userInfo} ${styles.userInfoLight}`
        }
      >
        <div>
          <FaUserCircle className={styles.userIcon} />
        </div>
        <div className={styles.userDetails}>
          <div>
            <p>Email</p>
            <p>{state.userData.email !== "" && state.userData.email}</p>
          </div>
          <div>
            <p>Username</p>
            <p>{state.userData.username !== "" && state.userData.username}</p>
          </div>
        </div>
      </div>
      <h2>Result</h2>
      <div className={styles.scoreCardContainer}>
        {state.userData.quizTaken.length > 0 &&
          state.userData.quizTaken.map((quiz) => {
            return (
              quiz._id && (
                <div
                  className={
                    theme === "dark"
                      ? `${styles.scoreCardWrapper} ${styles.scoreCardWrapperDark}`
                      : `${styles.scoreCardWrapper} ${styles.scoreCardWrapperLight}`
                  }
                  key={quiz._id}
                >
                  <div onClick={() => handleResultData(quiz)}>
                    <p>Quiz Attempt</p>
                    <p>Score: {quiz.totalScore}</p>
                  </div>
                  <MdCancel
                    className={styles.deleteIcon}
                    onClick={() => handleDelete(quiz._id)}
                  />
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export { UserPage };
