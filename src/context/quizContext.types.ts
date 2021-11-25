import { QuizType } from "../components/QuizCard/Quiz.types";
import { UserResponseData, QuizTaken } from "./authContext";

export type QuizInitalStateType = {
  quizzes: QuizType[];
  startingQuestion: number;
  chosenQuizId: string;
  isClicked: boolean;
  currentUserPoint: number;
  isEnd: boolean;
  userData: UserResponseData;
};

export type ActionType =
  | { type: "INITIALIZE_ALL_QUIZZES"; payload: { allQuizzes: QuizType[] } }
  | {
      type: "INITIALIZE_USER_DATA";
      payload: {
        userData: {
          _id: string;
          email: string;
          username: string;
          quizTaken: QuizTaken[];
        };
      };
    }
  | {
      type: "FLUSH_DATA";
    }
  | {
      type: "INCREMENT_SCORE";
      payload: {
        score: number;
      };
    }
  | {
      type: "DECREMENT_SCORE";
      payload: {
        score: number;
      };
    }
  | {
      type: "RESET_USER_SCORE_POINT";
    }
  | {
      type: "ADD_QUIZ_ID";
      payload: {
        quizId: string;
      };
    }
  | {
      type: "TOGGLE_IS_CLICKED_FALSE";
    }
  | {
      type: "TOGGLE_IS_CLICKED_TRUE";
    }
  | {
      type: "TOGGLE_IS_CLICKED";
    }
  | {
      type: "RESET_STARTING_QUESTION_INDEX";
    }
  | {
      type: "INCREMENT_STARTING_QUESTION_INDEX";
      payload: {
        incrementNo: number;
      };
    }
  | {
      type: "TOGGLE_IS_END_FALSE";
    }
  | {
      type: "TOGGLE_IS_END_TRUE";
    }
  | {
      type: "SAVE_USER_RESPONSE";
      payload: {
        quizTaken: QuizTaken;
      };
    }
  | {
      type: "DELETE_USER_RESPONSE";
      payload: {
        quizId: string;
      };
    };
