import styles from "./Result.module.css";
import { useQuizData, useTheme } from "../../hooks";
import { QuestionType } from "../../components/QuizCard/Quiz.types";
import { useLocation } from "react-router";
import { QuizTaken } from "../../context/authContext";
import { useAuth } from "../../hooks/useAuth";

export type StateType = {
  type: string;
  quizRes: QuizTaken;
};

const Result = () => {
  const { state } = useQuizData();
  const { currentQuizResponse } = useAuth();
  const { theme } = useTheme();

  let reqType: string = "";
  let quiz: QuestionType[] = [];
  let quizResult: QuizTaken = {
    _id: "",
    quizId: "",
    totalScore: 0,
    answerTaken: [
      { _id: "", questionId: "", selectedOptionId: "", isRight: false },
    ],
  };
  let quizName: string = "";

  const location = useLocation();
  if (location.state) {
    const { type, quizRes } = location.state as StateType;
    reqType = type;
    if (quizRes) {
      quizResult = quizRes;
    }
  }

  if (reqType === "COMING_FROM_ANSWER_CARD") {
    quiz = state.quizzes.filter(
      (quiz) => quiz._id === currentQuizResponse.quizId
    )[0].questions;
    quizName = state.quizzes.filter(
      (quiz) => quiz._id === currentQuizResponse.quizId
    )[0].name;
    quizResult = currentQuizResponse;
  } else {
    quiz = state.quizzes.filter((quiz) => quiz._id === quizResult.quizId)[0]
      .questions;
    quizName = state.quizzes.filter((quiz) => quiz._id === quizResult.quizId)[0]
      .name;
  }

  const getCSSStyle = (answerId: string) => {
    if (quizResult.quizId) {
      if (
        quizResult.answerTaken.find(
          (quiz) => quiz.selectedOptionId === answerId
        )
      ) {
        return "WRONG_ANSWER";
      } else {
        return "RIGHT_ANSWER";
      }
    } else {
      return;
    }
  };

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.resultContainerDark} ${styles.resultContainer}`
          : `${styles.resultContainerLight} ${styles.resultContainer}`
      }
    >
      <h1>{quizName}</h1>
      {quizResult.totalScore && <h2>Score : {quizResult.totalScore}</h2>}
      {quiz.map((q) => {
        return (
          <div className={styles.wrapper} key={q._id}>
            <h3>{q.questionText}</h3>
            {q.answers.map((q) => {
              return (
                <div
                  className={
                    theme === "dark"
                      ? `${styles.answerCapsuleDark} ${styles.answerCapsule}`
                      : `${styles.answerCapsuleLight} ${styles.answerCapsule}`
                  }
                  key={q._id}
                >
                  <div
                    className={
                      q.isRight
                        ? `${styles.rightAnswer}`
                        : getCSSStyle(q._id) === "WRONG_ANSWER"
                        ? `${styles.wrongAnswer}`
                        : `${styles.pad13}`
                    }
                    key={q._id}
                  >
                    {q.answerText}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { Result };
