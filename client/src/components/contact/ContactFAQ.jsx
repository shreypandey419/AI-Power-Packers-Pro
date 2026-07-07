import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How quickly will I receive a quote?",
    answer:
      "Our team usually responds within a few minutes during business hours and within 24 hours for all enquiries.",
  },
  {
    question: "Can I book my move online?",
    answer:
      "Yes. Simply fill out the contact form and our relocation experts will get in touch with you.",
  },
  {
    question: "Do you provide weekend shifting?",
    answer:
      "Yes. Weekend and holiday shifting services are available based on slot availability.",
  },
  {
    question: "Which cities do you serve?",
    answer:
      "We provide relocation services across Bangalore and intercity moving throughout India.",
  },
];

export default function ContactFAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-16 md:py-24 bg-slate-50">

      <div className="max-w-5xl mx-auto px-4 md:px-6">

        <p
          data-aos="fade-up"
          className="text-center uppercase tracking-[4px] text-blue-600 font-bold"
        >
          FAQs
        </p>

        <h2
          data-aos="fade-up"
          className="text-3xl md:text-5xl font-bold text-center mt-4"
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-5 mt-16">

          {faqs.map((faq, index) => (

            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="rounded-2xl bg-white shadow-md border border-gray-200 overflow-hidden"
            >

              <button
                onClick={() => setOpen(open === index ? -1 : index)}
                className="w-full flex justify-between items-center p-6"
              >

                <h3 className="text-lg md:text-xl font-semibold text-left">
                  {faq.question}
                </h3>

                {open === index ? (
                  <Minus />
                ) : (
                  <Plus />
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