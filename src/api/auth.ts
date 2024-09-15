import { API_URL } from "@/constants";
import axios from "axios";

export const getAuthInstance = (token: string) => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return instance;
};
