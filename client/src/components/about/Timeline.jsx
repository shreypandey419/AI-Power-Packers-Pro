import {
  FaClipboardCheck,
  FaBoxOpen,
  FaTruckMoving,
  FaHome,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaClipboardCheck />,
    title: "Book Your Move",
    desc: "Contact our relocation experts and receive an instant moving quotation.",
  },
  {
    icon: <FaBoxOpen />,
    title: "Professional Packing",
    desc: "Our team carefully packs every item using premium quality packing materials.",
  },
  {
    icon: <FaTruckMoving />,
    title: "Safe Transportation",
    desc: "GPS-enabled vehicles ensure your belongings reach safely and on time.",
  },
  {
    icon: <FaHome />,
    title: "Delivery & Setup",
    desc: "We unload, unpack and place your belongings exactly where you need them.",
  },
];

export default function Timeline() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center text-blue-600 uppercase tracking-[4px] font-bold"
        >
          Our Process
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-4"
        >
          How We Work
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-gray-500 text-lg mt-6 max-w-3xl mx-auto"
        >
          Our streamlined relocation process ensures a smooth and hassle-free
          moving experience from booking to final delivery.
        </p>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-20">

          {steps.map((step, index) => (

            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative bg-slate-50 rounded-3xl p-8 shadow-lg border border-gray-100 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 group"
            >

              <div className="absolute -top-4 right-5 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg">
                {index + 1}
              </div>

              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-4xl shadow-lg group-hover:scale-110 transition-all duration-500">

                {step.icon}

              </div>

              <h3 className="text-2xl font-bold mt-8">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-5 leading-8">
                {step.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}