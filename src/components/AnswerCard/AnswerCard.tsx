import styles from "./AnswerCard.module.css";
import { useTheme, useQuizData } from "../../hooks/index";
import { useState } from "react";

export type SelectedOption = {
  _id: string;
  answerText: string;
  isRight?: boolean;
};

export type AnswerCardType = {
  _id: string;
  answerText: string;
  isRight: boolean;
  questionId: string;
};

const AnswerCard = ({
  questionId,
  _id,
  answerText,
  isRight,
}: AnswerCardType) => {
  const { theme } = useTheme();
  const { setStartingQuestion, isClicked, setIsClicked } = useQuizData();
  const [selectedOption, setSelectedOption] = useState<SelectedOption>({
    _id: "",
    answerText: "",
  });

  let answerTheme: object = {};

  const handleAnswer = () => {
    setIsClicked(true);

    setSelectedOption({ _id, answerText, isRight });

    // Take me to the next question
    setTimeout(() => {
      setStartingQuestion((value) => (value < 4 ? value + 1 : value));
      setIsClicked(false);
    }, 2000);
  };

  if (selectedOption._id !== "" && isRight) {
    isRight === selectedOption.isRight
      ? (answerTheme = { backgroundColor: "#34d399" })
      : (answerTheme = { backgroundColor: "#f87171" });
  } else if (!isRight && selectedOption._id !== "") {
    !isRight === !selectedOption.isRight
      ? (answerTheme = { backgroundColor: "#f87171" })
      : (answerTheme = {});
  } else if (isRight && isClicked && isRight !== selectedOption.isRight) {
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
