import axios from "axios";
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { API_URL } from "../config/api";

export const forgotPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

const API = `${API_URL}/api/auth`;

export const registerUser = async (user) => {
  const res = await axios.post(`${API}/register`, user);
  return res.data;
};

export const loginUser = async (user) => {
  const res = await axios.post(`${API}/login`, user);
  return res.data;
};

export const googleLoginUser = async (idToken) => {
  const res = await axios.post(
    `${API}/google-login`,   // <-- yahan change karo
    {
      idToken,
    }
  );
  return res.data;
};