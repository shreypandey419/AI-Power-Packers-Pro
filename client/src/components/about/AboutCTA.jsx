import { Link } from "react-router-dom";
import { Phone, ArrowRight } from "lucide-react";

export default function AboutCTA() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">

      {/* Background Glow */}

      <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">

        <p
          data-aos="fade-up"
          className="uppercase tracking-[4px] text-blue-100 font-bold"
        >
          Ready To Move?
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl lg:text-6xl font-extrabold text-white mt-5 leading-tight"
        >
          Let's Make Your Next
          <br />
          Move Stress Free
        </h2>

        <p
          data-aos="fade-up"
          className="text-blue-100 text-lg leading-8 max-w-3xl mx-auto mt-8"
        >
          Whether you're relocating your home, office, vehicle or commercial
          goods, our experienced team is ready to provide a safe, affordable
          and hassle-free moving experience.
        </p>

        <div
          data-aos="fade-up"
          className="flex flex-wrap justify-center gap-6 mt-12"
        >

          <Link
            to="/contact"
            className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-xl"
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">

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
              100%
            </h3>

            <p className="text-blue-100 mt-2">
              Safe Delivery
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