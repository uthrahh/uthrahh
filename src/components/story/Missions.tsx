"use client";

import { useState } from "react";
import { Container } from "@/components/Container";
import { SkillChip } from "@/components/SkillChip";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { ArrowUpRight } from "@/components/icons";
import { getProject } from "@/lib/data/projects";
import { site } from "@/lib/data/site";
import { shortTitle } from "@/lib/projectOrder";

const MISSIONS = [
  {
    n: "01",
    title: "Data pipelines",
    side: "Data",
    blurb:
      "Lakehouse and ETL builds: Medallion layers, PySpark transforms, Delta tables, data-quality checks, and tests that keep them honest.",
    loadout: ["PySpark", "Databricks", "Delta Lake", "Unity Catalog", "SQL"],
    built: ["data-pipeline-sentinel", "reckitt-sales-analytics-pipeline", "ev-fleet-lakehouse-platform"],
  },
  {
    n: "02",
    title: "Analytics & BI",
    side: "Data",
    blurb: "Star schemas and dashboards that business teams actually read, built on data they can trust.",
    loadout: ["Power BI", "DAX", "SQL", "Star schema / dimensional modeling"],
    built: ["reckitt-sales-analytics-pipeline"],
  },
  {
    n: "03",
    title: "Web & applications",
    side: "App",
    blurb:
      "Freelance product builds: role-based platforms, dashboards and SaaS, from the database and API to the interface.",
    loadout: ["Next.js", "React", "TypeScript", "Django", "FastAPI", "PostgreSQL"],
    built: ["abov-hr", "women360", "task-goal-tracker", "last-mile-delivery-tracker"],
  },
  {
    n: "04",
    title: "Automation & AI",
    side: "App",
    blurb: "LLM extraction, workflow automation, and ML-backed tools that take manual work off people's plates.",
    loadout: ["Python", "FastAPI", "OpenAI / Gemini APIs", "LLM prompt engineering"],
    built: ["aic-worklog-automation", "autcore"],
  },
] as const;

export function Missions() {
  const [active, setActive] = useState(0);
  const openProject = useProjectModal();
  const m = MISSIONS[active];
  const subject = encodeURIComponent(`Mission: ${m.title}`);
  const body = encodeURIComponent(
    `Hi Pavithra,\n\nI'd like to talk about: ${m.title}.\n\nWhat I'm working on:\n\n`
  );

  return (
    <section id="missions" className="night relative bg-paper py-24 sm:py-32">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-amber" data-reveal="">
          <span>05</span>
          <span className="h-px w-10 bg-accent" />
          <span className="text-ink">Missions</span>
        </p>
        <h2 data-reveal="" className="mt-5 text-[clamp(2.2rem,6vw,4.6rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
          Choose your <span className="text-accent">mission.</span>
        </h2>
        <p data-reveal="" className="mt-5 max-w-xl text-ink-muted">
          Four kinds of work. Pick one and the email opens with it already written.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,380px)_1fr]">
          <div role="tablist" aria-label="Missions" className="flex flex-col gap-3" data-reveal="">
            {MISSIONS.map((x, i) => (
              <button
                key={x.n}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-controls="mission-panel"
                onClick={() => setActive(i)}
                className={`group flex items-center gap-5 rounded-2xl border-2 px-5 py-4 text-left transition-all ${
                  i === active
                    ? "border-accent bg-accent text-accent-ink"
                    : "border-border-strong text-ink hover:border-accent hover:text-accent"
                }`}
              >
                <span className="font-mono text-[13px] font-bold">{x.n}</span>
                <span className="flex-1 text-[1.15rem] font-black uppercase tracking-tight">{x.title}</span>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">{x.side}</span>
              </button>
            ))}
          </div>

          <div
            id="mission-panel"
            role="tabpanel"
            key={m.n}
            className="mission-panel rounded-3xl border-2 border-border-strong bg-paper-raised p-7 sm:p-9"
          >
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-amber">
              {m.n} · Mission selected
            </p>
            <h3 className="mt-3 text-[clamp(1.8rem,3.4vw,2.8rem)] font-black uppercase leading-none tracking-tight text-ink">
              {m.title}
            </h3>
            <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-muted">{m.blurb}</p>

            <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">Loadout</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {m.loadout.map((s) => (
                <li key={s} className="rounded-full border border-border-strong px-3.5 py-1.5">
                  <SkillChip skill={s} />
                </li>
              ))}
            </ul>

            <p className="mt-8 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">
              Built with it
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {m.built.map((slug) => {
                const p = getProject(slug);
                if (!p) return null;
                return (
                  <li key={slug}>
                    <button
                      type="button"
                      onClick={() => openProject(slug)}
                      className="inline-flex items-center gap-2 rounded-full bg-night-3 px-4 py-2 text-sm font-bold uppercase tracking-tight text-[#f4f1ea] transition-colors hover:bg-accent hover:text-accent-ink"
                    >
                      {shortTitle(p)}
                      <ArrowUpRight size={13} />
                    </button>
                  </li>
                );
              })}
            </ul>

            <a
              href={`mailto:${site.email}?subject=${subject}&body=${body}`}
              className="mt-10 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-black uppercase tracking-wider text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              Choose this mission
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
