import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.password !== form.confirmPassword) {
    return toast.error("Passwords do not match");
  }

  try {
    const res = await registerUser({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
    });

    toast.success(res.message);

    navigate("/signin");
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Signup Failed"
    );
  }
};

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-700 to-blue-600 p-6">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

      <h2 className="text-4xl font-bold text-center mb-2">
        Create Account
      </h2>

      <p className="text-gray-500 text-center mb-8">
        Join PackersPro Today
      </p>

      <form
        className="space-y-5"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <label className="flex items-center gap-2 text-gray-600">
          <input
            type="checkbox"
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          Create Account
        </button>

      </form>

      <button
        type="button"
        onClick={() =>
          toast("Google Sign-Up will be available soon!")
        }
        className="w-full mt-4 border py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-gray-100 transition"
      >
        <FaGoogle className="text-red-500" />
        Continue with Google
      </button>

      <p className="text-center mt-6">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="text-blue-600 font-semibold"
        >
          Sign In
        </Link>
      </p>

    </div>
  </div>
);
}