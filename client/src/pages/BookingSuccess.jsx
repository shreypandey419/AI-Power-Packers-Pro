import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";

export default function BookingSuccess() {
  const { state } = useLocation();

  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">
          Booking not found.
        </h2>
      </div>
    );
  }

  return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 pt-32 pb-16 flex justify-center items-center p-6">

            <div className="bg-white rounded-3xl shadow-xl p-10 max-w-lg w-full text-center">

                <div className="text-7xl animate-bounce mb-6">
                🎉
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-green-600">
                Booking Successful
                </h1>

                <p className="text-gray-600 mt-3">
                Your booking has been created successfully.
                </p>

                <div className="bg-gray-100 rounded-xl p-5 mt-8 text-left space-y-3">

                <p>
                    <strong>Booking ID:</strong><br />
                    {booking._id}
                </p>

                <p>
                    <strong>From:</strong><br />
                    {booking.movingFrom}
                </p>

                <p>
                    <strong>To:</strong><br />
                    {booking.movingTo}
                </p>

                <p>
                    <strong>House:</strong><br />
                    {booking.houseType}
                </p>

                <p>
                    <strong>Shifting Date:</strong><br />
                    {new Date(booking.shiftingDate).toLocaleDateString()}
                </p>

                <p>
                    <strong>Estimated Price:</strong><br />
                    ₹ {booking.estimatedPrice}
                </p>

                <p>
                    <strong>Status:</strong><br />
                    {booking.bookingStatus}
                </p>

                </div>

                <div className="flex gap-4 mt-8">

                <Link
                    to={`/booking/${booking._id}`}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center"
                >
                    Complete Payment →
                </Link>

                <Link
                    to="/my-bookings"
                    className="flex-1 border py-3 rounded-xl text-center"
                >
                    My Bookings
                </Link>

                </div>

                <Link
                to="/"
                className="block mt-5 text-blue-600 hover:underline"
                >
                ← Back to Home
                </Link>

            </div>

            </div>
        </>
    );
}