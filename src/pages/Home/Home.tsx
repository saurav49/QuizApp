import styles from "./Home.module.css";
import { useTheme, useQuizData } from "../../hooks/index";
import { QuizCard } from "../../components/index";
import { QuizType } from "../../components/QuizCard/Quiz.types";

const Home = () => {
  const { theme } = useTheme();
  const { state } = useQuizData();

  return (
    <>
      {state.quizzes?.map((quiz: QuizType, index: number) => {
        return (
          <div
            className={
              theme === "dark"
                ? `${styles.quizContainer} ${styles.quizContainerDark}`
                : `${styles.quizContainer} ${styles.quizContainerLight}`
            }
            key={index}
          >
            <QuizCard
              key={quiz._id}
              _id={quiz._id}
              name={quiz.name}
              img={quiz.img}
              totalQuestions={quiz.totalQuestions}
              totalPoints={quiz.totalPoints}
              totalTime={quiz.totalTime}
              questions={quiz.questions}
            />
          </div>
        );
      })}
    </>
  );
};

export { Home };
