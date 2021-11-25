import styles from "./QuestionCard.module.css";
import { QuestionType } from "../QuizCard/Quiz.types";
import { AnswerCard } from "../index";
import { useTheme } from "../../hooks/index";

const QuestionCard = ({
  _id,
  quizId,
  img,
  questionText,
  answers,
}: QuestionType) => {
  const { theme } = useTheme();

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.questionCard} ${styles.questionCardDark}`
          : `${styles.questionCard} ${styles.questionCardLight}`
      }
    >
      <img src={img} alt="quiz-question" className={styles.questionCardImage} />
      <p> {questionText} </p>
      {answers.map((answer) => {
        return (
          <AnswerCard
            key={answer._id}
            quizId={quizId}
            questionId={_id}
            _id={answer._id}
            answerText={answer.answerText}
            isRight={answer.isRight}
          />
        );
      })}
    </div>
  );
};

export { QuestionCard };
