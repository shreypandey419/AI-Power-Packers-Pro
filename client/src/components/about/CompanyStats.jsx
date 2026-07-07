const stats = [
  {
    number: "10K+",
    title: "Happy Customers",
  },
  {
    number: "15+",
    title: "Years Experience",
  },
  {
    number: "5000+",
    title: "Successful Moves",
  },
  {
    number: "24/7",
    title: "Customer Support",
  },
];

export default function CompanyStats() {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700">
      <div className="max-w-7xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center text-blue-100 uppercase tracking-[4px] font-bold"
        >
          Our Achievements
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center text-white mt-4"
        >
          Numbers That Speak
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-blue-100 text-lg mt-6 max-w-3xl mx-auto"
        >
          We take pride in delivering thousands of successful relocations
          with complete customer satisfaction.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {stats.map((item, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 text-center hover:bg-white/20 hover:-translate-y-2 transition-all duration-500"
            >
              <h3 className="text-5xl font-extrabold text-white">
                {item.number}
              </h3>

              <p className="mt-4 text-blue-100 text-lg">
                {item.title}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}