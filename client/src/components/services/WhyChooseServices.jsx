import {
  FaShieldAlt,
  FaTruckMoving,
  FaClock,
  FaHeadset,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";

const reasons = [
  {
    icon: <FaShieldAlt />,
    title: "Safe & Secure",
    desc: "Every item is packed with premium quality materials for maximum protection.",
  },
  {
    icon: <FaTruckMoving />,
    title: "Modern Vehicles",
    desc: "GPS-enabled transport vehicles ensure timely and secure delivery.",
  },
  {
    icon: <FaClock />,
    title: "On-Time Delivery",
    desc: "Professional planning helps us complete every move on schedule.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Dedicated customer support before, during and after your relocation.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Affordable Pricing",
    desc: "Transparent quotations with absolutely no hidden charges.",
  },
  {
    icon: <FaUsers />,
    title: "Experienced Team",
    desc: "Skilled professionals with years of relocation experience.",
  },
];

export default function WhyChooseServices() {
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
          className="text-5xl font-bold text-center mt-4"
        >
          Why Customers Trust PackersPro
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-gray-500 text-lg mt-6 max-w-3xl mx-auto leading-8"
        >
          We combine professional expertise, modern technology and exceptional
          customer service to make every relocation smooth and stress-free.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">

          {reasons.map((item, index) => (

            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group rounded-3xl bg-slate-50 border border-gray-100 p-8 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold mt-7">
                {item.title}
              </h3>

              <p className="text-gray-600 leading-8 mt-5">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}