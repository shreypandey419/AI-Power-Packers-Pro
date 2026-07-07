import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getAllBookings,
  updateBookingStatus,
  exportBookingsExcel,
} from "../services/adminBookingService";
import { useNavigate } from "react-router-dom";

export default function AdminBookings() {

  const [bookings, setBookings] = useState([]);

  const [statusFilter, setStatusFilter] = useState("");

  const [search, setSearch] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const navigate = useNavigate();

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [driverForm, setDriverForm] = useState({
    driverName: "",
    driverPhone: "",
    vehicleNumber: "",
    vehicleType: "",
  });

  const loadBookings = useCallback(async () => {
  try {

    const res = await getAllBookings(
      statusFilter,
      search,
      fromDate,
      toDate
    );

    setBookings(res.bookings);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load bookings");

    }
  }, [statusFilter, search,fromDate, toDate]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  useEffect(() => {
    document.title = "My Bookings | PackersPro";
  }, []);

  const handleStatus = async (id, status) => {

    try {

      await updateBookingStatus(id, status);

      toast.success("Status Updated");

      loadBookings();

    } catch (err) {

      console.log(err);

      toast.error("Update Failed");

    }
  };

  const openAssign = (booking) => {
    setSelectedBooking(booking);

    setDriverForm({
      driverName: booking.driverName || "",
      driverPhone: booking.driverPhone || "",
      vehicleNumber: booking.vehicleNumber || "",
      vehicleType: booking.vehicleType || "",
    });
  };

  const saveDriver = async () => {
    try {
      await updateBookingStatus(
        selectedBooking._id,
        "Assigned",
        driverForm
      );

      toast.success("Driver Assigned");

      setSelectedBooking(null);

      loadBookings();

    } catch (err) {
      console.log(err);
      toast.error("Failed");
    }
  };

  const handleExport = async () => {
  try {
      const data = await exportBookingsExcel();

      const url = window.URL.createObjectURL(
        new Blob([data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "Bookings.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      toast.success("Excel Download Started");

    } catch (err) {

      console.log(err);

      toast.error("Export Failed");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 lg:p-10">

      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        All Bookings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 my-6">

        <input
          type="text"
          placeholder="Search From / To..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-3 rounded-lg w-full"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Assigned">Assigned</option>
          <option value="In Transit">In Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-3 rounded-lg w-full"
        />

      </div>

      <div className="flex flex-wrap gap-3 mb-6">

        <button
          onClick={() => navigate("/admin")}
          className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg"
        >
          ← Back to Dashboard
        </button>

        <button
          onClick={handleExport}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"
        >
          Export Excel
        </button>

      </div>

      <div className="md:hidden space-y-4 mb-6">

          {bookings.map((booking)=>(

            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-lg p-5"
            >

              <h2 className="font-bold text-lg">
                {booking.user?.name}
              </h2>

              <p className="mt-2">
                <b>From:</b> {booking.movingFrom}
              </p>

              <p>
                <b>To:</b> {booking.movingTo}
              </p>

              <p>
                <b>Price:</b> ₹ {booking.estimatedPrice}
              </p>

              <p>
                <b>Payment:</b> {booking.paymentStatus}
              </p>

              <select
                value={booking.bookingStatus}
                onChange={(e)=>
                  handleStatus(
                    booking._id,
                    e.target.value
                  )
                }
                className="border rounded-lg w-full mt-4 p-2"
              >
                <option>Pending</option>
                <option>Confirmed</option>
                <option>Assigned</option>
                <option>In Transit</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>

              <button
                onClick={() => openAssign(booking)}
                className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg"
              >
                Assign Driver
              </button>

            </div>

          ))}

        </div>

      <div className="hidden md:block overflow-x-auto rounded-xl shadow bg-white">

        <table className="min-w-[900px] w-full border">

        <thead className="bg-blue-600 text-white">

          <tr>

          <th className="p-3 whitespace-nowrap">
            Customer
          </th>

          <th className="whitespace-nowrap">
            From
          </th>

          <th className="whitespace-nowrap">
            To
          </th>

          <th className="whitespace-nowrap">
            Price
          </th>

          <th className="whitespace-nowrap">
            Payment
          </th>

          <th className="whitespace-nowrap">
            Status
          </th>

          <th className="whitespace-nowrap">
            Action
          </th>

        </tr>

        </thead>

        <tbody>

          {bookings.map((booking) => (

            <tr
              key={booking._id}
              className="border-b text-center"
            >

              <td className="p-3 whitespace-nowrap">
                {booking.user?.name}
              </td>

              <td className="whitespace-nowrap">
                {booking.movingFrom}
              </td>

              <td className="whitespace-nowrap">
                {booking.movingTo}
              </td>

              <td className="whitespace-nowrap">
                ₹ {booking.estimatedPrice}
              </td>

              <td className="whitespace-nowrap">
                {booking.paymentStatus}
              </td>

              <td>

                <select
                  value={booking.bookingStatus}
                  onChange={(e) =>
                    handleStatus(
                      booking._id,
                      e.target.value
                    )
                  }
                  className="border p-2 rounded whitespace-nowrap"
                >

                  <option>Pending</option>

                  <option>Confirmed</option>

                  <option>Assigned</option>

                  <option>In Transit</option>

                  <option>Delivered</option>

                  <option>Cancelled</option>

                </select>

              </td>

              <td>

                <button
                  onClick={() => openAssign(booking)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded whitespace-nowrap"
                >
                  Assign Driver
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>
      </div>

      {selectedBooking && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-[95%] max-w-md space-y-4">

            <h2 className="text-2xl font-bold">
              Assign Driver
            </h2>

            <input
              placeholder="Driver Name"
              value={driverForm.driverName}
              onChange={(e) =>
                setDriverForm({
                  ...driverForm,
                  driverName: e.target.value,
                })
              }
              className="border p-2 w-full rounded"
            />

            <input
              placeholder="Driver Phone"
              value={driverForm.driverPhone}
              onChange={(e) =>
                setDriverForm({
                  ...driverForm,
                  driverPhone: e.target.value,
                })
              }
              className="border p-2 w-full rounded"
            />

            <input
              placeholder="Vehicle Number"
              value={driverForm.vehicleNumber}
              onChange={(e) =>
                setDriverForm({
                  ...driverForm,
                  vehicleNumber: e.target.value,
                })
              }
              className="border p-2 w-full rounded"
            />

            <input
              placeholder="Vehicle Type"
              value={driverForm.vehicleType}
              onChange={(e) =>
                setDriverForm({
                  ...driverForm,
                  vehicleType: e.target.value,
                })
              }
              className="border p-2 w-full rounded"
            />

            <div className="flex flex-wrap gap-3">

              <button
                onClick={saveDriver}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setSelectedBooking(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

        )}

    </div>
  );
}