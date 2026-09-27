import { HomeSection } from "@/components/sections/HomeSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { InterestsSection } from "@/components/sections/InterestsSection";
import { ContactSection } from "@/components/sections/ContactSection";
// import { ArticlesSection } from "@/components/sections/ArticlesSection";

// Languages now render inside the "Beyond the pipeline" section
// (InterestsSection) under the #languages anchor.
export default function Home() {
  return (
    <>
      <HomeSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <InterestsSection />
      {/* <ArticlesSection /> */}
      <ContactSection />
    </>
  );
}
