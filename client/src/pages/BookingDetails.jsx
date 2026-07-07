import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  getBooking,
  cancelBooking,
  createPaymentOrder,
  verifyPayment,
} from "../services/bookingService";
import generateInvoice from "../utils/pdf/generateInvoice";
import BookingTimeline from "../components/booking/BookingTimeline";
import { createReview, getMyReview } from "../services/reviewService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Swal from "sweetalert2";

export default function BookingDetails() {
  const { id } = useParams();

  const [booking, setBooking] = useState(null);

  const [rating, setRating] = useState(5);

  const [comment, setComment] = useState("");

  const [myReview, setMyReview] = useState(null);

  const loadBooking = useCallback(async () => {
  try {
    const res = await getBooking(id);
    setBooking(res.booking);
  } catch (err) {
    console.log(err);
    toast.error("Failed to load booking");
  }
}, [id]);

const handleCancel = async () => {

  const result = await Swal.fire({
    title: "Cancel Booking?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, Cancel",
  });

if (!result.isConfirmed) return;

  try {

    const res = await cancelBooking(id);

    setBooking(res.booking);

    toast.success(res.message);

  } catch (err) {

    console.log(err);

    toast.error(
      err.response?.data?.message ||
      "Failed to cancel booking"
    );

  }

};
  const handlePayment = async () => {
  try {
    const res = await createPaymentOrder(id);

    const options = {
      key: res.key,
      amount: res.order.amount,
      currency: res.order.currency,
      name: "PackersPro",
      description: "Booking Payment",
      order_id: res.order.id,

      handler: async function (response) {
        try {
          const verify = await verifyPayment(response);

          setBooking(verify.booking);

          toast.success("Payment Successful");

        } catch (err) {
          console.log(err);
          toast.error("Payment Verification Failed");
        }
        },

        prefill: {
          name: "Customer",
          email: "",
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {

      console.log(err);

      toast.error("Unable to start payment");

    }
  };

  const handleReview = async () => {
  try {

    await createReview({
      bookingId: booking._id,
      rating,
      comment,
    });

    toast.success("Review Submitted");

    setComment("");

    await loadMyReview();

    } catch (err) {

      console.log(err);

      toast.error(
        err.response?.data?.message ||
        "Failed to submit review"
      );

    }
  };

  const loadMyReview = useCallback(async () => {
    try {

      const res = await getMyReview(id);

      setMyReview(res.review);

    } catch (err) {

      console.log(err);

    }
  }, [id]);

  useEffect(() => {
    loadBooking();
    loadMyReview();
  }, [loadBooking, loadMyReview]);
  useEffect(() => {
    document.title = "My Bookings | PackersPro";
  }, []);

  if (!booking) {
    return (
      <LoadingSpinner text="Loading Booking..." />
    );
  }

  return (
  <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-4">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-5 md:p-8">

      <h1 className="text-2xl md:text-3xl font-bold mb-8">
        Booking Details
      </h1>

      <BookingTimeline
        status={booking.bookingStatus}
      />

      <div className="grid md:grid-cols-2 gap-6">

        <Info
          title="Booking ID"
          value={booking._id}
        />

        <Info
          title="Moving From"
          value={booking.movingFrom}
        />

        <Info
          title="Moving To"
          value={booking.movingTo}
        />

        <Info
          title="House Type"
          value={booking.houseType}
        />

        <Info
          title="Shifting Date"
          value={new Date(booking.shiftingDate).toLocaleDateString()}
        />

        <Info
          title="Estimated Price"
          value={`₹ ${booking.estimatedPrice}`}
        />

        <Info
          title="Packing"
          value={booking.packing ? "Yes" : "No"}
        />

        <Info
          title="Insurance"
          value={booking.insurance ? "Yes" : "No"}
        />

        <Info
          title="Payment"
          value={booking.paymentStatus}
        />

        <Info
          title="Booking Status"
          value={booking.bookingStatus}
        />

        <Info
          title="Driver Name"
          value={booking.driverName || "Not Assigned"}
        />

        <Info
          title="Driver Phone"
          value={booking.driverPhone || "Not Assigned"}
        />

        <Info
          title="Vehicle Number"
          value={booking.vehicleNumber || "Not Assigned"}
        />

        <Info
          title="Vehicle Type"
          value={booking.vehicleType || "Not Assigned"}
        />

      </div>

      <div className="mt-8">

            <div className="flex flex-col sm:flex-row gap-4 mb-8">

              {(booking.bookingStatus === "Pending" ||
                booking.bookingStatus === "Confirmed") && (
                <button
                  onClick={handleCancel}
                  className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                >
                  Cancel Booking
                </button>
              )}

              {booking.paymentStatus === "Paid" && (
                <button
                  onClick={() => generateInvoice(booking)}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition"
                >
                  📄 Download Invoice
                </button>
              )}

              {booking.paymentStatus === "Pending" &&
                booking.bookingStatus !== "Cancelled" && (
                <button
                  onClick={handlePayment}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                >
                  Pay Now
                </button>
              )}

            </div>

          {booking.bookingStatus === "Delivered" && (

            <>
              {!myReview ? (

                <div className="mt-10 border-t pt-8">

                  <h2 className="text-2xl font-bold mb-5">
                    Rate Your Experience
                  </h2>

                  <div className="space-y-4">

                    <div>
                      <label className="block mb-2 font-medium">
                        Rating
                      </label>

                      <select
                        value={rating}
                        onChange={(e) =>
                          setRating(Number(e.target.value))
                        }
                        className="border p-3 rounded-lg w-full"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4)</option>
                        <option value={3}>⭐⭐⭐ (3)</option>
                        <option value={2}>⭐⭐ (2)</option>
                        <option value={1}>⭐ (1)</option>
                      </select>
                    </div>

                    <textarea
                      rows={4}
                      placeholder="Write your feedback..."
                      value={comment}
                      onChange={(e) =>
                        setComment(e.target.value)
                      }
                      className="border p-3 rounded-lg w-full"
                    />

                    <button
                      onClick={handleReview}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
                    >
                      Submit Review
                    </button>

                  </div>

                </div>

              ) : (

                <div className="mt-10 border rounded-xl p-6 bg-green-50">

                  <h2 className="text-2xl font-bold mb-4">
                    Your Review
                  </h2>

                  <div className="text-yellow-500 text-xl mb-3">
                    {"⭐".repeat(myReview.rating)}
                  </div>

                  <p className="text-gray-700 italic">
                    "{myReview.comment}"
                  </p>

                  <p className="mt-5 text-green-700 font-semibold">
                    ✔ Thank you for your feedback.
                  </p>

                </div>

              )}

            </>

          )}

                  </div>

                </div>
              </div>
            );
            }

function Info({ title, value }) {
  return (
    <div className="border rounded-lg p-4 break-words">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      {title === "Driver Phone" && value !== "Not Assigned" ? (
        <a
          href={`tel:${value}`}
          className="font-semibold mt-1 text-blue-600 hover:underline block"
        >
          {value}
        </a>
      ) : (
        <p className="font-semibold mt-1 break-words">
          {value}
        </p>
      )}
    </div>
  );
}