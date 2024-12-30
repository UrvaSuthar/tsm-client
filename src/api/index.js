import axios from "axios";

export const BASE_URL = "http://localhost:5239/api/";

export const ENDPOINT = {
  register: "auth/register",
  login: "auth/login",
  tasks: "Tasks/",
  // users:"tasks/users"
};

const api = axios.create({
  baseURL: "http://localhost:5239/api/tasks/",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const createAPIEndPoint = () => {

  return {
    fetchAll: () => api.get('/'),
    fetchById: (id) => api.get(`/${id}`),
    create: (newRecord) => api.post('/', newRecord),
    put: (id, updatedRecord) => api.put(`/${id}`, updatedRecord),
    delete: (id) => api.delete(`/${id}`),
    getUsers: (id) => api.get(`/users`),
    login: (credentials) => axios.post(BASE_URL+ENDPOINT.login, credentials),
    register: (userData) => axios.post(BASE_URL+ENDPOINT.register , userData),
  };
};;
