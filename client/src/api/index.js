import axios from "axios";
const API = axios.create({ baseURL: "http://192.168.1.61:5002" });

//axios interceptor
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

//prejobs
export const sendPreJob = (prejob) => API.post("/prejobs/savedPrejobs", prejob);
export const getPreJob = () => API.get("/prejobs/savedPrejobs");
//auth
export const signIn = (userData) => API.post("user/signin", userData);
export const signUp = (userData) => API.post("user/signup", userData);
