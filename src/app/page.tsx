import { Story } from "@/components/story/Story";
import { Street } from "@/components/story/Street";
import { Pipeline } from "@/components/story/Pipeline";
import { PlayerCard } from "@/components/story/PlayerCard";
import { Missions } from "@/components/story/Missions";
import { Finale } from "@/components/story/Finale";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { InterestsSection } from "@/components/sections/InterestsSection";

// One scroll, six chapters: the story, the street (projects), the pipeline
// (skills), under the hood (about, experience, education), missions, contact.
export default function Home() {
  return (
    <>
      <Story />
      <Street />
      <Pipeline />
      <div id="chapter-about">
        <PlayerCard />
        <ExperienceSection />
        <EducationSection />
        <InterestsSection />
      </div>
      <Missions />
      <Finale />
    </>
  );
}
