import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { StrictMode } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "@fontsource/poppins";
import { HelmetProvider } from "react-helmet-async";
import AIProvider from "./context/AIProvider";

AOS.init({
  duration: 1000,
  once: true,
  easing: "ease-in-out",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>

        <AIProvider>
          <App />
        </AIProvider>

        <Toaster position="top-right" />

      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);