import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/ui";
import { SkillChip } from "@/components/SkillChip";
import { skills } from "@/lib/data/skills";

// Accent per category (falls back to the brand accent). Colour only marks
// the card; skill text always stays in ink tokens.
const TONE: Record<string, string> = {
  "Data Engineering": "var(--accent-strong)",
  "Data & BI": "var(--gold)",
  "AI & GenAI": "var(--cool)",
  "Machine Learning": "var(--cool)",
  "Backend & APIs": "var(--ok)",
  Databases: "var(--bronze)",
  Languages: "var(--silver)",
  Frontend: "var(--silver)",
  "Cloud & Tools": "var(--silver)",
};

// The primary discipline gets the wide card.
const WIDE = new Set(["Data Engineering"]);

export function SkillsSection() {
  const ordered = [
    ...skills.filter((g) => WIDE.has(g.category)),
    ...skills.filter((g) => !WIDE.has(g.category)),
  ];

  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          index="03"
          title="Toolkit"
          caption="hover a skill → where I used it"
          description="Grouped by discipline. Hovering (or focusing) a skill lists the internships and projects where it was actually used, pulled straight from the case studies."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((group, i) => {
            const tone = TONE[group.category] ?? "var(--accent-strong)";
            const wide = WIDE.has(group.category);
            return (
              <div
                key={group.category}
                data-reveal=""
                className={`relative rounded-2xl border bg-paper-raised p-5 sm:p-6 ${
                  wide ? "border-accent/40 sm:col-span-2" : "border-border"
                }`}
              >
                <span aria-hidden="true" className="absolute left-6 top-0 h-[3px] w-12 rounded-b-full" style={{ background: tone }} />
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-[11.5px] font-medium uppercase tracking-[0.18em]" style={{ color: tone }}>
                    <span className="mr-2 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    {group.category}
                  </p>
                  <span className="font-mono text-[11px] text-ink-faint">{group.skills.length}</span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border bg-paper-sunken px-3 py-1 transition-colors hover:border-accent/60"
                    >
                      <SkillChip skill={skill} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
