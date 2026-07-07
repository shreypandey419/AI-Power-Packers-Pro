import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">

      {/* Top Gradient Line */}

      <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"></div>

      {/* Newsletter */}

      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 shadow-2xl">

          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <div>

              <h2 className="text-4xl font-bold">
                Stay Updated
              </h2>

              <p className="text-blue-100 mt-3 leading-7">
                Subscribe to receive moving tips, exclusive offers,
                and relocation updates directly in your inbox.
              </p>

            </div>

            <div className="flex flex-col sm:flex-row gap-4">

              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl text-black outline-none"
              />

              <button className="bg-white text-blue-600 px-8 rounded-xl font-semibold flex items-center justify-center gap-3 hover:scale-105 transition">

                Subscribe

                <FaPaperPlane />

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="max-w-7xl mx-auto px-6 pb-10">

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-14">

          {/* Company */}

          <div>

            <h2 className="text-4xl font-extrabold">

              <span className="text-blue-500">
                Packers
              </span>

              <span className="text-white">
                Pro
              </span>

            </h2>

            <p className="mt-6 text-gray-400 leading-8">
              PackersPro provides safe, reliable and affordable
              relocation services for homes, offices, vehicles
              and commercial goods across India.
            </p>

            <div className="flex gap-4 mt-8">

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition duration-300 hover:scale-110"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition duration-300 hover:scale-110"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="w-12 h-12 rounded-full bg-slate-800 hover:bg-blue-700 flex items-center justify-center transition duration-300 hover:scale-110"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="https://wa.me/919999999999"
                className="w-12 h-12 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center transition duration-300 hover:scale-110"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-2xl font-bold mb-7">
              Quick Links
            </h3>

            <div className="space-y-4">

              <Link
                to="/"
                className="block text-gray-400 hover:text-blue-400 transition hover:translate-x-2"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="block text-gray-400 hover:text-blue-400 transition hover:translate-x-2"
              >
                About
              </Link>

              <Link
                to="/services"
                className="block text-gray-400 hover:text-blue-400 transition hover:translate-x-2"
              >
                Services
              </Link>

              <Link
                to="/contact"
                className="block text-gray-400 hover:text-blue-400 transition hover:translate-x-2"
              >
                Contact
              </Link>

            </div>

          </div>
                    {/* Services */}

          <div>

            <h3 className="text-2xl font-bold mb-7">
              Our Services
            </h3>

            <div className="space-y-4">

              {[
                "House Shifting",
                "Office Relocation",
                "Bike Transport",
                "Car Transport",
                "Warehouse Storage",
                "Packing Services",
              ].map((item, index) => (

                <p
                  key={index}
                  className="text-gray-400 hover:text-blue-400 transition hover:translate-x-2 cursor-pointer"
                >
                  {item}
                </p>

              ))}

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-2xl font-bold mb-7">
              Contact Us
            </h3>

            <div className="space-y-6">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">

                  <FaPhoneAlt />

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Call Us
                  </p>

                  <h4 className="font-semibold">
                    +91 99999 99999
                  </h4>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">

                  <FaEnvelope />

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Email
                  </p>

                  <h4 className="font-semibold">
                    info@packerspro.com
                  </h4>

                </div>

              </div>

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center">

                  <FaMapMarkerAlt />

                </div>

                <div>

                  <p className="text-gray-400 text-sm">
                    Location
                  </p>

                  <h4 className="font-semibold">
                    Bangalore, Karnataka
                  </h4>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-slate-800 my-12"></div>

        {/* Bottom */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">

          <p>
            © 2026 <span className="text-white font-semibold">PackersPro</span>. All Rights Reserved.
          </p>

          <div className="flex gap-8">

            <Link
              to="/terms"
              className="hover:text-blue-400 transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-blue-400 transition"
            >
              Terms & Conditions
            </Link>

            <Link
              to="/contact"
              className="hover:text-blue-400 transition"
            >
              Support
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}