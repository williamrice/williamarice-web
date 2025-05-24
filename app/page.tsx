import JumboTron from "@/components/JumboTron";
import FeaturedProjects from "@/components/FeaturedProjects";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full text-center">
      <JumboTron />
      <SkillsSection />
      <AboutSection />
      <CallToAction />
      <FeaturedProjects />
    </div>
  );
}
