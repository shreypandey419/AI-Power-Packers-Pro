import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../config/api";

export default function DashboardOverview() {
  const [recentLeads, setRecentLeads] = useState([]);
  const [todayFollowUps, setTodayFollowUps] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);

  const fetchOverview = async () => {
  try {
    const token = localStorage.getItem("adminToken");

    const res = await axios.get(
      `${API_URL}/api/dashboard/overview`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      setRecentLeads(res.data.recentLeads);
      setTodayFollowUps(res.data.todayFollowUps);
      setRecentBookings(res.data.recentBookings);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-10">

      {/* Recent Leads */}
      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Recent Leads
        </h2>

        {recentLeads.length === 0 ? (
          <p className="text-gray-500">
            No recent leads
          </p>
        ) : (
          recentLeads.map((lead) => (
            <div
              key={lead._id}
              className="flex justify-between border-b py-3"
            >
              <div>
                <p className="font-semibold">
                  {lead.name}
                </p>

                <p className="text-sm text-gray-500">
                  {lead.phone}
                </p>
              </div>

              <span className="text-blue-600 text-sm">
                {lead.status}
              </span>
            </div>
          ))
        )}

      </div>

      {/* Today's Follow Ups */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Today's Follow Ups
        </h2>

        {todayFollowUps.length === 0 ? (
          <p className="text-gray-500">
            No follow ups today
          </p>
        ) : (
          todayFollowUps.map((lead) => (
            <div
              key={lead._id}
              className="flex justify-between border-b py-3"
            >
              <div>

                <p className="font-semibold">
                  {lead.name}
                </p>

                <p className="text-sm text-gray-500">
                  {lead.phone}
                </p>

              </div>

              <span className="text-orange-600 text-sm">
                {new Date(
                  lead.followUpDate
                ).toLocaleDateString()}
              </span>

            </div>
          ))
        )}

      </div>

      {/* Recent Bookings */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-xl font-bold mb-4">
          Recent Bookings
        </h2>

        {recentBookings.length === 0 ? (

          <p className="text-gray-500">
            No recent bookings
          </p>

        ) : (

          recentBookings.map((booking) => (

            <div
              key={booking._id}
              className="border-b py-3"
            >

              <p className="font-semibold">
                {booking.user?.name}
              </p>

              <p className="text-sm text-gray-500">
                {booking.movingFrom} → {booking.movingTo}
              </p>

              <div className="flex justify-between mt-1">

                <span className="text-green-600">
                  ₹ {booking.estimatedPrice}
                </span>

                <span className="text-blue-600 text-sm">
                  {booking.bookingStatus}
                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}