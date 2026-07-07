import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../services/bookingService";
import toast from "react-hot-toast";
import useAI from "../hooks/useAI";

export default function BookMove() {
  const [form, setForm] = useState({
    movingFrom: "",
    movingTo: "",
    houseType: "1 BHK",
    shiftingDate: "",
    packing: false,
    insurance: false,
  });
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);

  const navigate = useNavigate();
  const { bookingData, confirmBooking, setConfirmBooking, } = useAI();

  useEffect(() => {
    if (!confirmBooking) return;

    confirmBooking();

    setConfirmBooking(false);

  }, [confirmBooking, setConfirmBooking]);

  useEffect(() => {
  document.title = "Book Move | PackersPro";
}, []);

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  
// handleChange se pehle
const calculatePrice = useCallback((currentForm) => {
  let price;

  switch (currentForm.houseType) {
    case "1 BHK":
      price = 3500;
      break;
    case "2 BHK":
      price = 6000;
      break;
    case "3 BHK":
      price = 9000;
      break;
    case "4 BHK":
      price = 12000;
      break;
    case "Villa":
      price = 18000;
      break;
    default:
      price = 3500;
  }

  if (currentForm.packing) price += 1500;
  if (currentForm.insurance) price += 1000;

  setEstimatedPrice(price);
}, []);

useEffect(() => {
  if (!bookingData) return;

  const newForm = {
    movingFrom: bookingData.movingFrom || "",
    movingTo: bookingData.movingTo || "",
    houseType: bookingData.houseType || "1 BHK",
    shiftingDate: bookingData.shiftingDate || "",
    packing: bookingData.packing || false,
    insurance: bookingData.insurance || false,
  };

  setForm(newForm);
  calculatePrice(newForm);

}, [bookingData, calculatePrice]);
  
    const createBookingHandler = async () => {

      if (!form.movingFrom.trim()) {
        return toast.error("Please enter Moving From location");
      }

      if (!form.movingTo.trim()) {
        return toast.error("Please enter Moving To location");
      }

      if (
        form.movingFrom.trim().toLowerCase() ===
        form.movingTo.trim().toLowerCase()
      ) {
        return toast.error(
          "Moving From and Moving To cannot be the same"
        );
      }

      if (!form.shiftingDate) {
        return toast.error("Please select shifting date");
      }

      if (estimatedPrice === 0) {
        return toast.error("Please calculate price first.");
      }

      if (bookingLoading) return;

      setBookingLoading(true);

    try {
     const res = await createBooking({
        ...form,
        estimatedPrice,
      });

      toast.success("Booking Created Successfully");

      navigate("/booking-success", {
        state: {
          booking: res.booking,
        },
      });

      setForm({
        movingFrom: "",
        movingTo: "",
        houseType: "1 BHK",
        shiftingDate: "",
        packing: false,
        insurance: false,
      });

      setEstimatedPrice(0);

      navigate("/booking-success", {
        state: {
          booking: res.booking,
        },
      });

      } catch (err) {

        console.log(err);

        toast.error("Booking Failed");
      }
      finally {
        setBookingLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-100 py-6 md:py-10 px-4">

      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-5 md:p-8">

        <h1 className="text-2xl md:text-3xl font-bold mb-8">
          Book Your Move
        </h1>

        <div className="space-y-5">

          <input
            type="text"
            name="movingFrom"
            value={form.movingFrom}
            onChange={handleChange}
            placeholder="Moving From"
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="movingTo"
            value={form.movingTo}
            onChange={handleChange}
            placeholder="Moving To"
            className="w-full border p-3 rounded-lg"
          />

          <select
            name="houseType"
            value={form.houseType}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          >
            <option>1 BHK</option>
            <option>2 BHK</option>
            <option>3 BHK</option>
            <option>4 BHK</option>
            <option>Villa</option>
          </select>

          <input
            type="date"
            name="shiftingDate"
            value={form.shiftingDate}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            className="w-full border p-3 rounded-lg"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="packing"
              checked={form.packing}
              onChange={handleChange}
            />
            Packing Required
          </label>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="insurance"
              checked={form.insurance}
              onChange={handleChange}
            />
            Insurance Required
          </label>

          <button
            type="button"
            onClick={calculatePrice}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
          >
            Check Estimated Price
          </button>

          {estimatedPrice > 0 && (
            <div className="bg-green-100 border border-green-300 rounded-xl p-6 mt-6">

              <h2 className="text-2xl font-bold text-green-700">
                Estimated Price
              </h2>

              <p className="text-4xl font-bold mt-3">
                ₹ {estimatedPrice.toLocaleString()}
              </p>

              <p className="text-gray-600 mt-2">
                This is an estimated moving cost.
              </p>

              <button
                onClick={createBookingHandler}
                disabled={bookingLoading}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? "Creating Booking..." : "Confirm Booking"}
              </button>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}