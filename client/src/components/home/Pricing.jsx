import { Check } from "lucide-react";

const plans = [
  {
    title: "Local Shifting",
    price: "₹2,999",
    badge: false,
    features: [
      "1 BHK House Shifting",
      "Packing Included",
      "Loading & Unloading",
      "Transport Vehicle",
      "Basic Insurance",
    ],
  },
  {
    title: "Standard Move",
    price: "₹5,999",
    badge: true,
    features: [
      "2-3 BHK Shifting",
      "Premium Packing",
      "Furniture Dismantling",
      "Loading & Unloading",
      "Transit Insurance",
      "GPS Tracking",
    ],
  },
  {
    title: "Office Relocation",
    price: "Custom",
    badge: false,
    features: [
      "Office Moving",
      "IT Equipment Handling",
      "Weekend Shifting",
      "Dedicated Manager",
      "Priority Support",
    ],
  },
];

export default function Pricing() {
  const scrollToQuote = () => {
  const section = document.getElementById("quote");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const input = section.querySelector("input");

    setTimeout(() => {
      input?.focus();
    }, 700);
  }
};

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">

        <p
          className="text-center text-blue-600 uppercase tracking-[4px] font-bold"
          data-aos="fade-up"
        >
          Pricing Plans
        </p>

        <h2
          className="text-5xl font-bold text-center mt-3"
          data-aos="fade-up"
        >
          Affordable Moving Packages
        </h2>

        <p
          className="text-xl text-gray-500 text-center mt-5 max-w-3xl mx-auto leading-9"
          data-aos="fade-up"
        >
          Transparent pricing with no hidden charges. Choose the package
          that suits your relocation needs.
        </p>

        <div className="grid lg:grid-cols-3 gap-10 mt-20">

          {plans.map((plan, index) => (

            <div
              key={index}
              data-aos="zoom-in-up"
              data-aos-delay={index * 150}
              className={`relative flex flex-col rounded-3xl bg-white p-10 shadow-xl border transition-all duration-500 hover:-translate-y-4 hover:scale-[1.02] hover:shadow-2xl ${
                plan.badge
                  ? "border-blue-600 scale-105"
                  : "border-gray-100"
              }`}
            >

              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-xl shadow-blue-500/40">
                  ⭐ Most Popular
                </div>
              )}

              <h3 className="text-3xl font-bold text-center">
                {plan.title}
              </h3>

              <h1 className="text-5xl font-extrabold text-center text-blue-600 mt-6">
                {plan.price}
              </h1>

              <div className="space-y-5 mt-10">

                {plan.features.map((feature, i) => (

                  <div
                    key={i}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Check
                        size={18}
                        className="text-green-600"
                      />
                    </div>

                    <span className="text-gray-700">
                      {feature}
                    </span>
                  </div>

                ))}

              </div>

              <div className="flex-grow"></div>

              <button
  type="button"
  onClick={scrollToQuote}
  className={`mt-12 w-full py-4 rounded-xl text-lg font-semibold transition-all duration-300 ${
    plan.badge
      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl hover:from-indigo-600 hover:to-blue-600 hover:shadow-blue-500/30"
      : "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
  }`}
>
  Get Free Quote
</button>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}