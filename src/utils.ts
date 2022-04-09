import { useEffect, Dispatch } from "react";
import axios from "axios";
import { useQuizData } from "./hooks/index";
import { useAuth } from "./hooks/useAuth";
import { ActionType } from "./context/quizContext.types";

const backendURL = `https://quizBackend.saurav49.repl.co`;
const signupURL = `${backendURL}/user/signup`;
const loginURL = `${backendURL}/user/login`;
const saveUserResponseURL = `${backendURL}/user/save-user-response`;
const getUserDataURL = `${backendURL}/user/get-user`;
const deleteQuizAttemptURL = `${backendURL}/user/remove-quiz-response`;

const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};

const validatePassword = (password: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return re.test(password);
};

const validateUsername = (username: string): boolean => {
  const re = /^[a-zA-Z]/;
  return re.test(username);
};

const InitializeData = () => {
  const { dispatch } = useQuizData();

  useEffect(() => {
    (async function () {
      dispatch({
        type: "TOGGLE_QUIZ_DATA_LOADER"
      })
      const  { data } = await axios.get(`${backendURL}/quiz`);
        dispatch({
          type: "INITIALIZE_ALL_QUIZZES",
          payload: { allQuizzes: data.quizzes },
        });
        dispatch({
          type: "TOGGLE_QUIZ_DATA_LOADER"
        })
    })();
  }, [dispatch]);
};

const InitializeUserData = () => {
  const { getUserData } = useAuth();

  useEffect(() => {
    (async function () {
      if (JSON.parse(localStorage.getItem("quiz__app__userId") as string)) {
          getUserData(JSON.parse(localStorage.getItem("quiz__app__userId") as string));
      }
    })();
    // eslint-disable-next-line
  }, []);
};

const deleteQuizResponse = async (
  userID: string,
  quizID: string,
  dispatch: Dispatch<ActionType>
) => {
  try {
    const response = await axios.delete(`${deleteQuizAttemptURL}/${userID}`, {
      data: { id: quizID },
    });
    console.log(response);
    
    dispatch({
      type: "DELETE_USER_RESPONSE",
      payload: { quizId: quizID },
    });

  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export {
  InitializeData,
  validateEmail,
  validatePassword,
  validateUsername,
  backendURL,
  signupURL,
  loginURL,
  saveUserResponseURL,
  getUserDataURL,
  deleteQuizResponse,
  InitializeUserData,
};
