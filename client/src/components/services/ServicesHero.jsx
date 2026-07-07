import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-28">

      {/* Background Glow */}

      <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-indigo-400/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div data-aos="fade-right">

            <p className="uppercase tracking-[4px] text-blue-100 font-bold">
              Professional Moving Services
            </p>

            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mt-5">
              Complete
              <span className="block text-yellow-300">
                Relocation Solutions
              </span>
            </h1>

            <p className="text-blue-100 text-lg leading-9 mt-8 max-w-xl">
              From house shifting to office relocation, vehicle transport,
              packing, storage and commercial moving, PackersPro delivers
              safe, affordable and hassle-free relocation services.
            </p>

            <div className="grid sm:grid-cols-2 gap-5 mt-10">

              {[
                "House Shifting",
                "Office Relocation",
                "Vehicle Transport",
                "Packing & Unpacking",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="text-green-300" size={22} />

                  <span>{item}</span>
                </div>
              ))}

            </div>

            <div className="flex flex-wrap gap-5 mt-12">

              <Link
                to="/contact"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Get Free Quote

                <ArrowRight size={20} />
              </Link>

              <a
                href="tel:+919999999999"
                className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-all duration-300"
              >
                Call Now
              </a>

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
              className="rounded-3xl shadow-2xl border-8 border-white/10"
            />

            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-2xl">

              <h3 className="text-4xl font-bold text-blue-700">
                10K+
              </h3>

              <p className="text-gray-600">
                Happy Customers
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}