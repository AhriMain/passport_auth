import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export const loginApi = async (payload) => {
  return await API.post("/login", payload);
};

export const registerApi = async (payload) => {
  return await API.post("/register", payload);
};
