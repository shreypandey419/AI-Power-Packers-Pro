import {
  FaAward,
  FaShieldAlt,
  FaTruckMoving,
  FaUsers,
} from "react-icons/fa";

const features = [
  {
    icon: <FaAward />,
    title: "10+ Years Experience",
    desc: "Delivering trusted relocation services with years of industry expertise.",
  },
  {
    icon: <FaUsers />,
    title: "10,000+ Happy Customers",
    desc: "Thousands of families and businesses trust us for safe moving.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Fully Insured",
    desc: "Every move is handled with safety, care and optional transit insurance.",
  },
  {
    icon: <FaTruckMoving />,
    title: "Modern Fleet",
    desc: "GPS-enabled vehicles ensure safe and on-time delivery every time.",
  },
];

export default function CompanyStory() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Image */}

          <div
            data-aos="fade-right"
            className="relative"
          >

            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200"
              alt="Company"
              className="rounded-3xl shadow-2xl"
            />

            <div className="absolute -top-8 -right-8 bg-blue-600 text-white rounded-2xl px-8 py-6 shadow-xl">

              <h2 className="text-4xl font-bold">
                15+
              </h2>

              <p>Years of Excellence</p>

            </div>

          </div>

          {/* Right Content */}

          <div data-aos="fade-left">

            <p className="uppercase tracking-[4px] text-blue-600 font-bold">
              Our Story
            </p>

            <h2 className="text-5xl font-bold mt-4 leading-tight">
              Trusted Packers &
              <span className="text-blue-600">
                {" "}Movers in Bangalore
              </span>
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-9">
              PackersPro was founded with one simple mission—
              making relocation stress-free, affordable and secure.
              From household shifting to office relocation, we have
              successfully completed thousands of moves with complete
              customer satisfaction.
            </p>

            <p className="mt-6 text-lg text-gray-600 leading-9">
              Our experienced professionals, premium packing materials,
              GPS-enabled transport and customer-first approach ensure
              every relocation is smooth from pickup to delivery.
            </p>

          </div>

        </div>

        {/* Feature Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24">

          {features.map((item, index) => (

            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 120}
              className="group bg-slate-50 rounded-3xl p-8 border border-gray-100 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg group-hover:rotate-6 group-hover:scale-110 transition">

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

    </section>
  );
}