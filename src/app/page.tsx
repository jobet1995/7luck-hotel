import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import RoomsSection from "@/components/RoomsSection";
import AmenitiesSection from "@/components/AmenitiesSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import ChatWidgetWrapper from "@/components/widgets/ChatWidgetWrapper";

export default function Home() {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      suppressHydrationWarning={true}
    >
      <div className="relative" suppressHydrationWarning={true}>
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <AmenitiesSection />
        <GallerySection />
        <ContactSection />
      </div>
      <ChatWidgetWrapper />
    </div>
  );
}
