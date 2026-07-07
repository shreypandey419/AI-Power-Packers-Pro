import { useNavigate } from "react-router-dom";
import {
  Truck,
  Package,
  User,
  LogOut,
} from "lucide-react";

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const customer = JSON.parse(
    localStorage.getItem("customer")
  );

  const logout = () => {
    localStorage.removeItem("customer");
    localStorage.removeItem("customerToken");

    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-blue-700 text-white p-6 shadow">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold">
              Welcome {customer?.name}
            </h1>

            <p className="opacity-90 mt-1">
              Customer Dashboard
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-600 px-5 py-2 rounded-lg flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid lg:grid-cols-3 gap-6">

          <div
            onClick={() => navigate("/book-move")}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition"
          >
            <Truck
              size={45}
              className="text-blue-600 mb-4"
            />

            <h2 className="text-2xl font-bold">
              Book a Move
            </h2>

            <p className="text-gray-500 mt-2">
              Book Packers & Movers
            </p>

          </div>

          <div
            onClick={() =>
              navigate("/my-bookings")
            }
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition"
          >
            <Package
              size={45}
              className="text-green-600 mb-4"
            />

            <h2 className="text-2xl font-bold">
              My Bookings
            </h2>

            <p className="text-gray-500 mt-2">
              View all bookings
            </p>

          </div>

          <div
            onClick={() => navigate("/profile")}
            className="bg-white rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition"
          >
            <User
              size={45}
              className="text-purple-600 mb-4"
            />

            <h2 className="text-2xl font-bold">
              My Profile
            </h2>

            <p className="text-gray-500 mt-2">
              Manage your account
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}