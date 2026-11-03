"use client";

import { Container } from "@/components/Container";
import { EmailCopy } from "@/components/EmailCopy";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, SubstackIcon } from "@/components/icons";
import { site } from "@/lib/data/site";

/** The cat signal: a beam of orange light with cat ears at its source. */
function Signal() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
      <div className="finale__beam" />
      <svg viewBox="0 0 120 70" className="relative z-10 h-16 w-28" fill="#ff6a13">
        <path d="M10 70 L16 8 L48 30 Q60 26 72 30 L104 8 L110 70 Z" />
        <path d="M24 56 L26 26 L42 38 Z M96 56 L94 26 L78 38 Z" fill="#0f1217" opacity="0.55" />
      </svg>
    </div>
  );
}

export function Finale() {
  const openResume = useResumeModal();

  return (
    <div className="night bg-paper">
      <section id="contact" className="relative overflow-hidden py-28 text-center sm:py-40">
        <Signal />
        <Container className="relative">
          <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-amber" data-reveal="">
            06 · Contact
          </p>
          <h2
            data-reveal=""
            className="mx-auto mt-6 max-w-5xl text-[clamp(2.6rem,9vw,7.5rem)] font-black uppercase leading-[0.9] tracking-tight text-ink"
          >
            Let&apos;s build
            <br />
            the <span className="text-accent">whole thing.</span>
          </h2>
          <div data-reveal="" className="mt-8 flex items-center justify-center gap-4 font-mono text-[clamp(0.8rem,1.6vw,1.1rem)] font-bold uppercase tracking-[0.2em]">
            <span className="text-ink">App</span>
            <span className="h-px w-10 bg-accent" />
            <span className="text-accent">+</span>
            <span className="h-px w-10 bg-accent" />
            <span className="text-amber">Data</span>
          </div>
          <p data-reveal="" className="mx-auto mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink-muted">
            Open to Data Engineer roles starting 2027, and to freelance application projects in the meantime. A pipeline
            problem worth a second pair of eyes is welcome too.
          </p>

          <div data-reveal="" className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-14 items-center gap-2 rounded-full bg-accent px-9 text-sm font-black uppercase tracking-wider text-accent-ink transition-transform hover:-translate-y-0.5"
            >
              Start a project
              <ArrowUpRight size={16} />
            </a>
            {site.resumeAvailable ? (
              <button
                type="button"
                onClick={openResume}
                className="inline-flex min-h-14 items-center rounded-full border-2 border-border-strong px-8 text-sm font-black uppercase tracking-wider text-ink transition-colors hover:border-accent hover:text-accent"
              >
                Resume
              </button>
            ) : null}
          </div>

          <div data-reveal="" className="mt-8 flex flex-col items-center gap-5">
            <EmailCopy email={site.email} className="font-mono text-[15px] text-ink-muted hover:text-accent" />
            <div className="flex items-center gap-3">
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
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border-strong text-ink-muted transition-colors hover:border-accent hover:text-accent"
                >
                  {l.icon}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
