import { QuizInitalStateType } from "../context/quizContext.types";
import { ActionType } from "../context/quizContext.types";

export const Reducer = (
  state: QuizInitalStateType,
  action: ActionType
): QuizInitalStateType => {
  switch (action.type) {
    case "INITIALIZE_ALL_QUIZZES":
      return {
        ...state,
        quizzes: action.payload.allQuizzes,
      };

    case "INITIALIZE_USER_DATA":
      return {
        ...state,
        userData: action.payload.userData,
      };

    case "FLUSH_DATA":
      return {
        ...state,
        userData: {
          _id: "",
          username: "",
          email: "",
          quizTaken: [],
        },
      };

    case "ADD_QUIZ_ID":
      return {
        ...state,
        chosenQuizId: action.payload.quizId,
      };

    case "INCREMENT_SCORE":
      return {
        ...state,
        currentUserPoint: state.currentUserPoint + action.payload.score,
      };

    case "DECREMENT_SCORE":
      return {
        ...state,
        currentUserPoint: state.currentUserPoint - action.payload.score,
      };
      case "TOGGLE_QUIZ_DATA_LOADER":
      return {
        ...state,
        quizDataLoader: !state.quizDataLoader
      }
    case "TOGGLE_IS_CLICKED_FALSE":
      return {
        ...state,
        isClicked: false,
      };

    case "TOGGLE_IS_CLICKED_TRUE":
      return {
        ...state,
        isClicked: true,
      };

    case "TOGGLE_IS_CLICKED":
      return {
        ...state,
        isClicked: !state.isClicked,
      };

    case "INCREMENT_STARTING_QUESTION_INDEX":
      return {
        ...state,
        startingQuestion: state.startingQuestion + action.payload.incrementNo,
      };

    case "RESET_STARTING_QUESTION_INDEX":
      return {
        ...state,
        startingQuestion: 0,
      };

    case "RESET_USER_SCORE_POINT":
      return {
        ...state,
        currentUserPoint: 0,
      };

    case "TOGGLE_IS_END_FALSE":
      return {
        ...state,
        isEnd: false,
      };

    case "TOGGLE_IS_END_TRUE":
      return {
        ...state,
        isEnd: true,
      };

    case "SAVE_USER_RESPONSE":
      return {
        ...state,
        userData: {
          ...state.userData,
          quizTaken: [...state.userData.quizTaken, action.payload.quizTaken],
        },
      };

    case "DELETE_USER_RESPONSE":
      return {
        ...state,
        userData: {
          ...state.userData,
          quizTaken: state.userData.quizTaken.filter(
            (q) => q._id !== action.payload.quizId
          ),
        },
      };

    default:
      console.log("Something went Wrong");
      return state;
  }
};
