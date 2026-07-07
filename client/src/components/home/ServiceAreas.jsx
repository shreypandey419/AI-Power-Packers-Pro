import { FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";

const areas = [
  { name: "Whitefield", moves: "1200+" },
  { name: "Electronic City", moves: "980+" },
  { name: "HSR Layout", moves: "860+" },
  { name: "Koramangala", moves: "1450+" },
  { name: "Marathahalli", moves: "1100+" },
  { name: "Indiranagar", moves: "1300+" },
  { name: "Yelahanka", moves: "720+" },
  { name: "Hebbal", moves: "810+" },
  { name: "Jayanagar", moves: "950+" },
  { name: "BTM Layout", moves: "890+" },
  { name: "Banashankari", moves: "760+" },
  { name: "Rajajinagar", moves: "840+" },
];

export default function ServiceAreas() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center text-blue-600 font-bold uppercase tracking-[4px]"
        >
          We Serve
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-3"
        >
          Service Areas in Bangalore
        </h2>

        <p
          data-aos="fade-up"
          className="text-xl text-gray-500 text-center mt-5 max-w-3xl mx-auto leading-8"
        >
          Fast, secure and affordable relocation services available across
          Bangalore with experienced professionals and GPS-enabled transport.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {areas.map((area, index) => (

            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 70}
              className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 p-7 shadow-lg hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >

              {/* Background Glow */}

              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-100 opacity-0 group-hover:opacity-100 blur-3xl transition duration-500"></div>

              {/* Icon */}

              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">

                <FaMapMarkerAlt />

              </div>

              {/* Area */}

              <h3 className="relative z-10 text-2xl font-bold mt-6">

                {area.name}

              </h3>

              {/* Completed Moves */}

              <div className="relative z-10 mt-3 inline-flex items-center rounded-full bg-blue-50 text-blue-700 px-4 py-2 text-sm font-semibold">

                {area.moves} Successful Moves

              </div>

              <p className="relative z-10 mt-5 text-gray-500 leading-7">

                Trusted packing and moving services with safe transportation,
                expert handling and on-time delivery.

              </p>

              {/* Button */}

              <button className="relative z-10 mt-7 flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-4 transition-all">

                Explore Area

                <FaArrowRight className="text-sm" />

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}