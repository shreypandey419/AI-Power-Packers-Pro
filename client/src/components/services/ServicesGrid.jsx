import {
  FaHome,
  FaBuilding,
  FaCar,
  FaMotorcycle,
  FaWarehouse,
  FaBoxOpen,
} from "react-icons/fa";
import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: <FaHome />,
    title: "House Shifting",
    desc: "Safe and secure household relocation with premium packing and careful handling.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: <FaBuilding />,
    title: "Office Relocation",
    desc: "Fast office shifting with minimum downtime and professional planning.",
    color: "from-indigo-600 to-blue-500",
  },
  {
    icon: <FaCar />,
    title: "Car Transport",
    desc: "Door-to-door enclosed and open car carrier transportation across India.",
    color: "from-purple-600 to-indigo-600",
  },
  {
    icon: <FaMotorcycle />,
    title: "Bike Transport",
    desc: "Damage-free bike transportation using secure packaging techniques.",
    color: "from-pink-600 to-red-500",
  },
  {
    icon: <FaWarehouse />,
    title: "Storage Solutions",
    desc: "Safe warehouse facilities for short-term and long-term storage.",
    color: "from-emerald-600 to-green-500",
  },
  {
    icon: <FaBoxOpen />,
    title: "Packing Services",
    desc: "High-quality packing materials and trained professionals for every move.",
    color: "from-orange-500 to-yellow-500",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
        >
          What We Offer
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-4"
        >
          Our Professional Services
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-gray-500 text-lg mt-6 max-w-3xl mx-auto leading-8"
        >
          Comprehensive relocation solutions designed to make every move
          safe, smooth and stress-free.
        </p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {services.map((service, index) => (

            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
            >

              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>

              <div className="p-8">

                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${service.color} text-white flex items-center justify-center text-4xl shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}
                >
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {service.title}
                </h3>

                <p className="text-gray-600 mt-5 leading-8">
                  {service.desc}
                </p>

                <button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">
                  Learn More

                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}