"use client";

import { Container } from "@/components/Container";
import { EmailCopy } from "@/components/EmailCopy";
import { ProtectedPhoto } from "@/components/ProtectedPhoto";
import { HeroPipeline } from "@/components/HeroPipeline";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { ArrowRight, Chevron, FileIcon, GitHubIcon, LinkedInIcon, SubstackIcon } from "@/components/icons";
import { site } from "@/lib/data/site";

const SIGNATURE_STACK = [
  "Python",
  "SQL",
  "PySpark",
  "Databricks",
  "Delta Lake",
  "Unity Catalog",
  "Power BI",
  "FastAPI",
  "Django",
  "PostgreSQL",
  "React",
  "Next.js",
  "Docker",
  "RAG",
];

// Every figure here is traceable to a case study or the data files.
const FACTS = [
  { value: "39", label: "automated tests", sub: "FMCG PySpark pipeline" },
  { value: "140+", label: "startups served", sub: "facility booking backend" },
  { value: "3", label: "backend systems", sub: "shipped in one month" },
  { value: "1st", label: "of 500 teams", sub: "HackHub'25 · AutCore" },
  { value: "#1", label: "of 110+ clubs", sub: "OSPC · 250+ members" },
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
              <span className="text-ink-muted"> · Data Analyst · Software Development Engineer</span>
            </p>

            <p className="mt-3 max-w-xl text-balance font-display text-2xl italic leading-snug text-ink sm:text-[1.7rem]">
              {site.tagline}
            </p>

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-muted">
              Final-year CSE at <span className="font-medium text-ink">VIT Chennai</span> (May 2027). As a{" "}
              <span className="font-medium text-ink">Data Engineering intern at KaarTech</span> I built a tested
              PySpark pipeline into a Power BI star schema and shipped{" "}
              <span className="font-medium text-ink">Sentinel</span>, a pipeline observability app running on a
              live Databricks workspace. At AIC-CIIC I built three backend systems in one month with Django,
              FastAPI and PostgreSQL.
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
