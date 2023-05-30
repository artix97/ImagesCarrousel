import React, { createContext, useState } from "react";
import { createClient } from "pexels";

const ResultStateContext = createContext("");

export function GlobalState({ children }) {
  const client = createClient(
    "uUrJ5iH8HbMba67239vttclwbRzYx9bXQDeq4d58M2ASXiqE49KLeOBk"
  );
  const [isLoading, setIsLoading] = useState(false)
  const [color,setColor] = useState("unset")
  const [resultData, setResultData] = useState();
  const [resultVisible, setResultVisible] = useState(false)
  return (
    <ResultStateContext.Provider value={{ resultData, setResultData,color,setColor, resultVisible, setResultVisible, isLoading, setIsLoading, client }}>
      {children}
    </ResultStateContext.Provider>
  );
}

export default ResultStateContext;
