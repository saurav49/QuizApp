import styles from "./QuizCard.module.css";
import { useTheme, useQuizData } from "../../hooks/index";
import { QuizType } from "./Quiz.types";
import { useNavigate } from "react-router";

const QuizCard = ({
  _id,
  img,
  name,
  totalPoints,
  totalQuestions,
  questions,
  totalTime,
}: QuizType) => {
  const { theme } = useTheme();
  const { dispatch } = useQuizData();
  const navigate = useNavigate();

  const takeToQuestion = (id: string) => {
    dispatch({ type: "ADD_QUIZ_ID", payload: { quizId: id } });
    navigate("/question");
  };

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.quiz} ${styles.quizDark}`
          : `${styles.quiz} ${styles.quizLight}`
      }
      onClick={() => takeToQuestion(_id)}
    >
      <img src={img} alt="quizImage" className={styles.quizImg} />
      <h2
        className={
          theme === "dark"
            ? `${styles.quizName} ${styles.quizNameDark}`
            : `${styles.quizName} ${styles.quizNameLight}`
        }
      >
        {name}
      </h2>
      <p
        className={
          theme === "dark"
            ? `${styles.quizDesc} ${styles.quizDescDark}`
            : `${styles.quizDesc} ${styles.quizDescLight}`
        }
      >
        The Office is considered to be one of the funniest workplace sitcoms
        ever made. <br />
        <span style={{ fontStyle: "italic" }}>
          So if you are a big fan of the show, here are 5 Questions to test
          yourself!
        </span>
      </p>
    </div>
  );
};

export { QuizCard };
