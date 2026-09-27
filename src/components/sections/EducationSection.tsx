import { Container } from "@/components/Container";
import { Section, SectionHeading } from "@/components/ui";
import { MediaFrame } from "@/components/MediaFrame";
import { HackathonAchievement } from "@/components/HackathonAchievement";
import { education, certifications } from "@/lib/data/education";
import { hackathons } from "@/lib/data/leadership";
import type { ActivityItem } from "@/lib/types";

const LABEL_CLASS = "mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent-strong";

function ActivityListItem({ item }: { item: ActivityItem }) {
  if (!item.history?.length) {
    return <li className="text-sm leading-relaxed text-ink-muted">{item.label}</li>;
  }

  return (
    <li>
      <details className="group">
        <summary className="flex cursor-pointer list-none items-baseline gap-2 text-sm leading-relaxed text-ink-muted marker:content-none hover:text-ink [&::-webkit-details-marker]:hidden">
          <span className="flex-1">{item.label}</span>
          <span className="shrink-0 font-mono text-[10px] text-ink-faint transition-transform group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="mt-3 mb-1 space-y-4 border-l border-border pl-4">
          {item.history.map((role) => (
            <div key={`${role.role}-${role.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <span className="text-sm font-medium text-ink">{role.role}</span>
                {role.start || role.end ? (
                  <span className="font-mono text-[11px] text-ink-faint">
                    {role.start ? `${role.start} – ${role.end}` : role.end}
                  </span>
                ) : null}
              </div>
              {role.detail?.length ? (
                <ul className="mt-1.5 space-y-1">
                  {role.detail.map((d, i) => (
                    <li key={i} className="text-[13px] leading-relaxed text-ink-muted">
                      {d}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </details>
    </li>
  );
}

function EducationBoxHeader({
  name,
  url,
  meta,
}: {
  name: string;
  url?: string;
  meta: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3">
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold tracking-tight text-ink underline-offset-4 hover:text-accent-strong hover:underline sm:text-2xl"
        >
          {name}
        </a>
      ) : (
        <p className="text-xl font-bold tracking-tight text-ink sm:text-2xl">{name}</p>
      )}
      <span className="rounded-full border border-border bg-paper-sunken px-3 py-1 font-mono text-xs text-ink-muted">{meta}</span>
    </div>
  );
}

export function EducationSection() {
  const university = education[0];
  const school = education[1];

  return (
    <Section id="education" className="border-y border-border bg-paper-sunken/40">
      <Container>
        <SectionHeading index="04" title="Education" caption="VIT Chennai, class of 2027" />

        <div className="mt-10 space-y-5">
          {/* University */}
          {university ? (
            <div data-reveal="" className="rounded-2xl border border-border bg-paper-raised p-6 sm:p-8">
              <EducationBoxHeader
                name={university.institution}
                url={university.institutionUrl}
                meta={
                  university.start ? `${university.start} – ${university.end}` : university.end
                }
              />
              {university.degree ? (
                <p className="mt-1.5 text-sm font-medium text-ink-muted">{university.degree}</p>
              ) : null}

              {/* Row 1: Activities & Societies | Achievements */}
              <div className="mt-5 grid gap-x-10 gap-y-7 lg:grid-cols-2">
                <div>
                  <p className={LABEL_CLASS}>Activities &amp; Societies</p>
                  <ul className="space-y-2.5">
                    {university.activities.map((item) => (
                      <ActivityListItem key={item.label} item={item} />
                    ))}
                  </ul>
                </div>

                <div>
                  <p className={LABEL_CLASS}>Achievements</p>
                  <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border">
                    {hackathons.map((h) => (
                      <HackathonAchievement key={h.name} hackathon={h} />
                    ))}
                  </ul>
                </div>
              </div>

              {/* Row 2: Relevant Coursework, full width */}
              {university.coursework.length ? (
                <div className="mt-7 border-t border-border pt-5">
                  <p className={LABEL_CLASS}>Relevant Coursework</p>
                  <p className="text-sm leading-relaxed text-ink-muted">
                    {university.coursework.join(" · ")}
                  </p>
                </div>
              ) : null}

              {/* Photos: reserved row, placeholders until real photos are added */}
              {university.photos?.length ? (
                <div className="mt-7 border-t border-border pt-5">
                  <p className={LABEL_CLASS}>Photos</p>
                  <div className="flex gap-3 overflow-x-auto sm:grid sm:grid-cols-4 sm:overflow-visible">
                    {university.photos.map((photo, i) => (
                      <MediaFrame
                        key={i}
                        asset={photo}
                        className="w-28 shrink-0 sm:w-auto sm:shrink"
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {/* School */}
          {school ? (
            <div data-reveal="" className="rounded-2xl border border-border bg-paper-raised p-6 sm:p-8">
              <EducationBoxHeader
                name={school.institution}
                url={school.institutionUrl}
                meta={school.end}
              />

              <div className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {school.levels ? (
                  <div>
                    <p className={LABEL_CLASS}>Academics</p>
                    <div className="grid grid-cols-2 gap-3">
                      {school.levels.map((lvl) => (
                        <p key={lvl.grade} className="text-sm text-ink">
                          <span className="font-medium">{lvl.grade}</span>
                          <span className="text-ink-muted"> · {lvl.board}</span>
                          {lvl.result ? <span className="text-ink-muted"> · {lvl.result}</span> : null}
                        </p>
                      ))}
                    </div>
                  </div>
                ) : null}

                {school.activities.length ? (
                  <div>
                    <p className={LABEL_CLASS}>Activities</p>
                    <ul className="space-y-2">
                      {school.activities.map((a) => (
                        <li key={a.label} className="text-sm leading-relaxed text-ink-muted">
                          {a.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}

          {/* Certifications */}
          <div data-reveal="" className="rounded-2xl border border-border bg-paper-raised p-6 sm:p-8">
            <p className="text-xl font-bold tracking-tight text-ink sm:text-2xl">Certifications</p>
            <div className="mt-3 space-y-3">
              {certifications.map((c) => (
                <p key={c.name} className="text-[14px] leading-relaxed text-ink-muted">
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent-strong hover:text-accent"
                    >
                      {c.name}
                    </a>
                  ) : (
                    <span className="font-medium text-ink">{c.name}</span>
                  )}
                  {c.issuer ? <> {"— "}{c.issuer}</> : null}
                  {c.date ? <span className="text-ink-faint"> · {c.date}</span> : null}
                </p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
