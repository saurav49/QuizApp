import { QuestionCard } from "../index";
import { useQuizData, useTheme } from "../../hooks/index";
import styles from "./Question.module.css";

const Question = () => {
  const { startingQuestion, quizzes, chosenQuizId } = useQuizData();
  const { theme } = useTheme();

  const chosenQuiz = quizzes.find((quiz) => quiz._id === chosenQuizId);

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
          {startingQuestion + 1} / {chosenQuiz!.questions.length}
        </p>
        <p>
          <span> Points : </span> {chosenQuiz!.totalPoints}
        </p>
      </div>
      <QuestionCard
        key={chosenQuiz!.questions[startingQuestion]._id}
        _id={chosenQuiz!.questions[startingQuestion]._id}
        img={chosenQuiz!.questions[startingQuestion].img}
        questionText={chosenQuiz!.questions[startingQuestion].questionText}
        answers={chosenQuiz!.questions[startingQuestion].answers}
        point={chosenQuiz!.questions[startingQuestion].point}
        time={chosenQuiz!.questions[startingQuestion].time}
      />
    </div>
  );
};

export { Question };
