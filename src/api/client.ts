import axios from "axios";

const { VITE_API_URL } = import.meta.env;

export const client = axios.create({
  baseURL: VITE_API_URL,
  timeout: 30000,
});
