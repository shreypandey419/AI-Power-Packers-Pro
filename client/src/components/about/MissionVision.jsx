import {
  FaBullseye,
  FaEye,
  FaHeart,
} from "react-icons/fa";

const cards = [
  {
    icon: <FaBullseye />,
    title: "Our Mission",
    desc: "To provide safe, affordable and hassle-free relocation services with complete customer satisfaction.",
    color: "from-blue-600 to-indigo-600",
  },
  {
    icon: <FaEye />,
    title: "Our Vision",
    desc: "To become India's most trusted and customer-focused packing and moving company.",
    color: "from-indigo-600 to-purple-600",
  },
  {
    icon: <FaHeart />,
    title: "Our Values",
    desc: "Integrity, transparency, punctuality and care are the foundation of everything we do.",
    color: "from-pink-500 to-red-500",
  },
];

export default function MissionVision() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">

      <div className="max-w-7xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
        >
          What Drives Us
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-4"
        >
          Mission, Vision & Values
        </h2>

        <p
          data-aos="fade-up"
          className="text-gray-500 text-center text-lg mt-6 max-w-3xl mx-auto leading-8"
        >
          Every successful relocation begins with trust, professionalism,
          and a commitment to delivering the best customer experience.
        </p>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {cards.map((card, index) => (

            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 120}
              className="group rounded-3xl bg-white border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >

              <div
                className={`h-2 bg-gradient-to-r ${card.color}`}
              ></div>

              <div className="p-10">

                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${card.color} text-white flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                >
                  {card.icon}
                </div>

                <h3 className="text-3xl font-bold mt-8">
                  {card.title}
                </h3>

                <p className="text-gray-600 mt-6 leading-8">
                  {card.desc}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}