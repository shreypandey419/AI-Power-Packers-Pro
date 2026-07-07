import { useState } from "react";
import { forgotPassword } from "../services/authService";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await forgotPassword(email);

      toast.success(
        "Password reset email sent successfully."
      );

    } catch (err) {

      console.log(err);

      toast.error(err.message);

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-700">

      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center mb-2">
          Forgot Password
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Enter your registered email
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            Send Reset Link
          </button>

        </form>

        <p className="text-center mt-5">
          <Link
            to="/signin"
            className="text-blue-600"
          >
            Back to Login
          </Link>
        </p>

      </div>

    </div>
  );
}