import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { signupURL, validateEmail, validatePassword } from "../utils";

export type AnswerTaken = {
  questionId: string;
  selectedOptionId: string;
  isRight: boolean;
};

export type QuizTaken = {
  quizId: string;
  total: number;
  answerTaken: AnswerTaken[];
};

export type User = {
  username: string;
  email: string;
  password: string;
  quizTaken: QuizTaken[];
};

export type AuthContextType = {
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: Dispatch<SetStateAction<string>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  showConfirmPassword: boolean;
  setShowConfirmPassword: Dispatch<SetStateAction<boolean>>;
  handleSignUp: () => any;
};

export type AuthProviderProp = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: AuthProviderProp) => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handleSignUp = async () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      return setError("Any of the input fields cannot be empty");
    }

    if (password !== confirmPassword) {
      return setError("Password and confirm password should be equal");
    }

    // email validation
    if (!validateEmail(email)) {
      return setError("Please enter valid email id");
    }

    // password validation
    if (!validatePassword(password)) {
      return setError(
        "password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
      );
    }

    const response = await axios.post(`${signupURL}`, {
      user: { username, email, password },
    });

    console.log({ response });

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        setUsername,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        error,
        setError,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        handleSignUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
