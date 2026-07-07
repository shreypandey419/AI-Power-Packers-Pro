import { Link } from "react-router-dom";
import { Phone, ArrowRight, ShieldCheck, Truck, Clock } from "lucide-react";

export default function ServicesCTA() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div
          data-aos="fade-up"
          className="text-center"
        >

          <p className="uppercase tracking-[4px] text-blue-100 font-bold">
            Ready To Move?
          </p>

          <h2 className="text-5xl lg:text-6xl font-extrabold text-white mt-5 leading-tight">
            Let's Make Your Next
            <br />
            Move Completely Stress-Free
          </h2>

          <p className="text-blue-100 text-lg leading-8 mt-8 max-w-3xl mx-auto">
            Whether you're moving your home, office, vehicle or commercial
            goods, our relocation experts are ready to provide a fast,
            secure and affordable moving experience.
          </p>

        </div>

        {/* Trust Cards */}

        <div className="grid md:grid-cols-3 gap-8 mt-16">

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20">

            <ShieldCheck
              size={48}
              className="mx-auto text-green-300"
            />

            <h3 className="text-2xl font-bold text-white mt-6">
              100% Safe Packing
            </h3>

            <p className="text-blue-100 mt-3">
              Premium packing materials with complete safety.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20">

            <Truck
              size={48}
              className="mx-auto text-yellow-300"
            />

            <h3 className="text-2xl font-bold text-white mt-6">
              GPS Tracking
            </h3>

            <p className="text-blue-100 mt-3">
              Live shipment tracking throughout the journey.
            </p>

          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20">

            <Clock
              size={48}
              className="mx-auto text-cyan-300"
            />

            <h3 className="text-2xl font-bold text-white mt-6">
              On-Time Delivery
            </h3>

            <p className="text-blue-100 mt-3">
              Professional planning ensures timely relocation.
            </p>

          </div>

        </div>

        {/* CTA Buttons */}

        <div
          data-aos="zoom-in"
          className="flex flex-wrap justify-center gap-6 mt-16"
        >

          <Link
            to="/contact"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Free Quote

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

        {/* Bottom Stats */}

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