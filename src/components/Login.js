// Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import SubmitButton from "./SubmitButton";
import { useEffect } from "react";
import { createAPIEndPoint } from "../api";
import HeroCard from "./HeroCard";



// const heroImg = null;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createAPIEndPoint().login({
        username: username,
        password: password,
      });
      const token = response.data.token;
      const user = response.data.user;


      if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token");
      }
      if (localStorage.getItem("user") != null) {
        localStorage.removeItem("user");
      }
      localStorage.setItem("user", user);
      localStorage.setItem("token", token);

      if (response.status === 200) {
        await localStorage.setItem("username", username);
        await localStorage.setItem("user", JSON.stringify(user));
      }

      if (user.userName == "Admin" || user.userName == "admin") {
        navigate("/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="min-h-screen font-mono flex items-center justify-evenly"
      id="background"
    >
      {/* login form */}
      <div className="max-w-md w-full m-4 p-6 dark:bg-grey-700 bg-white rounded-lg border border-r-4 border-b-4 dark:border-gray-900 border-gray-700 shadow-md">
        <div className="bg-gray-300 dark:bg-gray-500 p-0.5 rounded-lg border border-r-4 border-b-4 dark:border-gray-800 border-gray-700 mb-6 flex justify-center items-center">
          <div className="border-2 border-white dark:border-gray-300 p-3 flex-1 border-r-0 border-b-0 rounded-md">
            <h2 className="text-3xl font-semibold text-center dark:text-gray-200 text-gray-800">
              Login
            </h2>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full p-3 border border-gray-600 dark:border-gray-700 dark:bg-gray-400 dark:placeholder:text-gray-700 dark:text-gray-700 rounded-md focus:outline-none focus:border-2"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full p-3 border border-gray-600 rounded-md dark:border-gray-400 dark:placeholder:text-gray-700 dark:text-gray-700 dark:bg-gray-400 focus:outline-none focus:border-2"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>


          <div className="flex justify-between items-center mb-6">
            <SubmitButton name="Login" />
            <div className="text-blue-500 hover:underline">
              Forgot Password?
            </div>
          </div>
        </form> 
        <div className="flex justify-center items-center">
          Don't have account?{" "}
          <div
            onClick={() => {
              navigate("/signup");
            }}
            className="ml-2 text-blue-500 hover:underline"
          >
            Sign up
          </div>
        </div>
      </div>

      {/* hero text */}

      <HeroCard
      title = {"Welcome to, Tasky"}
      subtitle = {"Manage your tasks easily"}
      buttons={false}
      />
    </div>
  );
};

export default Login;
