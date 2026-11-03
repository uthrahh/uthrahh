"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/Container";
import { Mask } from "@/components/ui";
import { SkillChip } from "@/components/SkillChip";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { ArrowUpRight, FileIcon } from "@/components/icons";
import { getProject } from "@/lib/data/projects";
import { site } from "@/lib/data/site";
import { shortTitle } from "@/lib/projectOrder";

type Audience = "hire" | "build";

const SERVICES = [
  {
    id: "pipelines",
    title: "Data pipelines",
    outcome: "Messy source data in, tested tables your team trusts out.",
    gets: [
      "A pipeline on Databricks or plain PySpark, with automated tests",
      "Bronze, Silver and Gold layers, so every number is traceable",
      "Data-quality checks that fail loudly instead of silently",
    ],
    fit: "You have data in spreadsheets, exports or several systems and no single reliable source.",
    stack: ["PySpark", "Databricks", "Delta Lake", "SQL"],
    proof: ["data-pipeline-sentinel", "reckitt-sales-analytics-pipeline", "ev-fleet-lakehouse-platform"],
  },
  {
    id: "bi",
    title: "Dashboards & reporting",
    outcome: "Numbers your team can read, built on a clean model underneath.",
    gets: [
      "A Power BI model (star schema) and the dashboards on top",
      "Metrics defined once, so reports stop disagreeing",
      "A short walkthrough so your team can extend it",
    ],
    fit: "People are rebuilding the same report by hand every month.",
    stack: ["Power BI", "DAX", "SQL", "Star schema / dimensional modeling"],
    proof: ["reckitt-sales-analytics-pipeline"],
  },
  {
    id: "apps",
    title: "Web apps & internal tools",
    outcome: "A working product, from the database to the screen.",
    gets: [
      "A full-stack app with logins and roles, deployed and handed over",
      "Clean, documented code you can keep building on",
      "The boring parts done properly: validation, permissions, backups",
    ],
    fit: "You need a tool, portal or MVP built, and you don't have a developer on hand.",
    stack: ["Next.js", "React", "Django", "FastAPI", "PostgreSQL"],
    proof: ["abov-hr", "women360", "task-goal-tracker", "last-mile-delivery-tracker"],
  },
  {
    id: "automation",
    title: "Automation & AI",
    outcome: "Manual, repetitive work replaced by something that does it for you.",
    gets: [
      "A script or service that reads messages, files or forms for you",
      "LLM extraction with a rule-based fallback when the model is unsure",
      "Daily reports or exports in the format you already use",
    ],
    fit: "Someone on your team copies information from one place to another every day.",
    stack: ["Python", "FastAPI", "OpenAI / Gemini APIs", "LLM prompt engineering"],
    proof: ["aic-worklog-automation", "autcore"],
  },
] as const;

const HIRE_PROOF = [
  "A PySpark pipeline into a Power BI star schema, with 39 automated tests.",
  "Sentinel: pipeline monitoring with human-approved reruns, live on a Databricks workspace.",
  "A Medallion Lakehouse designed for an EV fleet, with 30+ KPIs defined.",
  "Chairperson of a 250+ member tech club, and 1st of 500 teams at HackHub'25.",
];

const STEPS = [
  { n: "1", title: "Send a short brief", text: "What you need and roughly when. A few lines is enough." },
  { n: "2", title: "Get a scoped plan", text: "I reply with questions, what I'd build, and an estimate." },
  { n: "3", title: "Built in small steps", text: "Tested pieces, handed over with the code and docs." },
];

const NEEDS = [...SERVICES.map((s) => s.title), "A full-time role", "Something else"];
const WHEN = ["As soon as possible", "Within a month", "In 2 to 3 months", "Just exploring"];

function mail(subject: string, body: string) {
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function Missions() {
  const [audience, setAudience] = useState<Audience>("build");
  const openProject = useProjectModal();
  const openResume = useResumeModal();

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const need = String(f.get("need") || "");
    const lines = [
      `Hi Pavithra,`,
      ``,
      `I'm ${f.get("name") || "(your name)"} and I'd like to talk about: ${need}.`,
      `Timeline: ${f.get("when")}`,
      f.get("budget") ? `Budget: ${f.get("budget")}` : "",
      ``,
      `More detail:`,
      String(f.get("details") || ""),
    ].filter((l, i, a) => l !== "" || a[i - 1] !== "");
    window.location.href = mail(`Proposal request: ${need}`, lines.join("\n"));
  }

  const tab = (active: boolean) =>
    `flex-1 rounded-2xl border-2 px-5 py-4 text-left transition-colors ${
      active ? "border-accent bg-accent text-accent-ink" : "border-border-strong text-ink hover:border-accent"
    }`;

  return (
    <section id="missions" className="night relative bg-paper py-24 sm:py-32">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <Container className="relative">
        <p
          data-reveal=""
          className="mb-6 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-[#2f9e57]/50 bg-[#2f9e57]/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#7fd9a0]"
        >
          <span className="soft-pulse h-2 w-2 rounded-full bg-[#2f9e57]" />
          Available now for freelance projects
          <span aria-hidden="true" className="opacity-50">·</span>
          Full-time roles from 2027
        </p>
        <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-amber" data-reveal="">
          <span>05</span>
          <span className="h-px w-10 bg-accent" />
          <span className="text-ink">Work with me</span>
        </p>
        <h2 data-mask="" className="mt-5 text-[clamp(2.2rem,6vw,4.6rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
          <Mask>What do you</Mask>
          <Mask delay={120}>
            <span className="text-accent">need?</span>
          </Mask>
        </h2>
        <p data-reveal="" className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-muted">
          Hiring a data engineer, or need something built? Pick the one that fits. Every button opens an email that is
          already written, so a proposal is one click away.
        </p>

        <div role="tablist" aria-label="What brings you here" className="mt-10 flex flex-col gap-3 sm:flex-row" data-reveal="">
          <button type="button" role="tab" aria-selected={audience === "build"} onClick={() => setAudience("build")} className={tab(audience === "build")}>
            <span className="block text-[1.25rem] font-black uppercase tracking-tight">I need something built</span>
            <span className="mt-1 block text-sm opacity-80">Freelance projects: data, dashboards, apps, automation</span>
          </button>
          <button type="button" role="tab" aria-selected={audience === "hire"} onClick={() => setAudience("hire")} className={tab(audience === "hire")}>
            <span className="block text-[1.25rem] font-black uppercase tracking-tight">I&apos;m hiring</span>
            <span className="mt-1 block text-sm opacity-80">Full-time data engineer from 2027</span>
          </button>
        </div>

        {audience === "build" ? (
          <div key="build" className="mission-panel mt-8 grid gap-5 md:grid-cols-2">
            {SERVICES.map((s) => (
              <article key={s.id} className="flex flex-col rounded-3xl border-2 border-border-strong bg-paper-raised p-6 sm:p-7">
                <h3 className="text-[1.5rem] font-black uppercase leading-none tracking-tight text-ink">{s.title}</h3>
                <p className="mt-3 text-[1.02rem] font-medium leading-snug text-accent">{s.outcome}</p>

                <p className="mt-6 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">You get</p>
                <ul className="mt-2 space-y-2 text-[0.95rem] leading-snug text-ink-muted">
                  {s.gets.map((g) => (
                    <li key={g} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {g}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 text-[0.9rem] leading-snug text-ink-muted">
                  <span className="font-semibold text-ink">Good fit if: </span>
                  {s.fit}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {s.stack.map((t) => (
                    <li key={t} className="rounded-full border border-border-strong px-3 py-1">
                      <SkillChip skill={t} />
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">Seen in</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {s.proof.map((slug) => {
                    const p = getProject(slug);
                    if (!p) return null;
                    return (
                      <li key={slug}>
                        <button
                          type="button"
                          onClick={() => openProject(slug)}
                          data-cursor="Open"
                          className="inline-flex items-center gap-1.5 rounded-full bg-night-3 px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-tight text-[#f4f1ea] transition-colors hover:bg-accent hover:text-accent-ink"
                        >
                          {shortTitle(p)}
                          <ArrowUpRight size={12} />
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <a
                  href={mail(
                    `Proposal request: ${s.title}`,
                    `Hi Pavithra,\n\nI'd like a proposal for: ${s.title}.\n\nWhat I need:\n\nWhen I need it by:\n\nBudget (optional):\n`
                  )}
                  className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 text-sm font-black uppercase tracking-wider text-accent-ink transition-transform hover:-translate-y-0.5"
                >
                  Get a proposal
                  <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div key="hire" className="mission-panel mt-8 rounded-3xl border-2 border-border-strong bg-paper-raised p-6 sm:p-9">
            <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black uppercase leading-none tracking-tight text-ink">
              Data engineer, full-time from 2027
            </h3>
            <p className="mt-4 max-w-2xl text-[1.05rem] leading-relaxed text-ink-muted">
              Final-year CSE at VIT (May 2027). I build pipelines that are tested, observable and documented, and I have
              shipped them on a real Databricks workspace.
            </p>
            <p className="mt-7 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-ink-faint">What I bring</p>
            <ul className="mt-3 grid gap-3 md:grid-cols-2">
              {HIRE_PROOF.map((t) => (
                <li key={t} className="flex gap-3 rounded-2xl border border-border-strong p-4 text-[0.97rem] leading-snug text-ink-muted">
                  <span aria-hidden="true" className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
            <ul className="mt-6 flex flex-wrap gap-1.5">
              {["PySpark", "Databricks", "Delta Lake", "SQL", "Power BI"].map((t) => (
                <li key={t} className="rounded-full border border-border-strong px-3 py-1">
                  <SkillChip skill={t} />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mail(
                  "Role: Data Engineer",
                  "Hi Pavithra,\n\nWe're hiring for: \nCompany / team: \nLocation / remote: \n\nI'd like to talk about it.\n"
                )}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-black uppercase tracking-wider text-accent-ink transition-transform hover:-translate-y-0.5"
              >
                Email about a role <ArrowUpRight size={15} />
              </a>
              {site.resumeAvailable ? (
                <button
                  type="button"
                  onClick={openResume}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-border-strong px-7 text-sm font-black uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <FileIcon size={15} /> See my resume
                </button>
              ) : null}
            </div>
          </div>
        )}

        <div className="mt-14 grid gap-4 md:grid-cols-3" data-reveal="">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border-strong p-5">
              <span className="font-mono text-[12px] font-bold text-amber">STEP {s.n}</span>
              <p className="mt-2 text-[1.1rem] font-black uppercase tracking-tight text-ink">{s.title}</p>
              <p className="mt-1.5 text-[0.95rem] leading-snug text-ink-muted">{s.text}</p>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="mt-14 rounded-3xl border-2 border-accent/60 bg-paper-raised p-6 sm:p-9" data-reveal="">
          <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] font-black uppercase leading-none tracking-tight text-ink">
            Or write a quick brief
          </h3>
          <p className="mt-3 max-w-xl text-[0.97rem] text-ink-muted">
            Fill this in and your email app opens with everything written. Nothing is stored on this site.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-semibold text-ink">
              Your name
              <input name="name" autoComplete="name" className="mt-1.5 h-12 w-full rounded-xl border-2 border-border-strong bg-paper px-4 text-ink focus-visible:border-accent" />
            </label>
            <label className="block text-sm font-semibold text-ink">
              What do you need?
              <select name="need" defaultValue={NEEDS[0]} className="mt-1.5 h-12 w-full rounded-xl border-2 border-border-strong bg-paper px-3 text-ink focus-visible:border-accent">
                {NEEDS.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold text-ink">
              When?
              <select name="when" defaultValue={WHEN[1]} className="mt-1.5 h-12 w-full rounded-xl border-2 border-border-strong bg-paper px-3 text-ink focus-visible:border-accent">
                {WHEN.map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-semibold text-ink">
              Budget (optional)
              <input name="budget" className="mt-1.5 h-12 w-full rounded-xl border-2 border-border-strong bg-paper px-4 text-ink focus-visible:border-accent" />
            </label>
            <label className="block text-sm font-semibold text-ink md:col-span-2">
              Tell me a bit more
              <textarea name="details" rows={4} className="mt-1.5 w-full rounded-xl border-2 border-border-strong bg-paper px-4 py-3 text-ink focus-visible:border-accent" />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-black uppercase tracking-wider text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            Open my email <ArrowUpRight size={15} />
          </button>
        </form>
      </Container>
    </section>
  );
}
