
import Hero from "../components/home/Hero";

import Stats from "../components/home/Stats";

import HowItWorks from "../components/home/HowItWorks";

import Services from "../components/home/Services";

import WhyChooseUs from "../components/home/WhyChooseUs";

import Testimonials from "../components/home/Testimonials";

import Gallery from "../components/home/Gallery";

import Pricing from "../components/home/Pricing";

import QuoteForm from "../components/forms/QuoteForm";

import SEOContent from "../components/common/SEOContent";

import ServiceAreas from "../components/home/ServiceAreas";

import FloatingButtons from "../components/common/FloatingButtons";

import FAQ from "../components/home/FAQ";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
      document.title = "Book Move | PackersPro";
    }, []);
  return (
        <>
          <Hero />

          <HowItWorks />

          <Services />

          <WhyChooseUs />

          <Stats />

          <Pricing />

          <Testimonials />

          <Gallery />

          <QuoteForm />

          <FAQ />

          <ServiceAreas />

          <SEOContent />

          <FloatingButtons />
        </>
  );
}