export default function Gallery() {
  const images = [
    "https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1200",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200",
    "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=1200",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200",
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <p
          className="text-center text-blue-600 font-bold uppercase tracking-[4px]"
          data-aos="fade-up"
        >
          Our Work
        </p>

        <h2
          className="text-5xl font-bold text-center mt-3"
          data-aos="fade-up"
        >
          Moving Gallery
        </h2>

        <p
          className="text-xl text-gray-500 text-center mt-5 max-w-3xl mx-auto leading-9"
          data-aos="fade-up"
        >
          Take a look at some of our successful household and office relocation
          projects completed across Bangalore.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7 mt-16">
          {images.map((img, index) => (
            <div
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className={`group relative overflow-hidden rounded-3xl shadow-xl ${
                index % 3 === 1 ? "md:row-span-2" : ""
              }`}
            >
              <img
                src={img}
                alt="Gallery"
                className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                  index % 3 === 1 ? "h-[520px]" : "h-[250px]"
                }`}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">

                <h3 className="text-white text-2xl font-bold">
                  PackersPro
                </h3>

                <p className="text-gray-200 mt-2">
                  Safe & Professional Relocation
                </p>

                <button className="mt-5 w-fit bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition">
                  View Project
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}