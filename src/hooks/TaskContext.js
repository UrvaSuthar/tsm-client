import React, { createContext, useContext, useState, useEffect } from "react";
import { createAPIEndPoint, ENDPOINT } from "../api";
import { useAuth0 } from "@auth0/auth0-react";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]); // New state for users
  const [isAdmin, setIsAdmin] = useState(false); // Add state to track admin status
  const { getAccessTokenSilently } = useAuth0();

  const updateTasks = async () => {
    // Fetch tasks from the API and update the context
    try {
      const response = await createAPIEndPoint(ENDPOINT.tasks).fetchAll();
      setTasks(response.data);
      
      const usersResponse = await createAPIEndPoint().getUsers();
      setUsers(usersResponse.data);

      const accessToken = await getAccessTokenSilently();
      console.log(accessToken);

      const currentUser = JSON.parse(localStorage.getItem("user"));

      setIsAdmin(currentUser.userName.toLowerCase() === "admin");
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(()=>{
  //   if(localStorage.getItem('isUpdated') == "true"){
  //     updateTasks();
  //     localStorage.setItem('isUpdated',"false");
  //   }
  // })
  useEffect(() => {
    updateTasks();

  }, []);

  return (
    <TaskContext.Provider value={{ tasks, isAdmin, users, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  return useContext(TaskContext);
};
