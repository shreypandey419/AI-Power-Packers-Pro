import axios from "axios";
import { API_URL } from "../config/api";

const API = `${API_URL}/api/admin`;

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});

export const getDashboardStats = async () => {
  const res = await axios.get(
    `${API}/dashboard`,
    getToken()
  );

  return res.data;
};