import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import SubmitButton from "./SubmitButton";
import { createAPIEndPoint, ENDPOINT } from "../api";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await createAPIEndPoint(ENDPOINT.register).register({
        username,
        email,
        password,
      });
      const token = response.data.token;
      if (localStorage.getItem("token") != null) {
        localStorage.removeItem("token");
      }
      if (response.status == 200) {
        if (localStorage.getItem("username") != null) {
          localStorage.removeItem("username");
        }
        localStorage.setItem("username", username);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen font-mono flex items-center justify-center"
      id="background"
    >
      
      <div className="max-w-md w-full m-4 p-6 bg-white dark:bg-gray-700 rounded-lg border border-r-4 border-b-4 border-gray-700 dark:border-gray-900 shadow-md">
        <div className="bg-gray-300 dark:bg-gray-500 p-0.5 rounded-lg border border-r-4 border-b-4 border-gray-700 dark:border-gray-800 mb-6 flex justify-center items-center">
          <div className="border-2 border-white dark:border-gray-300 p-3 flex-1 border-r-0 border-b-0 rounded-md">
            <h2 className="text-3xl font-semibold dark:font-medium text-center dark:text-gray-200 text-gray-800">
              Create New Account
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
              className="w-full p-3 border border-gray-600 dark:border-gray-700 dark:bg-gray-400 dark:placeholder:text-gray-700 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-gray-300"
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              className="w-full p-3 border border-gray-600 dark:border-gray-700 dark:bg-gray-400 dark:placeholder:text-gray-700 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-gray-300"
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
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
              className="w-full p-3 border border-gray-600 dark:border-gray-700 dark:bg-gray-400 dark:placeholder:text-gray-700 dark:text-gray-700 rounded-md focus:outline-none focus:border-blue-500 dark:focus:border-gray-300"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <SubmitButton name="Sign Up" />
            <div className="text-blue-500 hover:underline">
              Forgot Password?
            </div>
          </div>
        </form>
        <div className="flex justify-center items-center">
          Already have account?{" "}
          <div
            onClick={() => {
              navigate("/login");
            }}
            className="ml-2 text-blue-500 hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
