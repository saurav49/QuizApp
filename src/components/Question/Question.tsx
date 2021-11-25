import { QuestionCard } from "../index";
import { useQuizData, useTheme } from "../../hooks/index";
import { QuizType } from "../QuizCard/Quiz.types";
import styles from "./Question.module.css";

const Question = () => {
  const { state } = useQuizData();
  const { theme } = useTheme();

  const chosenQuiz = state.quizzes.find(
    (quiz: QuizType) => quiz._id === state.chosenQuizId
  );

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.questionComponent} ${styles.questionComponentDark}`
          : `${styles.questionComponent} ${styles.questionComponentLight}`
      }
    >
      <div
        className={
          theme === "dark"
            ? `${styles.questionnoandpointsComponent} ${styles.questionnoandpointsComponentDark}`
            : `${styles.questionnoandpointsComponent} ${styles.questionnoandpointsComponentLight}`
        }
      >
        <p>
          <span> Question : </span>
          {state.startingQuestion + 1} / {chosenQuiz!.questions.length}
        </p>
        <p>
          <span> Points : </span> {state.currentUserPoint}
        </p>
      </div>
      <QuestionCard
        key={chosenQuiz!.questions[state.startingQuestion]._id}
        _id={chosenQuiz!.questions[state.startingQuestion]._id}
        quizId={state.chosenQuizId}
        img={chosenQuiz!.questions[state.startingQuestion].img}
        questionText={
          chosenQuiz!.questions[state.startingQuestion].questionText
        }
        answers={chosenQuiz!.questions[state.startingQuestion].answers}
        point={chosenQuiz!.questions[state.startingQuestion].point}
        time={chosenQuiz!.questions[state.startingQuestion].time}
      />
    </div>
  );
};

export { Question };
