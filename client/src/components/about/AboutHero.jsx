import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-28">

      {/* Background Blur */}

      <div className="absolute -top-40 -left-32 w-96 h-96 rounded-full bg-blue-400/20 blur-3xl"></div>

      <div className="absolute -bottom-40 -right-32 w-[450px] h-[450px] rounded-full bg-indigo-400/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left */}

          <div data-aos="fade-right">

            <span className="inline-block bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full font-semibold">
              About PackersPro
            </span>

            <h1 className="text-6xl font-extrabold text-white leading-tight mt-8">
              Moving Made
              <br />
              <span className="text-yellow-300">
                Safe & Simple
              </span>
            </h1>

            <p className="text-blue-100 text-lg leading-8 mt-8 max-w-xl">
              We provide trusted packing and moving services across
              Bangalore with professional packing, secure transportation
              and timely delivery backed by experienced relocation experts.
            </p>

            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition"
              >
                Get Free Quote
                <ArrowRight size={20} />
              </Link>

              <Link
                to="/services"
                className="border border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
              >
                Our Services
              </Link>

            </div>

          </div>

          {/* Right */}

          <div
            data-aos="fade-left"
            className="relative"
          >

            <img
              src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200"
              alt="Packers and Movers"
              className="rounded-3xl shadow-2xl"
            />

            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl shadow-2xl px-8 py-6">

              <h2 className="text-4xl font-bold text-blue-600">
                10K+
              </h2>

              <p className="text-gray-600 font-medium">
                Happy Customers
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}