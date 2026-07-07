import {
  FaHome,
  FaBuilding,
  FaTruckMoving,
  FaWarehouse,
  FaBoxes,
  FaCar,
} from "react-icons/fa";

import { ArrowRight } from "lucide-react";

const services = [
  {
    icon: <FaHome />,
    title: "House Shifting",
    desc: "Safe and hassle-free home relocation with professional packing and transportation.",
    color: "from-blue-600 to-blue-500",
  },
  {
    icon: <FaBuilding />,
    title: "Office Relocation",
    desc: "Fast office moving solutions with minimum downtime for your business.",
    color: "from-violet-600 to-indigo-500",
  },
  {
    icon: <FaTruckMoving />,
    title: "Vehicle Transport",
    desc: "Secure bike and car transportation across India with GPS tracking.",
    color: "from-sky-500 to-blue-600",
  },
  {
    icon: <FaWarehouse />,
    title: "Warehouse Storage",
    desc: "Short-term and long-term storage facilities with complete security.",
    color: "from-purple-600 to-violet-500",
  },
  {
    icon: <FaBoxes />,
    title: "Packing Services",
    desc: "Premium quality packing materials handled by trained professionals.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: <FaCar />,
    title: "Local Shifting",
    desc: "Affordable same-city relocation with timely pickup and delivery.",
    color: "from-indigo-600 to-blue-500",
  },
];

export default function Services() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <p
          className="text-blue-600 uppercase tracking-[4px] text-center font-bold"
          data-aos="fade-up"
        >
          Our Services
        </p>

        <h2
          className="text-5xl font-bold text-center mt-3"
          data-aos="fade-up"
        >
          Complete Relocation Solutions
        </h2>

        <p
          className="text-center text-gray-500 text-xl mt-5 max-w-3xl mx-auto leading-9"
          data-aos="fade-up"
        >
          We provide complete packing and moving solutions for homes,
          offices, vehicles and commercial goods with maximum safety.
        </p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">
          {services.map((service, index) => (
            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="group bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white text-4xl shadow-xl group-hover:rotate-4 group-hover:scale-110 transition-all duration-500`}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold mt-8">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 mt-4 leading-8">
                {service.desc}
              </p>

              {/* Button */}
              <button className="mt-8 flex items-center gap-2 text-blue-600 font-semibold transition-all duration-300 group-hover:gap-4">
                Explore Service
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-2"
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}