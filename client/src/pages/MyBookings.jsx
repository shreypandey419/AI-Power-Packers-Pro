import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getMyBookings } from "../services/bookingService";
import toast from "react-hot-toast";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const loadBookings = useCallback(async () => {
  try {
    const res = await getMyBookings();
    setBookings(res.bookings);
  } catch (err) {
    console.log(err);
    toast.error("Failed to load bookings");
  }
}, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);
  useEffect(() => {
    document.title = "My Bookings | PackersPro";
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          My Bookings
        </h1>

        {bookings.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center">
            No Bookings Found
          </div>

        ) : (

          <div className="overflow-x-auto rounded-xl shadow">

            <table className="min-w-[850px] w-full bg-white">

              <thead className="bg-blue-600 text-white">

                <tr>

                  <th className="p-4">From</th>
                  <th className="p-4">To</th>
                  <th className="p-4">House</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Status</th>

                </tr>

              </thead>

              <tbody>

                {bookings.map((booking) => (

                  <tr
                    key={booking._id}
                    onClick={() => navigate(`/booking/${booking._id}`)}
                    className="border-t text-center cursor-pointer hover:bg-blue-50 transition"
                  >

                    <td className="p-4">
                      {booking.movingFrom}
                    </td>

                    <td className="p-4">
                      {booking.movingTo}
                    </td>

                    <td className="p-4">
                      {booking.houseType}
                    </td>

                    <td className="p-4">
                      {new Date(
                        booking.shiftingDate
                      ).toLocaleDateString()}
                    </td>

                    <td className="p-4">
                      ₹ {booking.estimatedPrice}
                    </td>

                    <td className="p-4">
                      {booking.paymentStatus}
                    </td>

                    <td className="p-4">
                      {booking.bookingStatus}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}