import { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaArrowUp,
} from "react-icons/fa";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-5">

      <a
        href="tel:+919999999999"
        title="Call Us"
        className="group w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl hover:shadow-blue-500/40 hover:scale-110 transition-all duration-300 animate-bounce"
      >
        <FaPhoneAlt className="text-lg group-hover:rotate-12 transition-transform" />
      </a>

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noreferrer"
        title="Chat on WhatsApp"
        className="group w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-xl hover:shadow-green-500/40 hover:scale-110 transition-all duration-300 animate-bounce"
      >
        <FaWhatsapp className="text-xl group-hover:scale-110 transition-transform" />
      </a>

      {showTop && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          title="Back to Top"
          className="group w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-xl hover:bg-black hover:scale-110 transition-all duration-300"
        >
          <FaArrowUp className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

    </div>
  );
}