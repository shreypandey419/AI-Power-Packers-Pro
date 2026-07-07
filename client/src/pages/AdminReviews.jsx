import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getReviews,
  deleteReview,
} from "../services/reviewService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  const loadReviews = async () => {
    try {
      const res = await getReviews();
      setReviews(res.reviews);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load reviews");
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    document.title = "My Bookings | PackersPro";
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Review?",
      text: "You won't be able to recover it.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });

if (!result.isConfirmed) return;

    try {
      await deleteReview(id);

      toast.success("Review Deleted");

      setReviews((prev) =>
        prev.filter((r) => r._id !== id)
      );
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center mb-8">

          <h1 className="text-2xl md:text-4xl font-bold">
            Customer Reviews
          </h1>

          <button
            onClick={() => navigate("/admin")}
            className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg transition"
          >
            ← Back to Dashboard
          </button>

        </div>

        {/* Mobile Cards */}

        <div className="md:hidden space-y-4 mb-6">

          {reviews.map((review)=>(

          <div
          key={review._id}
          className="bg-white rounded-xl shadow-lg p-5"
          >

          <h2 className="font-bold">
          {review.user?.name}
          </h2>

          <p className="text-yellow-500 mt-2">
          {"⭐".repeat(review.rating)}
          </p>

          <p className="mt-3">
          {review.comment}
          </p>

          <p className="text-gray-500 mt-3">
          {new Date(review.createdAt).toLocaleDateString()}
          </p>

          <button
          onClick={()=>handleDelete(review._id)}
          className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg"
          >

          Delete

          </button>

          </div>

          ))}

        </div>

        {/* Desktop Table */}

        <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-x-auto">

          <table className="min-w-[850px] w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-4 text-left whitespace-nowrap">Customer</th>
                <th className="p-4 text-left whitespace-nowrap">Rating</th>
                <th className="p-4 text-left whitespace-nowrap">Comment</th>
                <th className="p-4 text-left whitespace-nowrap">Date</th>
                <th className="p-4 text-center whitespace-nowrap">Action</th>
              </tr>

            </thead>

            <tbody>

              {reviews.map((review) => (

                <tr
                  key={review._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4 font-medium whitespace-nowrap">
                    {review.user?.name}
                  </td>

                  <td className="p-4 text-yellow-500 whitespace-nowrap">
                    {"⭐".repeat(review.rating)}
                  </td>

                  <td className="p-4">
                    {review.comment}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>

                  <td className="p-4 text-center">

                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg whitespace-nowrap"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

              {reviews.length === 0 && (

                <tr>

                  <td
                    colSpan={5}
                    className="p-8 text-center text-gray-500"
                  >
                    No Reviews Found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}