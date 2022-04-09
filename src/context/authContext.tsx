import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios, { AxiosError } from "axios";
import { signupURL, loginURL } from "../utils";
import { useNavigate } from "react-router-dom";
import { SelectedOption } from "../components/AnswerCard/AnswerCard";
import { saveUserResponseURL, getUserDataURL } from "../utils";
import { useQuizData } from "../hooks/index";

export type AnswerTaken = {
  _id: string;
  questionId: string;
  selectedOptionId: string;
  isRight: boolean;
};

export type QuizTaken = {
  _id: string;
  quizId: string;
  totalScore: number;
  answerTaken: AnswerTaken[];
};

export type User = {
  _id: string;
  username: string;
  email: string;
  password: string;
  quizTaken: QuizTaken[];
};

export type UserResponseData = {
  _id: string;
  username: string;
  email: string;
  quizTaken: QuizTaken[];
};

export type UserResponse = {
  success: boolean;
  token: string;
  userData: User;
  errorMessage?: string;
};

export type ServerError = {
  success: boolean;
  errorMessage: string;
};

export type AuthContextType = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  currentUserId: string | null;
  setCurrentUserId: Dispatch<SetStateAction<string | null>>;
  userResponse: SelectedOption[];
  setUserResponse: Dispatch<SetStateAction<SelectedOption[]>>;
  showLoader: boolean;
  setShowLoader: Dispatch<SetStateAction<boolean>>;
  handleSignUp: (
    username: string,
    email: string,
    password: string,
    setUsername: Dispatch<SetStateAction<string>>,
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>,
    setConfirmPassword: Dispatch<SetStateAction<string>>
  ) => Promise<UserResponse | ServerError | void>;
  handleLogin: (
    email: string,
    password: string,
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>
  ) => Promise<UserResponse | ServerError>;
  handleLogout: () => void;
  getUserData: (
    currentUserId: string | null
  ) => Promise<undefined | ServerError>;
  sendUserResponse: (
    quizId: string
  ) => Promise<SaveUserResponseType | ServerError | void>;
  currentQuizResponse: QuizTaken;
  // toggleRedirect: boolean;
  // setToggleRedirect: Dispatch<SetStateAction<boolean>>;
};

export type userDataResponse = {
  success: boolean;
  _id: string;
  username: string;
  email: string;
  quizTaken: QuizTaken[];
};

export type SaveUserResponseType = {
  id: string;
};

export type AuthProviderProp = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: AuthProviderProp) => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [userResponse, setUserResponse] = useState<SelectedOption[]>([]);
  const [currentQuizResponse, setCurrentQuizResponse] = useState<QuizTaken>({
    _id: "",
    quizId: "",
    totalScore: 0,
    answerTaken: [],
  });
  // const [toggleRedirect, setToggleRedirect] = useState<boolean>(false);
  // const [userData, setUserData] = useState<UserResponseData>({
  //   email: "",
  //   username: "",
  //   quizTaken: [],
  // });

  const { state, dispatch } = useQuizData();

  const navigate = useNavigate();
  let savedToken, savedCurrentUserId;

  localStorage.getItem("quiz__app__token")
    ? (savedToken = JSON.parse(localStorage.getItem("quiz__app__token") as string))
    : (savedToken = null);

  localStorage.getItem("quiz__app__userId")
    ? (savedCurrentUserId = JSON.parse(
        localStorage.getItem("quiz__app__userId") as string
      ))
    : (savedCurrentUserId = null);

  const [token, setToken] = useState<string | null>(savedToken);
  const [currentUserId, setCurrentUserId] = useState<string | null>(
    savedCurrentUserId
  );

  // GET USER DATA
  const getUserData = async (
    currentUserId: string | null
  ): Promise<undefined | ServerError> => {
    try {
      const response = await axios.get<userDataResponse>(
        `${getUserDataURL}/${currentUserId}`
      );

      const responseData = {
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email,
        quizTaken: response.data.quizTaken,
      };

      dispatch({
        type: "INITIALIZE_USER_DATA",
        payload: { userData: responseData },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;

        if (serverError && serverError.response?.data) {
          return serverError.response.data;
        }
      }

      return {
        success: false,
        errorMessage: "Something went wrong in the getUserData",
      };
    }
  };

  // SAVE USER RESPONSE
  const sendUserResponse = async (
    quizId: string
  ): Promise<SaveUserResponseType | ServerError | void> => {
    try {
      dispatch({ type: "TOGGLE_IS_END_TRUE" });

      const response = await axios.post(
        `${saveUserResponseURL}/${currentUserId}`,
        {
          quiz: {
            quizId: quizId,
            totalScore: state.currentUserPoint,
            answerTaken: userResponse,
          },
        }
      );


      if (response.data.success) {
        setUserResponse([]);
        dispatch({ type: "RESET_STARTING_QUESTION_INDEX" });
        dispatch({ type: "RESET_USER_SCORE_POINT" });
        dispatch({
          type: "SAVE_USER_RESPONSE",
          payload: { quizTaken: response.data.saveUser.quizTaken.at(-1) },
        });
        localStorage.setItem(
          "currentQuizResponse",
          JSON.stringify(response.data.saveUser.quizTaken.at(-1))
        );
        setCurrentQuizResponse(response.data.saveUser.quizTaken.at(-1));
        navigate("/result", {
          state: {
            type: "COMING_FROM_ANSWER_CARD",
          },
        });
        // setToggleRedirect(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;

        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }
    }
  };

  // HANDLE SIGNUP
  const handleSignUp = async (
    username: string,
    email: string,
    password: string,
    setUsername: Dispatch<SetStateAction<string>>,
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>,
    setConfirmPassword: Dispatch<SetStateAction<string>>
  ): Promise<UserResponse | ServerError | void> => {
    try {
      setShowLoader(true);
      const response = await axios.post<UserResponse>(`${signupURL}`, {
        user: { username, email, password },
      });

      console.log({ response });

      if (response.data.success) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setShowLoader(false);

        localStorage.setItem("quiz__app__token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "quiz__app__userId",
          JSON.stringify(response.data.userData._id)
        );

        setToken(response.data.token);
        setCurrentUserId(response.data.userData._id);
        dispatch({
          type: "INITIALIZE_USER_DATA",
          payload: {
            userData: {
              _id: response.data.userData._id,
              email: response.data.userData.email,
              username: response.data.userData.username,
              quizTaken: response.data.userData.quizTaken,
            },
          },
        });
        navigate("/");
      } else {
        setShowLoader(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;

        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }

      return {
        success: false,
        errorMessage: "Something went wrong in handleSignUp",
      };
    }
  };

  // HANDLE LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("quiz__app__token");
    localStorage.removeItem("quiz__app__userId");
    setToken("");
    setCurrentUserId("");
    dispatch({
      type: "FLUSH_DATA",
    });
    navigate("/login");
  };

  // HANDLE LOGIN
  const handleLogin = async (
    email: string,
    password: string,
    setEmail: Dispatch<SetStateAction<string>>,
    setPassword: Dispatch<SetStateAction<string>>
  ): Promise<UserResponse | ServerError> => {
    try {
      setShowLoader(true);
      const response = await axios.post(loginURL, { email, password });
      if (response.data.success) {
        setEmail("");
        setPassword("");
        setShowLoader(false);

        localStorage.setItem("quiz__app__token", JSON.stringify(response.data.token));
        localStorage.setItem(
          "quiz__app__userId",
          JSON.stringify(response.data.userData._id)
        );

        setToken(response.data.token);
        setCurrentUserId(response.data.userData._id);
        dispatch({
          type: "INITIALIZE_USER_DATA",
          payload: {
            userData: {
              _id: response.data.userData._id,
              email: response.data.userData.email,
              username: response.data.userData.username,
              quizTaken: response.data.userData.quizTaken,
            },
          },
        });
      } else {
        setShowLoader(false);
      }

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ServerError>;

        if (serverError && serverError.response) {
          return serverError.response.data;
        }
      }

      return {
        success: false,
        errorMessage: "Something went wrong in handleLogin",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        currentUserId,
        setCurrentUserId,
        userResponse,
        setUserResponse,
        showLoader,
        setShowLoader,
        handleSignUp,
        handleLogin,
        handleLogout,
        sendUserResponse,
        getUserData,
        currentQuizResponse,
        // toggleRedirect,
        // setToggleRedirect,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
