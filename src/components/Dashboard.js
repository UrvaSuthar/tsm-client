import React, { useEffect, useState } from "react";
import { useTaskContext } from "../hooks/TaskContext";
import { useNavigate } from "react-router-dom";
import { ENDPOINT, createAPIEndPoint } from "../api";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

const Dashboard = () => {
  const { tasks,updateTasks } = useTaskContext();

  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("username") === "Admin";

  const [users, setUsers] = useState([]);
  // const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await createAPIEndPoint().getUsers();
       
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
    // console.log(editedTask);
  }, []);

  const getUserById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.userName : "";
  };

  useEffect(() => {
    const isUpdated = localStorage.getItem("isUpdated");
    if (isUpdated === "true") {
      updateTasks();
      localStorage.setItem("isUpdated", "false");
    }
  }, [users]); // Add users as a dependency

  const handleAdminClick = () => {
    navigate("/");
  };

  const handleAdminLogout = async () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");

    if (localStorage.getItem("username") === null) {
      navigate("/");
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Implement delete task logic here
    await createAPIEndPoint(ENDPOINT.tasks)
      .delete(taskId)
      .catch((err) => console.log(err + " handling delete"));
    console.log("Deleting task with ID:", taskId);
  };

  const handleUpdateTask = async (taskId) => {
    setIsEditing(true);
    setSelectedTask(taskId);
    setEditedTask(tasks.find((task) => task.externalId == taskId));

    console.log("Updating task with ID:", taskId);
  };

  const handleModalSave = (taskId) => {
    setIsEditing(false);
    setSelectedTask(null);
    updateTaskUser(taskId, editedTask.userId, editedTask);
    console.log("Saving changes to task with ID:", taskId);
  };

  const handleModalClose = () => {
    setIsEditing(false);
    setSelectedTask(null);
  };

  const updateTaskUser = async (taskId, userId, updatedTaskData) => {
    const dataToPost = {
      externalId: updatedTaskData.externalId,
      title: updatedTaskData.title,
      description: updatedTaskData.description,
      isActive: updatedTaskData.isActive,
      createdAt: new Date(),
      userId: userId,
    };
    try {
      const api = createAPIEndPoint();
      const response = await api.put(
        `${taskId}/user/${userId}`,
        updatedTaskData
      );
      await createAPIEndPoint(ENDPOINT.tasks)
        .put(taskId, dataToPost)
        .catch((err) => console.log(err + " handling put"));
      if (response.status === 204) {
        console.log("Task user updated successfully");
        
        
        // Updating the task data in the tasks array
        const updatedTasks = tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, ...updatedTaskData };
          }
          return task;
        });
      } else {
        console.error("Failed to update task user");
      }
    } catch (error) {
      console.error("Error updating task user:", error);
    }
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className="flex h-screen flex-col font-mono bg-dotted-spacing-8 bg-dotted-gray-300 dark:bg-dotted-gray-600 dark:bg-dark dark:text-gray-200 justify-start items-start">
      <div className="flex h-20 justify-between items-center w-full">
        <p className="ml-4 text-gray-700 dark:text-gray-200 text-4xl ">
          Tasks Dashboard
        </p>
        {isAdmin ? (
          <>
            <button
              className="mr-5 items-center p-2 text-white rounded bg-gray-700"
              onClick={handleAdminClick}
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <button
              className="mr-5 items-center p-2 text-white rounded bg-gray-700"
              onClick={handleAdminLogout}
            >
              Admin ?
            </button>
          </>
        )}
      </div>
      <div className="w-full flex ">
        <table className="w-full mx-4 overflow-auto bg-white dark:bg-dark mt-5">
          <thead>
            <tr className="border-b-2 border-gray-700 dark:border-gray-300 text-lg">
              <th className="w-32 max-w-5"></th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th className="w-fit">User</th>
              <th className="">Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.externalId} className="text-center mx-3 group ">
                <td className="w-1/10 max-w-10">
                  <div className="w-full">
                    <button
                      className="mr-2 items-center p-2 text-red-600 opacity-0 group-hover:opacity-100 text-xl"
                      onClick={() => handleDeleteTask(task.externalId)}
                    >
                      <TrashIcon size={10} className="h-5" />
                    </button>
                    <button
                      className="mr-2 items-center p-2 text-black opacity-0 group-hover:opacity-100  text-xl"
                      onClick={() => handleUpdateTask(task.externalId)}
                    >
                      <PencilIcon size={10} className="h-5" />
                    </button>
                  </div>
                </td>
                <td>
                  <p>{task.title}</p>
                </td>
                <td>
                  <p>{task.description}</p>
                </td>
                <td>
                  <p>{task.isActive ? "Active" : "Inactive"}</p>
                </td>
                <td className="w-fit">
                  <p>{getUserById(task.userId)}</p>
                </td>
                <td className="w-fit">
                  <p>
                    {new Date(task.createdAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isEditing && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-40 flex justify-center items-center">
          <div className="flex flex-col space-y-3 w-1/3 bg-white dark:bg-gray-600 p-4 rounded-lg border-2 border-black shadow-lg">
            <h2 className="text-xl font-bold mb-4">Edit Task</h2>
            {/* Add your form fields for editing task details here */}
            <input
              type="text"
              className="border-b-2  w-full border-gray-800 dark:border-gray-900 dark:bg-gray-600 dark:placeholder:text-gray-700 dark:text-gray-200 mb-2 focus:outline-none"
              placeholder="Title"
              value={editedTask.title}
              onChange={(e) =>
                setEditedTask({ ...editedTask, title: e.target.value })
              }
            />
            <textarea
              className="border-b-2 w-full border-gray-700 dark:border-gray-900 dark:bg-gray-600 dark:placeholder:text-gray-700 dark:text-gray-200 focus:outline-none "
              placeholder="Description"
              value={editedTask.description}
              onChange={(e) =>
                setEditedTask({ ...editedTask, description: e.target.value })
              }
            ></textarea>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2"
                checked={editedTask.isActive}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, isActive: e.target.checked })
                }
              />
              Active
            </label>
            <select
              className="p-2 border border-gray-300 rounded mb-2 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-900"
              value={editedTask.userId}
              onChange={(e) =>
                setEditedTask({ ...editedTask, userId: e.target.value })
              }
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.userName}
                </option>
              ))}
            </select>

            <div className="flex justify-end">
              <button
                className="bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 text-white font-medium py-1.5 px-2.5 rounded-md mr-2"
                onClick={() => handleModalSave(editedTask.externalId)}
              >
                Save
              </button>
              <button
                className=" text-gray-700 dark:text-white font-medium py-2 px-4 rounded-md"
                onClick={handleModalClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
