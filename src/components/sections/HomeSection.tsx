"use client";

import { Container } from "@/components/Container";
import { EmailCopy } from "@/components/EmailCopy";
import { ProtectedPhoto } from "@/components/ProtectedPhoto";
import { HeroPipeline } from "@/components/HeroPipeline";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { ArrowRight, Chevron, FileIcon, GitHubIcon, LinkedInIcon, SubstackIcon } from "@/components/icons";
import { site } from "@/lib/data/site";
import { projects } from "@/lib/data/projects";
import { experience } from "@/lib/data/experience";

const SIGNATURE_STACK = [
  "Python",
  "SQL",
  "PySpark",
  "Databricks",
  "Delta Lake",
  "Unity Catalog",
  "Power BI",
  "Apache Airflow",
  "dbt",
  "FastAPI",
  "Django",
  "PostgreSQL",
  "React",
  "Next.js",
  "Docker",
  "RAG",
];

const FACTS = [
  { value: String(projects.length), label: "case studies", sub: "data, backend & AI" },
  { value: String(experience.length), label: "internships", sub: "data eng + SDE" },
  { value: "39", label: "automated tests", sub: "in one PySpark pipeline" },
  { value: "250+", label: "member club led", sub: "OSPC, VIT Chennai" },
  { value: "1st", label: "place, HackHub'25", sub: "with AutCore" },
];

const ICON_LINK =
  "flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-accent hover:text-accent-strong";

export function HomeSection() {
  const openResumeModal = useResumeModal();

  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      {/* ambient texture */}
      <div aria-hidden="true" className="dot-grid fade-radial pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="accent-glow pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full"
      />

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_1fr] lg:gap-14">
          {/* left: identity */}
          <div className="min-w-0 animate-[hero-in_0.7s_ease-out_both]">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <ProtectedPhoto
                  src="/profilephoto.jpg"
                  alt={`Portrait of ${site.name}`}
                  className="w-[76px] ring-2 ring-accent/70 ring-offset-4 ring-offset-paper sm:w-[88px]"
                />
              </div>
              <p className="font-mono text-[13px] text-ink-muted sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Chevron size={13} className="text-accent-strong" />
                  <span className="text-accent-strong">~/uthrahh</span>
                  <span className="text-ink">whoami</span>
                  <span aria-hidden="true" className="caret ml-0.5 inline-block h-4 w-2 bg-accent-strong align-middle" />
                </span>
                <span className="mt-1 block text-ink-faint">B.Tech CSE · VIT Chennai · 2027</span>
              </p>
            </div>

            <h1 className="mt-7 text-balance text-[2.7rem] font-bold leading-[0.98] tracking-[-0.03em] text-ink sm:text-6xl lg:text-[4.4rem]">
              {site.name}
            </h1>

            <p className="mt-5 text-lg font-medium sm:text-xl">
              <span className="text-accent-strong">Data Engineer</span>
              <span className="text-ink-muted"> · Backend Systems · Applied ML</span>
            </p>

            <p className="mt-3 font-display text-2xl italic leading-snug text-ink sm:text-[1.7rem]">
              I build pipelines that business teams can trust.
            </p>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">
              I&apos;m a CSE candidate at{" "}
              <span className="font-medium text-ink">Vellore Institute of Technology, Chennai</span>{" "}
              focused on <span className="font-medium text-ink">data engineering</span>: the pipelines
              and infrastructure that turn raw data into something a business can act on. My internships
              and projects center on Databricks, extended by backend systems in Django and FastAPI and
              applied machine learning, alongside two years leading a 250+ member technical community.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-6 text-sm font-semibold text-paper transition-colors hover:bg-accent"
              >
                See my work
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              {site.resumeAvailable ? (
                <button
                  type="button"
                  onClick={openResumeModal}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-strong"
                >
                  <FileIcon size={15} />
                  Resume
                </button>
              ) : null}
              <span className="mx-1 hidden h-6 w-px bg-border sm:block" aria-hidden="true" />
              <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={ICON_LINK}>
                <GitHubIcon />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={ICON_LINK}>
                <LinkedInIcon size={17} />
              </a>
              <a href={site.substack} target="_blank" rel="noopener noreferrer" aria-label="Substack" className={ICON_LINK}>
                <SubstackIcon size={15} />
              </a>
            </div>
            <div className="mt-4">
              <EmailCopy email={site.email} className="font-mono text-[13px] text-ink-faint hover:text-accent-strong" />
            </div>
          </div>

          {/* right: interactive pipeline */}
          <div className="relative animate-[hero-in_0.8s_0.15s_ease-out_both]">
            <HeroPipeline />
          </div>
        </div>

        {/* facts */}
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3 lg:mt-20 lg:grid-cols-5">
          {FACTS.map((f) => (
            <div key={f.label} className="bg-paper-raised px-5 py-5">
              <dt className="sr-only">{f.label}</dt>
              <dd>
                <span className="block text-3xl font-bold tracking-tight text-ink">{f.value}</span>
                <span className="mt-1 block text-sm font-medium text-ink">{f.label}</span>
                <span className="mt-0.5 block font-mono text-[11px] text-ink-faint">{f.sub}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* stack ticker */}
      <div className="marquee mt-10 overflow-hidden border-y border-border py-4" aria-label="Core stack">
        <div className="marquee-track flex w-max gap-10 pr-10">
          {[...SIGNATURE_STACK, ...SIGNATURE_STACK].map((s, i) => (
            <span
              key={`${s}-${i}`}
              aria-hidden={i >= SIGNATURE_STACK.length}
              className="flex items-center gap-10 whitespace-nowrap font-mono text-[13px] uppercase tracking-[0.18em] text-ink-faint"
            >
              {s}
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
