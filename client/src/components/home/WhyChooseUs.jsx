import {
  ShieldCheck,
  Clock3,
  Truck,
  BadgeCheck,
  IndianRupee,
  Headphones,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Licensed & Insured",
    desc: "Complete protection for your belongings throughout the relocation process.",
  },
  {
    icon: <Clock3 size={28} />,
    title: "On-Time Delivery",
    desc: "We value your time and always deliver according to the promised schedule.",
  },
  {
    icon: <Truck size={28} />,
    title: "GPS Tracking",
    desc: "Track your shipment in real time with secure transportation updates.",
  },
  {
    icon: <BadgeCheck size={28} />,
    title: "Professional Team",
    desc: "Experienced packing and moving professionals with years of expertise.",
  },
  {
    icon: <IndianRupee size={28} />,
    title: "Affordable Pricing",
    desc: "Transparent pricing with no hidden charges or surprise costs.",
  },
  {
    icon: <Headphones size={28} />,
    title: "24/7 Support",
    desc: "Friendly customer support available whenever you need assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
        >
          Why Choose Us
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-3"
        >
          Moving Made Simple & Safe
        </h2>

        <p
          data-aos="fade-up"
          className="text-gray-500 text-center max-w-3xl mx-auto mt-5 text-xl leading-9"
        >
          We combine experience, technology and professional service to
          deliver a stress-free relocation experience for every customer.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">

          {/* Left Image */}

          <div data-aos="fade-right">

            <img
              src="https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=900"
              alt="Packers and Movers"
              className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />

          </div>

          {/* Right Cards */}

          <div className="grid sm:grid-cols-2 gap-6">

            {features.map((item, index) => (

              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                className="group bg-slate-50 rounded-2xl p-6 hover:bg-blue-600 hover:text-white transition-all duration-500 hover:-translate-y-2 shadow-lg"
              >

                <div className="w-14 h-14 rounded-xl bg-blue-600 text-white flex items-center justify-center group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">

                  {item.icon}

                </div>

                <h3 className="font-bold text-xl mt-5">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-gray-500 group-hover:text-blue-100 transition">
                  {item.desc}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}