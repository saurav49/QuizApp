import { useContext } from "react";
import { QuizContext } from "../context/index";
import { QuizContextType } from "../context/quizContext";

export const useQuizData = (): QuizContextType => {
  return useContext(QuizContext);
};
