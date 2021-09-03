import { useEffect } from "react";
import axios from "axios";
import { useQuizData } from "./hooks/index";

export const backendURL = `https://quizBackend.saurav49.repl.co`;
export const signupURL = `https://quizBackend.saurav49.repl.co/user/signup`;
export const loginURL = `https://quizBackend.saurav49.repl.co/user/login`;

export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
  return re.test(password);
};

const InitializeData = () => {
  const { setQuizzes } = useQuizData();

  useEffect(() => {
    (async function () {
      const { data } = await axios.get(`${backendURL}/quiz`);
      setQuizzes(data.quizzes);
    })();
  }, [setQuizzes]);
};

export { InitializeData };
