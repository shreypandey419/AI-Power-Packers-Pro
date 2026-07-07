import {
  FaShieldAlt,
  FaTruckMoving,
  FaClock,
  FaAward,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Safe & Secure",
    desc: "Professional packing with premium quality materials for maximum protection.",
  },
  {
    icon: <FaTruckMoving />,
    title: "Fast Delivery",
    desc: "GPS-enabled vehicles ensure timely and secure transportation.",
  },
  {
    icon: <FaClock />,
    title: "24/7 Support",
    desc: "Dedicated customer support before, during and after your move.",
  },
  {
    icon: <FaAward />,
    title: "Trusted Experts",
    desc: "Thousands of successful relocations completed across Bangalore.",
  },
];

export default function SEOContent() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div data-aos="fade-right">

            <p className="text-blue-600 uppercase tracking-[4px] font-bold">
              Why PackersPro
            </p>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              Packers & Movers
              <span className="text-blue-600"> in Bangalore</span>
            </h2>

            <p className="mt-8 text-lg leading-9 text-gray-600">
              PackersPro provides reliable packing and moving services
              across Bangalore with a focus on safety, affordability and
              customer satisfaction.
            </p>

            <p className="mt-6 text-lg leading-9 text-gray-600">
              From household shifting to office relocation, vehicle transport
              and storage solutions, our experienced professionals ensure
              a hassle-free moving experience.
            </p>

            <button className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-300">
              Get Free Quote
            </button>

          </div>

          {/* Right */}

          <div
            data-aos="fade-left"
            className="grid sm:grid-cols-2 gap-6"
          >

            {features.map((item, index) => (

              <div
                key={index}
                className="group bg-white rounded-3xl p-7 shadow-lg border border-gray-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
              >

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-all duration-300">

                  {item.icon}

                </div>

                <h3 className="text-2xl font-bold mt-6">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-8">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-4 gap-8 mt-20">

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600">
              10K+
            </h3>
            <p className="mt-2 text-gray-600">
              Happy Customers
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600">
              15+
            </h3>
            <p className="mt-2 text-gray-600">
              Years Experience
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600">
              100%
            </h3>
            <p className="mt-2 text-gray-600">
              Safe Delivery
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-blue-600">
              24/7
            </h3>
            <p className="mt-2 text-gray-600">
              Customer Support
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}