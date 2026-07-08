import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  ShieldCheck,
  Users,
  BadgeDollarSign,
  Headphones,
} from "lucide-react";
import API_URL from "../../config/api";

export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    movingFrom: "",
    movingTo: "",
  });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const name = form.name.trim();
    const phone = form.phone.trim();
    const email = form.email.trim();
    const movingFrom = form.movingFrom.trim();
    const movingTo = form.movingTo.trim();

    if (!name) {
      return toast.error("Please enter your full name");
    }

    if (name.length < 3) {
      return toast.error(
        "Name must contain at least 3 characters"
      );
    }

    if (!/^[A-Za-z ]+$/.test(name)) {
      return toast.error(
        "Name can only contain letters"
      );
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return toast.error(
        "Enter a valid 10-digit mobile number"
      );
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return toast.error("Please enter a valid email");
    }

    if (!movingFrom) {
      return toast.error("Please enter Moving From");
    }

    if (!movingTo) {
      return toast.error("Please enter Moving To");
    }

    if (
      movingFrom.toLowerCase() ===
      movingTo.toLowerCase()
    ) {
      return toast.error(
        "Moving From and Moving To cannot be the same"
      );
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/leads`,
        {
          name,
          phone,
          email,
          movingFrom,
          movingTo,
        }
      );

      if (res.data.success) {
        toast.success(
          "Quote submitted successfully. Our team will contact you shortly."
        );

        setForm({
          name: "",
          phone: "",
          email: "",
          movingFrom: "",
          movingTo: "",
        });
      }
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to submit your request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="quote"
      className="py-28 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div
            data-aos="fade-right"
            className="text-white"
          >

            <span className="inline-block bg-white/20 backdrop-blur-md px-5 py-2 rounded-full font-semibold">
              ⭐ 4.9 Google Rating
            </span>

            <h2 className="text-5xl lg:text-6xl font-bold mt-7 leading-tight">
              Get Your Free
              <br />
              Moving Quote
            </h2>

            <p className="mt-7 text-blue-100 text-lg leading-8 max-w-lg">
              Request a free quote today. Our relocation experts
              will contact you within a few minutes with the best
              moving solution.
            </p>

            <div className="mt-10 space-y-5">

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <ShieldCheck size={22} />
                </div>

                <span className="text-lg">
                  Licensed & Insured Company
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <Users size={22} />
                </div>

                <span className="text-lg">
                  10,000+ Happy Customers
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <BadgeDollarSign size={22} />
                </div>

                <span className="text-lg">
                  No Hidden Charges
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500 shadow-lg shadow-green-500/40 flex items-center justify-center">
                  <Headphones size={22} />
                </div>

                <span className="text-lg">
                  24/7 Customer Support
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div
            data-aos="fade-left"
            className="bg-white rounded-3xl shadow-2xl p-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/20"
          >

            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Get Free Moving Quote
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
                maxLength={50}
                className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none "
              />

              <input
                type="tel"
                name="phone"
                maxLength={10}
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
              />

              <input
                type="text"
                name="movingFrom"
                placeholder="Moving From"
                value={form.movingFrom}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
              />

              <input
                type="text"
                name="movingTo"
                placeholder="Moving To"
                value={form.movingTo}
                onChange={handleChange}
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-300"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300"
              >
                {loading ? "Submitting Request..." : "Get Free Quote"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}