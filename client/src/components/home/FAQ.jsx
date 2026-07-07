import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faq = [
  {
    q: "How much does house shifting cost?",
    a: "House shifting starts from ₹3,000 depending on the distance, floor level, household items, and packing requirements.",
  },
  {
    q: "Do you provide packing material?",
    a: "Yes. We use premium quality packing materials including bubble wrap, corrugated sheets, stretch film and sturdy cartons for maximum safety.",
  },
  {
    q: "Do you provide transit insurance?",
    a: "Yes. Transit insurance is available for extra protection against unforeseen situations during transportation.",
  },
  {
    q: "Can I book online?",
    a: "Absolutely! You can request a free quote online or contact our team directly through phone or WhatsApp.",
  },
  {
    q: "How long does the shifting process take?",
    a: "Most local moves are completed within the same day, while long-distance relocation depends on destination and shipment size.",
  },
  {
    q: "Do you relocate office equipment?",
    a: "Yes. We provide complete office relocation including furniture, servers, computers and other sensitive equipment.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">

      <div className="max-w-5xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center text-blue-600 uppercase tracking-[4px] font-bold"
        >
          FAQ
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-3"
        >
          Frequently Asked Questions
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-gray-500 text-lg mt-5 max-w-3xl mx-auto"
        >
          Everything you need to know before booking your relocation with
          PackersPro.
        </p>

        <div className="mt-16 space-y-6">

          {faq.map((item, index) => (

            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 overflow-hidden"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="w-full flex justify-between items-center text-left px-8 py-6"
              >

                <h3 className="text-xl font-semibold text-gray-900">
                  {item.q}
                </h3>

                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">

                  {open === index ? (
                    <Minus size={20} />
                  ) : (
                    <Plus size={20} />
                  )}

                </div>

              </button>

              <div
                className={`transition-all duration-500 overflow-hidden ${
                  open === index
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >

                <p className="px-8 pb-8 text-gray-600 leading-8">
                  {item.a}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}