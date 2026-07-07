import { Link } from "react-router-dom";
import {
  Phone,
  ArrowRight,
  ShieldCheck,
  Clock3,
  Truck,
} from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        <div
          data-aos="fade-up"
          className="text-center"
        >

          <p className="uppercase tracking-[4px] text-blue-100 font-bold">
            Ready To Move?
          </p>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mt-5 leading-tight">
            Get Your Free
            <br />
            Moving Quote Today
          </h2>

          <p className="text-blue-100 text-lg leading-8 max-w-3xl mx-auto mt-8">
            Contact our relocation experts today for a free survey,
            transparent pricing and stress-free moving experience.
          </p>

        </div>

        {/* Trust Cards */}

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-center">

            <ShieldCheck
              size={48}
              className="mx-auto text-green-300"
            />

            <h3 className="text-2xl font-bold text-white mt-6">
              Fully Insured
            </h3>

            <p className="text-blue-100 mt-3">
              Safe packing and secure transportation.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-center">

            <Clock3
              size={48}
              className="mx-auto text-yellow-300"
            />

            <h3 className="text-2xl font-bold text-white mt-6">
              Fast Response
            </h3>

            <p className="text-blue-100 mt-3">
              Quick quotations and instant support.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 text-center">

            <Truck
              size={48}
              className="mx-auto text-cyan-300"
            />

            <h3 className="text-2xl font-bold text-white mt-6">
              Trusted Movers
            </h3>

            <p className="text-blue-100 mt-3">
              Thousands of successful relocations completed.
            </p>

          </div>

        </div>

        {/* Buttons */}

        <div
          data-aos="zoom-in"
          className="flex flex-col sm:flex-row justify-center gap-4 mt-16"
        >

          <Link
            to="/services"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition-all duration-300"
          >
            Explore Services

            <ArrowRight size={20} />
          </Link>

          <a
            href="tel:+919999999999"
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-white hover:text-blue-700 transition-all duration-300"
          >
            <Phone size={20} />

            Call Now
          </a>

        </div>

        {/* Stats */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-20 text-center">

          <div>

            <h3 className="text-4xl font-bold text-white">
              10K+
            </h3>

            <p className="text-blue-100 mt-2">
              Happy Customers
            </p>

          </div>

          <div>

            <h3 className="text-4xl font-bold text-white">
              15+
            </h3>

            <p className="text-blue-100 mt-2">
              Years Experience
            </p>

          </div>

          <div>

            <h3 className="text-4xl font-bold text-white">
              5000+
            </h3>

            <p className="text-blue-100 mt-2">
              Successful Moves
            </p>

          </div>

          <div>

            <h3 className="text-4xl font-bold text-white">
              24/7
            </h3>

            <p className="text-blue-100 mt-2">
              Customer Support
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}