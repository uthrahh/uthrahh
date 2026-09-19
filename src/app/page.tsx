import { HomeSection } from "@/components/sections/HomeSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { InterestsSection } from "@/components/sections/InterestsSection";
// import { ArticlesSection } from "@/components/sections/ArticlesSection";
import { LanguagesSection } from "@/components/sections/LanguagesSection";

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
      <LanguagesSection />
    </>
  );
}
