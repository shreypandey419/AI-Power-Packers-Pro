import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("1");

  try {
    console.log("2");

    const res = await axios.post(
      `${API_URL}/api/admin/login`,
      form
    );

    console.log("3", res.data);

    localStorage.setItem("adminToken", res.data.token);

    console.log("4", localStorage.getItem("adminToken"));

    navigate("/admin");

    console.log("5");
  } catch (err) {
    console.log("ERROR", err);
    alert(err.response?.data?.message || "Login Failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96 space-y-4"
      >

        <h2 className="text-3xl font-bold text-center">
          Admin Login
        </h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}