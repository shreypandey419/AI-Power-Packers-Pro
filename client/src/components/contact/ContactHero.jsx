import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 py-20 md:py-28 text-white">

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div data-aos="fade-right">

            <p className="uppercase tracking-[4px] text-blue-100 font-bold">
              Contact Us
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mt-5 leading-tight">
              Let's Plan Your
              <span className="block text-yellow-300">
                Next Move
              </span>
            </h1>

            <p className="text-base md:text-lg text-blue-100 leading-8 mt-6 max-w-xl">
              Need a moving quotation or have questions about our relocation
              services? Our experts are ready to help you with fast and reliable
              support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <Link
                to="/services"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-all duration-300"
              >
                Explore Services

                <ArrowRight size={20} />
              </Link>

              <a
                href="tel:+919999999999"
                className="border-2 border-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-700 transition-all duration-300"
              >
                Call Now
              </a>

            </div>

          </div>

          {/* Right */}

          <div
            data-aos="fade-left"
            className="grid gap-6"
          >

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-5 border border-white/20">

              <Phone size={34} />

              <div>
                <h3 className="font-bold text-xl">
                  Phone
                </h3>

                <p>+91 99999 99999</p>
              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-5 border border-white/20">

              <Mail size={34} />

              <div>
                <h3 className="font-bold text-xl">
                  Email
                </h3>

                <p>info@packerspro.com</p>
              </div>

            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-5 border border-white/20">

              <MapPin size={34} />

              <div>
                <h3 className="font-bold text-xl">
                  Office
                </h3>

                <p>Bangalore, Karnataka</p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}