import axios from "axios";
import { API_URL } from "../config/api";

const API = `${API_URL}/api/users`;

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "customerToken"
    )}`,
  },
});

export const getProfile = async () => {
  const res = await axios.get(
    `${API}/profile`,
    getToken()
  );

  return res.data;
};

export const updateProfile = async (data) => {
  const res = await axios.put(
    `${API}/profile`,
    data,
    getToken()
  );

  return res.data;
};