import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createContext } from "react";

export const contex = createContext();

const AppWraper = () => {
  const[isAuth,setIsAuth]=useState(false);
  const[isLoading,setIsLoading]=useState(false);
  const[user,setUser]=useState({});
  
  return (
    <contex.Provider value={{isAuth,setIsAuth,isLoading,setIsLoading,user,setUser}}>
      <App />
    </contex.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWraper />
  </React.StrictMode>
);
