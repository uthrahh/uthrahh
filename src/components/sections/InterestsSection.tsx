import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/ui";
import { interests, languages } from "@/lib/data/profile";

export function InterestsSection() {
  return (
    <Section id="about">
      <Container>
        <SectionHeading index="05" title="Beyond the pipeline" caption="echo $WHY" />

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.6fr_1fr]">
          <div id="interests" data-reveal="" className="relative overflow-hidden rounded-2xl border border-border bg-paper-raised p-6 sm:p-8">
            <div aria-hidden="true" className="accent-glow pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full" />
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-strong">
              What I&apos;m curious about
            </p>
            <p className="relative mt-4 text-[15.5px] leading-relaxed text-ink-muted">{interests}</p>
          </div>

          <div id="languages" data-reveal="" className="rounded-2xl border border-border bg-paper-raised p-6 sm:p-8">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-strong">
              Languages I speak
            </p>
            <ul className="mt-5 space-y-4">
              {languages.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0">
                  <span className="text-[15px] font-semibold text-ink">{l.name}</span>
                  {l.proficiency ? (
                    <span className="text-right font-mono text-[11px] text-ink-faint">{l.proficiency}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
