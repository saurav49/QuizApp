import styles from "./Home.module.css";
import { useTheme, useQuizData } from "../../hooks/index";
import { QuizCard } from "../../components/index";
import { QuizType } from "../../components/QuizCard/Quiz.types";
import Loader from "react-loader-spinner";
const Home = () => {
  const { theme } = useTheme();
  const { state } = useQuizData();

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.quizContainer} ${styles.quizContainerDark}`
          : `${styles.quizContainer} ${styles.quizContainerLight}`
      }
    >
      {state.quizzes?.map((quiz: QuizType, index: number) => {
        return (
          <div key={index}>
            {state.quizDataLoader ? (
              <Loader
                type="ThreeDots"
                color="#00BFFF"
                height={200}
                width={200}
              />
            ) : (
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
            )}
          </div>
        );
      })}
    </div>
  );
};

export { Home };
