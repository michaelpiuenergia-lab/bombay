import Intro from "@/components/Intro";
import Navbar from "@/components/Navbar";
import Atmosphere from "@/components/Atmosphere";
import Hero from "@/components/Hero";
import IndiaBand from "@/components/IndiaBand";
import FoodGallery from "@/components/FoodGallery";
import Marquee from "@/components/Marquee";
import MenuSection from "@/components/MenuSection";
import HalalReel from "@/components/HalalReel";
import HeatLevels from "@/components/HeatLevels";
import WhyBombay from "@/components/WhyBombay";
import Experience from "@/components/Experience";
import Reviews from "@/components/Reviews";
import AppCta from "@/components/AppCta";
import Footer from "@/components/Footer";
import { fetchGestionaleMenu } from "@/lib/gestionale";

export default async function Home() {
  // Menu vivo dal gestionale (fonte di verità, cache 5 min). Se il fetch
  // fallisce torna null e MenuSection usa il fallback hardcoded di lib/data.
  const remoteMenu = await fetchGestionaleMenu();
  return (
    <main id="top" className="relative">
      <Intro />
      <Atmosphere />
      <Navbar />
      <Hero />
      <IndiaBand />
      <FoodGallery />
      <Marquee />
      <MenuSection items={remoteMenu ?? undefined} />
      <HalalReel />
      <HeatLevels />
      <WhyBombay />
      <Experience />
      <Reviews />
      <AppCta />
      <Footer />
    </main>
  );
}
