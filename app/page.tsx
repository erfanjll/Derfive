import { Hero } from "@/components/home/Hero";
import { IntroStatement } from "@/components/home/IntroStatement";
import { GameSection } from "@/components/home/GameSection";
import { MotionSection } from "@/components/home/MotionSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { JourneyPreview } from "@/components/home/JourneyPreview";
import { ContactCTA } from "@/components/home/ContactCTA";

/** Homepage: intro → curiosity → games → motion → projects → journey → contact. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <GameSection />
      <MotionSection />
      <FeaturedProjects />
      <JourneyPreview />
      <ContactCTA />
    </>
  );
}
