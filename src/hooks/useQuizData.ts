import { useContext } from "react";
import { QuizContext, QuizContextType } from "../context/quizContext";

export const useQuizData = (): QuizContextType => {
  return useContext(QuizContext);
};
