import { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import toast from "react-hot-toast";
import API_URL from "../../config/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
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

    if (!form.name || !form.phone || !form.message) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/contact`,
        form
      );

      if (res.data.success) {
        toast.success("Message sent successfully");

        setForm({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50">

      <div className="max-w-4xl mx-auto px-4 md:px-6">

        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">

          <p className="uppercase tracking-[4px] text-blue-600 font-bold">
            Send Message
          </p>

          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            We'd Love To Hear From You
          </h2>

          <p className="text-gray-500 mt-5 leading-8">
            Fill out the form below and our team will contact you shortly.
          </p>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6 mt-10"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              className="p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <textarea
              rows="6"
              name="message"
              placeholder="Write your message..."
              value={form.message}
              onChange={handleChange}
              className="md:col-span-2 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-3 hover:scale-[1.02] transition-all duration-300 disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send Message"}

              <Send size={20} />
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}