import {
  FaShieldAlt,
  FaClock,
  FaMoneyBillWave,
  FaTruckMoving,
  FaBoxes,
  FaHeadset,
} from "react-icons/fa";

const benefits = [
  {
    icon: <FaShieldAlt />,
    title: "100% Safe Packing",
    desc: "Premium quality packing materials protect every item during relocation.",
  },
  {
    icon: <FaClock />,
    title: "On-Time Delivery",
    desc: "Our experienced logistics team ensures timely pickup and delivery.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Affordable Pricing",
    desc: "Transparent quotations with absolutely no hidden charges.",
  },
  {
    icon: <FaTruckMoving />,
    title: "GPS Tracking",
    desc: "Track your shipment throughout the relocation journey.",
  },
  {
    icon: <FaBoxes />,
    title: "Professional Handling",
    desc: "Skilled movers carefully load, unload and arrange your belongings.",
  },
  {
    icon: <FaHeadset />,
    title: "Dedicated Support",
    desc: "Friendly customer support available before, during and after your move.",
  },
];

export default function ServiceBenefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
        >
          Benefits
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-4"
        >
          Why You'll Love Our Service
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-gray-500 text-lg mt-6 max-w-3xl mx-auto leading-8"
        >
          We focus on safety, affordability and customer satisfaction so your
          relocation experience remains smooth from start to finish.
        </p>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {benefits.map((item, index) => (

            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group rounded-3xl bg-white border border-gray-100 p-8 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500"
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">

                {item.icon}

              </div>

              <h3 className="text-2xl font-bold mt-7">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-5 leading-8">
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}