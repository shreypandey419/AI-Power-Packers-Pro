import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    title: "Call Us",
    value: "+91 99999 99999",
    color: "from-blue-600 to-cyan-500",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    value: "info@packerspro.com",
    color: "from-indigo-600 to-blue-500",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Visit Office",
    value: "Bangalore, Karnataka",
    color: "from-purple-600 to-pink-500",
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    value: "Mon - Sun | 8:00 AM - 9:00 PM",
    color: "from-green-600 to-emerald-500",
  },
];

export default function ContactInfo() {
  return (
    <section className="py-16 md:py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <p
          data-aos="fade-up"
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
        >
          Get In Touch
        </p>

        <h2
          data-aos="fade-up"
          className="text-3xl md:text-5xl font-bold text-center mt-4"
        >
          Contact Information
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-gray-500 text-lg mt-6 max-w-3xl mx-auto leading-8"
        >
          Reach out through phone, email or visit our office. We're always
          ready to help with your relocation needs.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 md:mt-20">

          {contactInfo.map((item, index) => (

            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
              className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
            >

              <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>

              <div className="p-8 text-center">

                <div
                  className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${item.color} text-white flex items-center justify-center text-3xl shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}
                >
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold mt-8">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7">
                  {item.value}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}