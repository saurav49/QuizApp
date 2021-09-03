import React, { useState, createContext, Dispatch } from "react";

export type initialThemeType = {
  theme: string;
  setTheme: Dispatch<React.SetStateAction<string>>;
};

export type ChildrenType = {
  children: object;
};

export const ThemeContext = createContext<initialThemeType>(
  {} as initialThemeType
);

export const ThemeProvider = ({ children }: ChildrenType) => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
