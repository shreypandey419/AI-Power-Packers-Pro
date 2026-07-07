import {
  FaClipboardList,
  FaBoxOpen,
  FaTruckMoving,
  FaHome,
} from "react-icons/fa";

const steps = [
  {
    icon: <FaClipboardList />,
    title: "Book Your Move",
    desc: "Fill out our quick quotation form or call our experts to schedule your relocation.",
  },
  {
    icon: <FaBoxOpen />,
    title: "Packing",
    desc: "Our trained professionals carefully pack every item using premium packing materials.",
  },
  {
    icon: <FaTruckMoving />,
    title: "Transportation",
    desc: "Your belongings are transported safely with GPS-enabled vehicles and expert drivers.",
  },
  {
    icon: <FaHome />,
    title: "Safe Delivery",
    desc: "We unload, unpack and place everything safely at your new destination.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        <p className="text-center text-blue-600 font-bold uppercase tracking-[4px]">
          Simple Process
        </p>

        <h2
          className="text-5xl font-bold text-center mt-3"
          data-aos="fade-up"
        >
          How It Works
        </h2>

        <p
          className="text-center text-gray-500 text-xl mt-5 max-w-3xl mx-auto leading-9"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Moving has never been easier. Our streamlined relocation process
          ensures a safe, fast and hassle-free experience from start to finish.
        </p>

        <div className="relative mt-16">

          {/* Dotted Line */}
          <div className="hidden lg:block absolute top-16 left-[12%] w-[76%] border-t-2 border-dashed border-blue-200"></div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 relative">

            {steps.map((step, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="
                  group
                  relative
                  bg-white
                  rounded-3xl
                  p-8
                  text-center
                  border
                  border-gray-100
                  shadow-lg
                  hover:shadow-2xl
                  hover:shadow-blue-100
                  hover:-translate-y-3
                  transition-all
                  duration-500
                  overflow-hidden
                  min-h-[380px]
                  flex
                  flex-col
                "
              >

                {/* Top Accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

                {/* Step Number */}
                <div className="absolute top-4 right-5 bg-yellow-400 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className="
                    w-20
                    h-20
                    rounded-full
                    bg-blue-600
                    ring-8
                    ring-blue-100
                    text-white
                    flex
                    items-center
                    justify-center
                    text-4xl
                    mx-auto
                    shadow-xl
                    group-hover:scale-110
                    group-hover:rotate-6
                    transition-all
                    duration-500
                  "
                >
                  {step.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mt-8">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mt-5 text-[17px] leading-8 flex-grow">
                  {step.desc}
                </p>

              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}