import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function ContactMap() {
  return (
    <section className="py-16 md:py-24 bg-white">

      <div className="max-w-7xl mx-auto px-4 md:px-6">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Google Map */}

          <div
            data-aos="fade-right"
            className="overflow-hidden rounded-3xl shadow-2xl border border-gray-200"
          >

            <iframe
              title="PackersPro Location"
              src="https://www.google.com/maps?q=Bangalore&output=embed"
              className="w-full h-[300px] md:h-[500px]"
              loading="lazy"
            />

          </div>

          {/* Office Details */}

          <div data-aos="fade-left">

            <p className="uppercase tracking-[4px] text-blue-600 font-bold">
              Visit Our Office
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mt-4">
              We're Here To Help
            </h2>

            <p className="text-gray-600 leading-8 mt-6">
              Visit our office, call us directly or send an email.
              Our relocation experts are always ready to help you
              with your moving requirements.
            </p>

            <div className="space-y-8 mt-10">

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center">

                  <FaMapMarkerAlt />

                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Office Address
                  </h3>

                  <p className="text-gray-600 mt-2">
                    Bangalore, Karnataka
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-2xl bg-green-600 text-white flex items-center justify-center">

                  <FaPhoneAlt />

                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Phone
                  </h3>

                  <p className="text-gray-600 mt-2">
                    +91 99999 99999
                  </p>

                </div>

              </div>

              <div className="flex gap-5">

                <div className="w-14 h-14 rounded-2xl bg-red-500 text-white flex items-center justify-center">

                  <FaEnvelope />

                </div>

                <div>

                  <h3 className="text-xl font-bold">
                    Email
                  </h3>

                  <p className="text-gray-600 mt-2">
                    info@packerspro.com
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}