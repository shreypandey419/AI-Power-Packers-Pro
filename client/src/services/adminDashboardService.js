import axios from "axios";

const API = "http://localhost:5001/api/admin";

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