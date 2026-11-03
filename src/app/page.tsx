import { Story } from "@/components/story/Story";
import { Book } from "@/components/story/Book";
import { SkillsLamp } from "@/components/story/SkillsLamp";
import { Marquee } from "@/components/story/Marquee";
import { Manifesto } from "@/components/story/Manifesto";
import { PlayerCard } from "@/components/story/PlayerCard";
import { Missions } from "@/components/story/Missions";
import { Finale } from "@/components/story/Finale";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { InterestsSection } from "@/components/sections/InterestsSection";

// One scroll, six chapters: the story, the project book, the skills lamp,
// under the hood (about, experience, education), work with me, contact.
export default function Home() {
  return (
    <>
      <Story />
      <Book />
      <SkillsLamp />
      <Marquee words={["Data", "Apps", "Pipelines", "Products"]} />
      <div id="chapter-about">
        <Manifesto />
        <PlayerCard />
        <ExperienceSection />
        <EducationSection />
        <InterestsSection />
      </div>
      <Marquee words={["Hire me", "Build with me", "Ship it"]} tone="night" reverse />
      <Missions />
      <Finale />
    </>
  );
}
