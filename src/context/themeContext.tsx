import React, { useState, createContext } from "react";

export type initialThemeType = {
  theme: string;
  setTheme: any;
};

export type ChildrenType = {
  children: object;
};

export const ThemeContext = createContext<initialThemeType>({
  theme: "dark",
  setTheme: () => "dark",
});

export const ThemeProvider = ({ children }: ChildrenType) => {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
