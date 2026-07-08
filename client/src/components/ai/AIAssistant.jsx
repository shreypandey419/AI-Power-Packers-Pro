import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Mic, Send, X } from "lucide-react";

import { askGemini } from "../../services/geminiService";
import useAI from "../../hooks/useAI";

export default function AIAssistant() {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    const { setBookingData, setConfirmBooking, } = useAI();

    const [input, setInput] = useState("");

    const [messages, setMessages] = useState([
    {
        sender: "ai",
        text: "👋 Hello! I'm PackersPro AI.\nHow can I help you today?",
    },
    ]);
    const recognitionRef = useRef(null);
    const messagesEndRef = useRef(null);

    const [listening, setListening] = useState(false);

    const addMessage = useCallback((sender, text) => {
        setMessages((prev) => [
            ...prev,
            {
            sender,
            text,
            },
        ]);
    } , []);

    const speak = useCallback((text) => {
        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(text);

        speech.lang = "en-IN";

        speech.rate = 1;

        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
    }, []);

    const executeNavigation = useCallback((command) => {

        if (
          command.includes("go home") ||
          command.includes("open home") ||
          command.includes("home page")
        ) {
          navigate("/");
          return "🏠 Opening Home Page...";
        }

        if (
          command.includes("open about") ||
          command.includes("about page") ||
          command.includes("go to about") ||
          command.includes("show about")
        ) {
          navigate("/about");
          return "📄 Opening About Page...";
        }

        if (
          command.includes("open services") ||
          command.includes("go to services") ||
          command.includes("services page") ||
          command.includes("show services")
        ) {
          navigate("/services");
          return "🚚 Opening Services...";
        }

        if (
          command.includes("open contact") ||
          command.includes("contact page") ||
          command.includes("go to contact") ||
          command.includes("show contact")
        ) {
          navigate("/contact");
          return "📞 Opening Contact Page...";
        }

        if (command.includes("profile")) {
            navigate("/profile");
            return "👤 Opening Profile...";
        }

        if (
            command.includes("booking") ||
            command.includes("my booking")
        ) {
            navigate("/my-bookings");
            return "📦 Opening My Bookings...";
        }

        if (command.includes("book move")) {
            navigate("/book-move");
            return "🚛 Opening Book Move...";
        }

        return null;
    }, [navigate]);


    const sendMessage = useCallback(async (message) => {

      const text =
        typeof message === "string"
          ? message
          : input;

      if (!text.trim()) return;

      addMessage("user", text);

        setInput("");

      const command = text.toLowerCase();

        if (
          command === "yes" ||
          command === "confirm booking" ||
          command === "book it" ||
          command === "confirm" ||
          command === "yes please"
        ) {
          setConfirmBooking(true);

          addMessage(
            "ai",
            "✅ Booking confirmed. Creating your booking..."
          );

          speak("Creating your booking.");

          return;
        }

        const navigationReply = executeNavigation(command);

        if (navigationReply) {
            addMessage("ai", navigationReply);
            speak(navigationReply);
            return;
        }

        try {

            // Thinking message show karo
            setMessages(prev => [
                ...prev,
                {
                    sender: "ai",
                    typing: true,
                },
            ]);

            const reply = await askGemini(text);

            // Check if Gemini returned booking JSON
            try {

              const cleanReply = reply
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

              const booking = JSON.parse(cleanReply);

              let date = booking.shiftingDate || "";

              // Convert date if Gemini didn't return YYYY-MM-DD
              if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
                const parsed = new Date(date);

                const formatDate = (dateString) => {
                const d = new Date(dateString);

                if (isNaN(d)) return "";

                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, "0");
                const day = String(d.getDate()).padStart(2, "0");

                return `${year}-${month}-${day}`;
              };

                if (!isNaN(parsed)) {
                  date = formatDate(date);
                } else {
                  date = "";
                }
              }

              if (booking.intent === "booking") {

                setBookingData({
                  movingFrom: booking.movingFrom || "",
                  movingTo: booking.movingTo || "",
                  houseType: booking.houseType || "1 BHK",
                  packing: booking.packing || false,
                  insurance: booking.insurance || false,
                  shiftingDate: date,
                });

                navigate("/book-move");

                addMessage(
                  "ai",
                  "🚛 Great! I've filled your booking details.\n\nSay 'Confirm Booking' or type 'Yes' to create your booking."
                );

                speak("Opening booking page. Say confirm booking when you are ready.");

                return;
              }

            } catch (err) {
              console.log("Not a booking JSON:", err);
            }

            // Thinking message hatao aur normal reply dikhao
            setMessages((prev) => [
              ...prev.slice(0, -1),
              {
                sender: "ai",
                text: reply,
              },
            ]);

            speak(reply);

          } catch (err) {
            console.log(err);

            addMessage(
              "ai",
              "Sorry, something went wrong."
            );

          } finally {
            // setLoading(false);
          }
        }, [
          input,
          navigate,
          setBookingData,
          setConfirmBooking,
          executeNavigation,
          speak,
          addMessage,
          ]);

    useEffect(() => {
      const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        console.log("Speech Recognition not supported");
        return;
      }

      const recognition = new SpeechRecognition();

      recognition.lang = "en-IN";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;

        sendMessage(text);
      };

      recognition.onerror = (event) => {
        console.log("Speech Error:", event.error);

        setListening(false);
      };

      recognitionRef.current = recognition;

      return () => {
        recognitionRef.current?.stop();
      };

    }, [sendMessage]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, [messages]);

    const startVoice = () => {
      if (!recognitionRef.current) return;

      recognitionRef.current.start();
    };

    const stopVoice = () => {
      recognitionRef.current?.stop();
    };

  return (
    <>
      {/* Floating Button */}

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -8, 0],
          scale: [1, 1.05, 1],
        }}

        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 left-6 w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl z-[9999] flex items-center justify-center"
      >
        <motion.div
          animate={{
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Bot size={30} />
        </motion.div>
      </motion.button>

      {/* AI Window */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.9,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: 60,
              scale: 0.9,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 22,
            }}
            className="fixed bottom-24 left-6 w-[370px] max-w-[95vw] bg-white rounded-3xl shadow-2xl overflow-hidden z-[9999]"
          >

            {/* Header */}

            <div className="bg-blue-600 text-white p-5 flex justify-between items-center">

              <div className="flex items-center gap-3">

                <Bot />

                <div>

                  <h2 className="font-bold">
                    PackersPro AI
                  </h2>

                  <p className="text-xs opacity-80">
                    Voice Assistant
                  </p>

                </div>

              </div>

              <button
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

            </div>

            {/* Messages */}

            <div className="h-80 overflow-y-auto p-5 bg-gray-50">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`mb-4 ${
                    msg.sender === "ai"
                      ? "text-left"
                      : "text-right"
                  }`}
                >

                  <div
                    className={`inline-block px-4 py-3 rounded-2xl ${
                      msg.sender === "ai"
                        ? "bg-blue-100"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {msg.typing ? (
                      <div className="flex gap-1 items-center">
                          <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></span>
                          <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:150ms]"></span>
                          <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce [animation-delay:300ms]"></span>
                      </div>
                  ) : (
                      msg.text
                  )}
                  </div>

                </div>

              ))}

              <div ref={messagesEndRef}></div>

            </div>

            {/* Bottom */}

            <div className="p-4 border-t flex gap-3">

              <button
                    onClick={() => {
                      if (listening) {
                        stopVoice();
                      } else {
                        startVoice();
                      }
                    }}
                    className={`w-12 h-12 rounded-full flex justify-center items-center text-white ${
                        listening
                        ? "bg-red-600 animate-pulse"
                        : "bg-blue-600"
                    }`}
                    >
                    <Mic />
                </button>

                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        sendMessage();
                    }
                    }}
                    placeholder="Ask anything..."
                    className="flex-1 border rounded-xl px-4"
                />

                <button
                    onClick={sendMessage}
                    className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center">
                        <Send />
                </button>

            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </>
  );
}