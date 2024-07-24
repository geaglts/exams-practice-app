import axios from "axios";
import { getCookie } from "../utils";

const apiUrl = import.meta.env.VITE_API_URL;

const instance = axios.create({
  baseURL: apiUrl,
});

axios.interceptors.request.use(function (config) {
  const token = getCookie("token");
  if (token) config.headers.Authorization = "Bearer " + token;
  return config;
});

export default instance;
