import { createContext, Dispatch, ReactNode, useReducer } from "react";
// import { QuizType } from "../components/QuizCard/Quiz.types";
import { ActionType, QuizInitalStateType } from "./quizContext.types";
import { Reducer } from "../reducers/quiz.reducers";

export type QuizProviderType = {
  children: ReactNode;
};

export type QuizContextType = {
  // quizzes: QuizType[];
  // setQuizzes: Dispatch<React.SetStateAction<QuizType[]>>;
  // startingQuestion: number;
  // setStartingQuestion: Dispatch<React.SetStateAction<number>>;
  // chosenQuizId: string;
  // setChosenQuizId: Dispatch<React.SetStateAction<string>>;
  // isClicked: boolean;
  // setIsClicked: Dispatch<React.SetStateAction<boolean>>;
  // currentUserPoint: number;
  // setCurrentUserPoint: Dispatch<React.SetStateAction<number>>;
  // isEnd: boolean;
  // setIsEnd: Dispatch<React.SetStateAction<boolean>>;
  state: QuizInitalStateType;
  dispatch: Dispatch<ActionType>;
};

export const QuizContext = createContext<QuizContextType>(
  {} as QuizContextType
);

export const QuizProvider = ({ children }: QuizProviderType) => {
  // const [quizzes, setQuizzes] = useState<QuizType[]>([]);
  // const [startingQuestion, setStartingQuestion] = useState<number>(0);
  // const [chosenQuizId, setChosenQuizId] = useState<string>("");
  // const [isClicked, setIsClicked] = useState<boolean>(false);
  // const [currentUserPoint, setCurrentUserPoint] = useState<number>(0);
  // const [isEnd, setIsEnd] = useState<boolean>(false);

  const quizInitialState: QuizInitalStateType = {
    quizzes: [],
    quizDataLoader: false,
    startingQuestion: 0,
    chosenQuizId: "",
    isClicked: false,
    currentUserPoint: 0,
    isEnd: false,
    userData: {
      _id: "",
      email: "",
      username: "",
      quizTaken: [
        {
          _id: "",
          quizId: "",
          totalScore: 0,
          answerTaken: [],
        },
      ],
    },
  };

  const [state, dispatch] = useReducer(Reducer, quizInitialState);

  return (
    <QuizContext.Provider
      value={{
        // quizzes,
        // setQuizzes,
        // startingQuestion,
        // setStartingQuestion,
        // chosenQuizId,
        // setChosenQuizId,
        // isClicked,
        // setIsClicked,
        // currentUserPoint,
        // setCurrentUserPoint,
        // isEnd,
        // setIsEnd,
        state,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
