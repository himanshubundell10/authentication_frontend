import React, { useContext } from 'react';
import { contex } from '../main';
import axios from 'axios';
import { server } from '../constents/config';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const { user,isAuth,setIsAuth } = useContext(contex);

  const handleLogout = async() => {
   try {
    const {data}= await axios.get(`${server}/logout`,{
      headers:{"Content-Type":"application/json"},
      withCredentials:true
    })
    setIsAuth(false)
    toast.success(data.message)
    
   } catch (error) {
    console.log(error)
    setIsAuth(true)
   }
  
  };

  if(!isAuth) return <Navigate to={"/login"}/>

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50 font-sans">
      <h1 className="text-4xl text-gray-800 mb-5">Welcome {user?.name}</h1>
      <button 
        className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
