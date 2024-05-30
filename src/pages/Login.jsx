import React,{useContext, useState} from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios"
import { server } from "../constents/config";
import toast from "react-hot-toast";
import { contex } from "../main";

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const {isAuth,setIsAuth}=useContext(contex);

    const submitHandler = async (e) => {
      e.preventDefault();
      const toastId = toast.loading("Login...")
      try {
        const { data } = await axios.post(
          `${server}/users/login`,
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        toast.success(data.message,{id:toastId});
        setIsAuth(true)
      } catch (error) {
        toast.error(error.response.data.message,{id:toastId});
        setIsAuth(false)
      }
    };

    if(isAuth) return <Navigate to={"/"}/>


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between flex-col gap-1">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            <div className="font-bold">or</div>
            <Link
            to={"/register"}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
