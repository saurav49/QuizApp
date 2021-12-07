import styles from "./AnswerCard.module.css";
import { useTheme, useQuizData } from "../../hooks/index";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export type SelectedOption = {
  questionId: string;
  selectedOptionId: string;
  isRight?: boolean;
};

export type AnswerCardType = {
  _id: string;
  questionId: string;
  answerText: string;
  isRight: boolean;
  quizId: string;
};

const AnswerCard = ({
  _id,
  questionId,
  quizId,
  answerText,
  isRight,
}: AnswerCardType) => {
  const { theme } = useTheme();
  const { state, dispatch } = useQuizData();

  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    questionId: "",
    selectedOptionId: "",
  });
  const {
    setUserResponse,
    sendUserResponse,
    // toggleRedirect,
    // setToggleRedirect,
  } = useAuth();
  const [triggerUserResponse, setTriggerResponse] = useState<boolean>(false);

  let answerTheme: object = {};

  useEffect(() => {
    if (triggerUserResponse) {
      sendUserResponse(quizId);
      setTriggerResponse(false);
    }
  }, [triggerUserResponse, quizId, sendUserResponse]);

  const handleAnswer = () => {
    dispatch({ type: "TOGGLE_IS_CLICKED_TRUE" });

    isRight
      ? dispatch({ type: "INCREMENT_SCORE", payload: { score: 5 } })
      : dispatch({ type: "DECREMENT_SCORE", payload: { score: 0 } });

    setSelectedOption({
      questionId: questionId,
      selectedOptionId: _id,
      isRight,
    });

    setUserResponse((userResponse) => [
      ...userResponse,
      {
        questionId: questionId,
        selectedOptionId: _id,
        isRight,
      },
    ]);

    // Take me to the next question
    state.startingQuestion < 4 &&
      setTimeout(() => {
        console.log("ANSWER_CARD", state.startingQuestion);
        dispatch({
          type: "INCREMENT_STARTING_QUESTION_INDEX",
          payload: { incrementNo: 1 },
        });

        dispatch({ type: "TOGGLE_IS_CLICKED_FALSE" });
      }, 1500);

    setTimeout(() => {
      if (state.isEnd) {
        dispatch({ type: "RESET_STARTING_QUESTION_INDEX" });
        dispatch({ type: "TOGGLE_IS_END_FALSE" });
      }
    }, 1700);

    if (state.startingQuestion === 4) {
      setTriggerResponse(true);
    }
  };

  if (selectedOption.selectedOptionId !== "" && isRight) {
    isRight === selectedOption.isRight
      ? (answerTheme = { backgroundColor: "#34d399" })
      : (answerTheme = { backgroundColor: "#f87171" });
  } else if (!isRight && selectedOption.selectedOptionId !== "") {
    !isRight === !selectedOption.isRight
      ? (answerTheme = { backgroundColor: "#f87171" })
      : (answerTheme = {});
  } else if (isRight && state.isClicked && isRight !== selectedOption.isRight) {
    answerTheme = { backgroundColor: "#34d399" };
  }

  return (
    <div
      className={
        theme === "dark"
          ? `${styles.answerCard} ${styles.answerCardDark}`
          : `${styles.answerCard} ${styles.answerCardLight}`
      }
      style={answerTheme}
    >
      <p onClick={() => handleAnswer()}> {answerText} </p>
    </div>
  );
};

export { AnswerCard };
