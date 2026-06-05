import Navbar from "@/components/Navbar";
import Atmosphere from "@/components/Atmosphere";
import Hero from "@/components/Hero";
import IndiaBand from "@/components/IndiaBand";
import FoodGallery from "@/components/FoodGallery";
import Marquee from "@/components/Marquee";
import MenuSection from "@/components/MenuSection";
import FeastReveal from "@/components/FeastReveal";
import HeatLevels from "@/components/HeatLevels";
import WhyBombay from "@/components/WhyBombay";
import Experience from "@/components/Experience";
import Reviews from "@/components/Reviews";
import AppCta from "@/components/AppCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main id="top" className="relative">
      <Atmosphere />
      <Navbar />
      <Hero />
      <IndiaBand />
      <FoodGallery />
      <Marquee />
      <MenuSection />
      <FeastReveal />
      <HeatLevels />
      <WhyBombay />
      <Experience />
      <Reviews />
      <AppCta />
      <Footer />
    </main>
  );
}
