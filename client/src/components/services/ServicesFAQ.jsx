import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How much does house shifting cost?",
    answer:
      "Pricing depends on distance, household items and services required. Local shifting usually starts from ₹2,999.",
  },
  {
    question: "Do you provide packing materials?",
    answer:
      "Yes. We use premium quality packing materials including bubble wrap, corrugated sheets, cartons and stretch film.",
  },
  {
    question: "Is transit insurance available?",
    answer:
      "Yes. Transit insurance is available to provide additional protection for your valuable belongings.",
  },
  {
    question: "How early should I book my move?",
    answer:
      "We recommend booking at least 3–5 days in advance to ensure your preferred moving date and time.",
  },
  {
    question: "Do you provide intercity relocation?",
    answer:
      "Yes. We offer both local and long-distance relocation services across India.",
  },
];

export default function ServicesFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 bg-white">

      <div className="max-w-5xl mx-auto px-6">

        <p
          data-aos="fade-up"
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
        >
          FAQs
        </p>

        <h2
          data-aos="fade-up"
          className="text-5xl font-bold text-center mt-4"
        >
          Frequently Asked Questions
        </h2>

        <p
          data-aos="fade-up"
          className="text-center text-gray-500 text-lg mt-6 max-w-3xl mx-auto"
        >
          Everything you need to know before booking your relocation.
        </p>

        <div className="space-y-5 mt-16">

          {faqs.map((faq, index) => (

            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
            >

              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="w-full flex justify-between items-center p-6 bg-white hover:bg-slate-50 transition"
              >

                <h3 className="text-xl font-semibold text-left">
                  {faq.question}
                </h3>

                {open === index ? (
                  <Minus size={22} />
                ) : (
                  <Plus size={22} />
                )}

              </button>

              {open === index && (

                <div className="px-6 pb-6 text-gray-600 leading-8">

                  {faq.answer}

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}