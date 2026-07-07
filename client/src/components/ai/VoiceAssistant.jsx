import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic, MicOff } from "lucide-react";

export default function VoiceAssistant() {
  const navigate = useNavigate();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const speak = (text) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-IN";
    utterance.rate = 1;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
  };

  const executeCommand = (text) => {
    const command = text.toLowerCase();

    console.log("Voice Command:", command);

    if (
      command.includes("home") ||
      command.includes("ghar")
    ) {
      speak("Opening Home");
      navigate("/");
    }

    else if (
      command.includes("service") ||
      command.includes("services")
    ) {
      speak("Opening Services");
      navigate("/services");
    }

    else if (
      command.includes("contact") ||
      command.includes("sampark")
    ) {
      speak("Opening Contact");
      navigate("/contact");
    }

    else if (
      command.includes("about")
    ) {
      speak("Opening About Page");
      navigate("/about");
    }

    else if (
      command.includes("book") ||
      command.includes("booking")
    ) {
      speak("Opening Book Move");
      navigate("/book-move");
    }

    else if (
      command.includes("my booking") ||
      command.includes("meri booking")
    ) {
      speak("Opening My Bookings");
      navigate("/my-bookings");
    }

    else if (
      command.includes("profile") ||
      command.includes("mera profile")
    ) {
      speak("Opening Profile");
      navigate("/profile");
    }

    else if (
      command.includes("admin")
    ) {
      speak("Opening Admin Login");
      navigate("/admin/login");
    }

    else if (
      command.includes("login")
    ) {
      speak("Opening Login");
      navigate("/signin");
    }

    else if (
      command.includes("signup") ||
      command.includes("register")
    ) {
      speak("Opening Signup");
      navigate("/signup");
    }

    else {
      speak("Sorry, I could not understand your command.");
    }
  };

  const startListening = () => {
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: false,
      language: "en-IN",
    });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();

    setTimeout(() => {
      if (transcript.trim()) {
        executeCommand(transcript);
      }

      resetTranscript();
    }, 500);
  };

  return (
    <button
      onMouseDown={startListening}
      onMouseUp={stopListening}
      onTouchStart={startListening}
      onTouchEnd={stopListening}
      className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl flex items-center justify-center transition hover:scale-110"
    >
      {listening ? (
        <MicOff size={28} />
      ) : (
        <Mic size={28} />
      )}
    </button>
  );
}