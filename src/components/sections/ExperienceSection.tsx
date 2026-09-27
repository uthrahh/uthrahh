import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/ui";
import { ExperienceEntry } from "@/components/ExperienceEntry";
import { MediaFrame } from "@/components/MediaFrame";
import { experience } from "@/lib/data/experience";
import { communitySocial } from "@/lib/data/leadership";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <Container>
        <SectionHeading index="01" title="Experience" caption="where I've shipped" />

        <div className="relative mt-12">
          {/* timeline rail, aligned with the centre of the org marks */}
          <span aria-hidden="true" className="absolute bottom-4 left-6 top-4 w-px bg-border" />
          <ol className="relative space-y-14">
            {experience.map((exp) => (
              <ExperienceEntry key={exp.org} exp={exp} />
            ))}
          </ol>
        </div>

        {/* Volunteer work: kept distinct from the formal internships above. */}
        {communitySocial.length ? (
          <div className="mt-16" data-reveal="">
            <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint">
              Volunteering
            </p>
            <div className="space-y-4">
              {communitySocial.map((item) => (
                <div
                  key={item.org}
                  className="flex flex-col gap-5 rounded-2xl border border-border bg-paper-raised p-5 sm:flex-row sm:items-center sm:p-6"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold tracking-tight text-ink">
                      {item.role}{" "}
                      <span className="font-normal text-ink-faint">@</span>{" "}
                      {item.orgUrl ? (
                        <a
                          href={item.orgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent-strong underline-offset-4 hover:underline"
                        >
                          {item.org}
                        </a>
                      ) : (
                        item.org
                      )}
                    </h3>
                    <p className="mt-1 font-mono text-[11.5px] uppercase tracking-wider text-ink-faint">
                      Volunteer · {item.start} – {item.end}
                    </p>
                    {item.detail?.length ? (
                      <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{item.detail[0]}</p>
                    ) : null}
                  </div>
                  {item.photo ? (
                    <MediaFrame asset={item.photo} className="w-full shrink-0 overflow-hidden rounded-xl sm:w-48" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
