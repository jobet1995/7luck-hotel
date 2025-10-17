import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoomsSection from "@/components/RoomsSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="relative">
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <AmenitiesSection />
        <GallerySection />
        <ContactSection />
      </div>
    </div>
  );
}
