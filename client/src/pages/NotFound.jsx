import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg w-full">

        <AlertTriangle
          size={80}
          className="mx-auto text-yellow-500"
        />

        <h1 className="text-6xl font-bold mt-6">
          404
        </h1>

        <h2 className="text-2xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry, the page you are looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          <Home size={20} />
          Back to Home
        </Link>

      </div>
    </div>
  );
}