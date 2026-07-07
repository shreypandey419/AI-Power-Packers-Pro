import { Link } from "react-router-dom";

export default function Hero() {
  const customer =
    JSON.parse(localStorage.getItem("customer")) ||
    JSON.parse(localStorage.getItem("user"));

  const isLoggedIn =
    !!localStorage.getItem("customerToken") && !!customer;
  return (
    <section
  data-aos="fade-up"
  className="bg-slate-900 text-white py-24 overflow-hidden"
>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* Left Side */}
        <div>

          <div className="flex flex-wrap gap-3 mb-6">

            <div className="bg-yellow-400 text-black px-4 py-2 rounded-full font-semibold text-sm">
              ⭐ 4.9 Google Rating
            </div>

            <div className="bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
              ✔ Verified Company
            </div>

          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Trusted Packers &
            <br />
            Movers In India
          </h1>

          <p className="mt-6 text-base md:text-xl text-gray-300 leading-7 md:leading-8">
            Safe, Secure and Affordable Relocation Services.
            We provide professional house shifting, office
            relocation, bike transport and car transport
            across India with complete safety.
          </p>

          {isLoggedIn && (
            <div className="mt-10">
              <Link
                to="/book-move"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                Book Your Move
              </Link>
            </div>
          )}

          {/* Stats */}

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-14 text-center">

            <div>
              <h3 className="text-4xl font-bold text-blue-400">
                10K+
              </h3>

              <p className="text-gray-300 mt-2">
                Happy Customers
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-400">
                15+
              </h3>

              <p className="text-gray-300 mt-2">
                Years Experience
              </p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-400">
                24/7
              </h3>

              <p className="text-gray-300 mt-2">
                Customer Support
              </p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=900"
            alt="Packers and Movers"
            className="w-full h-[260px] md:h-auto object-cover rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
          />

          {/* Floating Rating Card */}

          <div className="hidden md:block absolute top-6 left-6 bg-white rounded-2xl shadow-xl px-5 py-4">

            <p className="text-yellow-500 font-bold text-lg">
              ⭐ 4.9 Rating
            </p>

            <p className="text-gray-600 text-sm">
              10,000+ Happy Reviews
            </p>

          </div>

          {/* Floating Experience Card */}

          <div className="hidden md:block absolute bottom-6 right-6 bg-blue-600 text-white rounded-2xl shadow-xl px-6 py-5">

            <h3 className="text-3xl font-bold">
              15+
            </h3>

            <p className="text-sm">
              Years Experience
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}