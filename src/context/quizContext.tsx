import React, { useState, createContext, Dispatch, ReactNode } from "react";
import { QuizType } from "../components/QuizCard/Quiz.types";

export type QuizProviderType = {
  children: ReactNode;
};

export type QuizContextType = {
  quizzes: QuizType[];
  setQuizzes: Dispatch<React.SetStateAction<QuizType[]>>;
  startingQuestion: number;
  setStartingQuestion: Dispatch<React.SetStateAction<number>>;
  chosenQuizId: string;
  setChosenQuizId: Dispatch<React.SetStateAction<string>>;
  isClicked: boolean;
  setIsClicked: Dispatch<React.SetStateAction<boolean>>;
};

export const QuizContext = createContext<QuizContextType>(
  {} as QuizContextType
);

export const QuizProvider = ({ children }: QuizProviderType) => {
  const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  const [startingQuestion, setStartingQuestion] = useState(0);
  const [chosenQuizId, setChosenQuizId] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        setQuizzes,
        startingQuestion,
        setStartingQuestion,
        chosenQuizId,
        setChosenQuizId,
        isClicked,
        setIsClicked,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
