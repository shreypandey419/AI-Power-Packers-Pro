import { API_URL } from "../config/api";

const API = `${API_URL}/api/dashboard`;

export const getDashboardStats = async () => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data;
};