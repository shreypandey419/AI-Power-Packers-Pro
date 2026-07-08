import axios from "axios";
import { API_URL } from "../config/api";

const API = `${API_URL}/api/notifications`;

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getNotifications = async () => {
  const res = await axios.get(API, getToken());
  return res.data;
};

export const markAsRead = async (id) => {
  const res = await axios.put(
    `${API}/${id}/read`,
    {},
    getToken()
  );

  return res.data;
};