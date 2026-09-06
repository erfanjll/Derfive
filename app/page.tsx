import { Hero } from "@/components/home/Hero";
import { GameSection } from "@/components/home/GameSection";
import { MotionSection } from "@/components/home/MotionSection";
import { JourneyPreview } from "@/components/home/JourneyPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

/** Homepage: hero → featured games → featured motion → journey milestone preview → contact. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <GameSection />
      <MotionSection />
      <JourneyPreview />
      <ContactCTA />
    </>
  );
}
