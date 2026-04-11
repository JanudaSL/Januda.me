import axios from "axios";

export const api = axios.create({
  baseURL: "https://publication-w5v8.onrender.com", // NestJS backend
});