import React, { useEffect } from "react";
import { createAPIEndPoint, ENDPOINT } from "../api";
import { useTaskContext } from "./TaskContext"; // Import the context

const useFetchTask = () => {
  const { tasks, updateTasks } = useTaskContext(); // Use the context

  useEffect(() => {
    updateTasks(); // Initial fetch
  }, []); // Empty dependency array means it runs only once on component mount

  return tasks;
};

export default useFetchTask;
