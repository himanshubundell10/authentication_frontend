import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { server } from "./constents/config";
import { contex } from "./main";

const App = () => {
  const { setUser, setIsAuth } = useContext(contex);
  useEffect(() => {
    axios
      .get(`${server}/users/me`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuth(true);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
        setIsAuth(false);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster position="bottom-center" />
    </Router>
  );
};

export default App;
