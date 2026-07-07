import {
  FaPhoneAlt,
  FaClipboardCheck,
  FaTruckMoving,
  FaHome,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaPhoneAlt />,
    title: "Book Your Move",
    desc: "Call us or request a free quote online. Our team will understand your moving requirements.",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Survey & Planning",
    desc: "Our experts inspect your belongings and prepare the best relocation plan with transparent pricing.",
    color: "from-indigo-600 to-blue-500",
  },
  {
    icon: <FaTruckMoving />,
    title: "Packing & Transportation",
    desc: "Professional packing, careful loading and GPS-enabled transportation ensure complete safety.",
    color: "from-purple-600 to-pink-500",
  },
  {
    icon: <FaHome />,
    title: "Safe Delivery",
    desc: "Timely unloading, unpacking and placement of your belongings at your new destination.",
    color: "from-green-600 to-emerald-500",
  },
];

export default function MovingProcess() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
        >
          Our Process
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-4"
        >
          Simple 4-Step Moving Process
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-gray-500 text-lg mt-6 max-w-3xl mx-auto leading-8"
        >
          Our streamlined relocation process ensures every move is organized,
          secure and completed without stress.
        </p>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {steps.map((step, index) => (

            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 120}
              className="relative bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 p-8 group"
            >

              <div className="absolute -top-4 right-6 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                {index + 1}
              </div>

              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${step.color} text-white flex items-center justify-center text-4xl shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}
              >
                {step.icon}
              </div>

              <h3 className="text-2xl font-bold mt-8">
                {step.title}
              </h3>

              <p className="text-gray-600 leading-8 mt-5">
                {step.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}