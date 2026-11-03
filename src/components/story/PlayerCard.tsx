"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Container } from "@/components/Container";
import { EmailCopy } from "@/components/EmailCopy";
import { ProtectedPhoto } from "@/components/ProtectedPhoto";
import { SkillChip } from "@/components/SkillChip";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { FileIcon, GitHubIcon, LinkedInIcon, SubstackIcon } from "@/components/icons";
import { experience } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { site } from "@/lib/data/site";
import { skills } from "@/lib/data/skills";

const SIDES = {
  data: {
    label: "Data",
    blurb: "Pipelines, lakehouses and the analytics on top.",
    categories: ["Data Engineering", "Data & BI", "Cloud & Tools"],
  },
  app: {
    label: "App",
    blurb: "Backends, APIs and the interfaces people use.",
    categories: ["Backend & APIs", "Frontend", "Databases"],
  },
} as const;

type Side = keyof typeof SIDES;

/** Counts up to `to` the first time it scrolls into view. */
function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      node.textContent = `${to}${suffix}`;
      return;
    }
    const state = { v: 0 };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        gsap.to(state, {
          v: to,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: () => {
            node.textContent = `${Math.round(state.v)}${suffix}`;
          },
        });
      },
      { threshold: 0.6 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [to, suffix]);

  return (
    <span ref={el}>
      {to}
      {suffix}
    </span>
  );
}

export function PlayerCard() {
  const [side, setSide] = useState<Side>("data");
  const openResume = useResumeModal();
  const current = SIDES[side];
  const loadout = current.categories.flatMap((c) => skills.find((g) => g.category === c)?.skills ?? []);

  const stats = [
    { to: projects.length, suffix: "", label: "Projects shipped" },
    { to: experience.length, suffix: "", label: "Internships" },
    { to: 39, suffix: "", label: "Tests in one pipeline" },
    { to: 250, suffix: "+", label: "Club members led" },
  ];

  return (
    <section id="under-the-hood" className="relative bg-paper py-24 sm:py-32">
      <Container>
        <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-accent-strong" data-reveal="">
          <span>04</span>
          <span className="h-px w-10 bg-accent" />
          <span className="text-ink">Under the hood</span>
        </p>
        <h2 data-reveal="" className="mt-5 max-w-3xl text-[clamp(2.2rem,6vw,4.6rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
          Who&apos;s behind <span className="text-accent-strong">the commits?</span>
        </h2>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,400px)_1fr] lg:gap-14">
          <article data-reveal="" className="relative self-start rounded-[28px] border-[3px] border-ink bg-paper-raised shadow-[10px_10px_0_var(--ink)]">
            <div className="flex items-center justify-between rounded-t-[24px] bg-accent px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-accent-ink">
              <span>Player 1</span>
              <span className="flex items-center gap-2">
                <span className="soft-pulse h-2 w-2 rounded-full bg-ink" />
                Available for work
              </span>
            </div>
            <div className="p-5">
              <ProtectedPhoto
                src="/profilephoto.jpg"
                alt={`Portrait of ${site.name}`}
                className="w-full"
                shapeClassName="aspect-[4/4.4] rounded-2xl"
              />
              <p className="mt-5 text-[2rem] font-black uppercase leading-none tracking-tight text-ink">{site.name}</p>
              <p className="mt-3 font-mono text-[12px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-accent-strong">
                Data engineer
                <br />
                Freelance app developer
              </p>
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                Chennai · B.Tech CSE · VIT · 2027
              </p>
            </div>
          </article>

          <div className="min-w-0">
            <div className="space-y-5 text-[clamp(1rem,0.4vw+0.9rem,1.2rem)] leading-relaxed text-ink-muted" data-reveal="">
              <p>
                <span className="font-semibold text-ink">Professional data engineer.</span> At KaarTech I built a tested PySpark
                pipeline into a Power BI star schema, designed the Medallion architecture for an EV fleet Lakehouse, and shipped
                Sentinel, a pipeline observability app running on a live Databricks workspace.
              </p>
              <p>
                <span className="font-semibold text-ink">Freelance application developer.</span> I build full-stack products
                end to end, from the database and API to the interface: Django, FastAPI, Next.js and React, with the same
                habits I bring to pipelines: tests first, everything observable.
              </p>
              <p>
                Final-year CSE at VIT Chennai, chairperson of the Open Source Programming Club (250+ members), and 1st of 500
                teams at HackHub&apos;25.
              </p>
            </div>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border-2 border-ink bg-ink sm:grid-cols-4" data-reveal="">
              {stats.map((s) => (
                <div key={s.label} className="bg-paper-raised px-5 py-5">
                  <dd className="text-[2.6rem] font-black leading-none tracking-tight text-ink">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-2 font-mono text-[10.5px] font-semibold uppercase leading-snug tracking-[0.14em] text-ink-faint">
                    {s.label}
                  </dt>
                </div>
              ))}
            </dl>

            <div className="mt-10" data-reveal="">
              <div className="flex flex-wrap items-center gap-4">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">Loadout</p>
                <div role="tablist" aria-label="Choose a side" className="inline-flex rounded-full border-2 border-ink p-1">
                  {(Object.keys(SIDES) as Side[]).map((k) => (
                    <button
                      key={k}
                      type="button"
                      role="tab"
                      aria-selected={side === k}
                      onClick={() => setSide(k)}
                      className={`rounded-full px-5 py-1.5 font-mono text-[12px] font-bold uppercase tracking-[0.16em] transition-colors ${
                        side === k ? "bg-ink text-paper" : "text-ink hover:text-accent-strong"
                      }`}
                    >
                      {SIDES[k].label}
                    </button>
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm text-ink-muted">{current.blurb}</p>
              <ul className="mt-4 flex flex-wrap gap-2" role="tabpanel">
                {loadout.map((skill) => (
                  <li key={skill} className="rounded-full border-2 border-ink bg-paper-raised px-3.5 py-1.5">
                    <SkillChip skill={skill} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal="">
              {site.resumeAvailable ? (
                <button
                  type="button"
                  onClick={openResume}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 text-sm font-bold uppercase tracking-wider text-paper transition-colors hover:bg-accent hover:text-accent-ink"
                >
                  <FileIcon size={15} /> Resume
                </button>
              ) : null}
              {[
                { href: site.github, label: "GitHub", icon: <GitHubIcon /> },
                { href: site.linkedin, label: "LinkedIn", icon: <LinkedInIcon size={17} /> },
                { href: site.substack, label: "Substack", icon: <SubstackIcon size={15} /> },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink text-ink transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
                >
                  {l.icon}
                </a>
              ))}
              <EmailCopy email={site.email} className="font-mono text-[13px] text-ink-faint hover:text-accent-strong" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
