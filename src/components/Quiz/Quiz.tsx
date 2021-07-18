import React from "react";
import styles from "./Quiz.module.css";

import { useTheme } from "../../hooks/index";

const Quiz = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h1>Quiz Container</h1>
    </div>
  );
};

export { Quiz };
