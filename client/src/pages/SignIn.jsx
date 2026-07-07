import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import { loginUser, googleLoginUser} from "../services/authService";
import { auth } from "../firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function SignIn() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const provider = new GoogleAuthProvider();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser(form);

      localStorage.setItem("customerToken", res.token);
      localStorage.setItem(
        "customer",
        JSON.stringify(res.user)
      );

      toast.success("Login Successful");

      navigate("/");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Login Failed"
      );

    }
  };

  const googleLogin = async () => {
  try {
    const result = await signInWithPopup(
      auth,
      provider
    );

    const firebaseUser = result.user;

    const idToken =
      await firebaseUser.getIdToken();

    const res =
      await googleLoginUser(idToken);

    console.log("Backend Response:", res);

    localStorage.setItem(
      "customerToken",
      res.token
    );

    localStorage.setItem(
      "customer",
      JSON.stringify(res.user)
    );

    toast.success(
      "Google Login Successful"
    );

    navigate("/");

  } catch (err) {

    console.log(err);

    toast.error(
      err.response?.data?.message ||
      "Google Login Failed"
    );

  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-700 p-6">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">

        <h2 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-gray-500 text-center mb-8">
          Sign in to your account
        </p>

        <form
          className="space-y-5"
          onSubmit={handleSubmit}
        >

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
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <label className="flex items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              onChange={() =>
                setShowPassword(
                  !showPassword
                )
              }
            />
            Show Password
          </label>
          <div className="text-right">

  <Link
    to="/forgot-password"
    className="text-blue-600 text-sm"
  >
    Forgot Password?
  </Link>

</div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Sign In
          </button>

        </form>

        <button
          type="button"
          onClick={googleLogin}
          className="w-full mt-4 border py-3 rounded-lg flex justify-center items-center gap-3 hover:bg-gray-100 transition"
        >
          <FaGoogle className="text-red-500" />
          Continue with Google
        </button>

        <p className="text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-semibold"
          >
            Sign Up
          </Link>
        </p>

      </div>

    </div>
  );
}