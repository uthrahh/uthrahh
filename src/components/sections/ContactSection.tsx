"use client";

import { Container } from "@/components/Container";
import { EmailCopy } from "@/components/EmailCopy";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { ArrowUpRight, GitHubIcon, LinkedInIcon, SubstackIcon } from "@/components/icons";
import { site } from "@/lib/data/site";

export function ContactSection() {
  const openResume = useResumeModal();

  const links = [
    { href: site.linkedin, label: "LinkedIn", handle: "in/uthrah-rk", Icon: LinkedInIcon },
    { href: site.github, label: "GitHub", handle: "@uthrahh", Icon: GitHubIcon },
    { href: site.substack, label: "Substack", handle: "@uthrahhh", Icon: SubstackIcon },
  ];

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <Container>
        <div
          data-reveal=""
          className="relative overflow-hidden rounded-[28px] border border-border bg-paper-raised px-6 py-14 text-center sm:px-12 sm:py-20"
        >
          <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
          <div aria-hidden="true" className="accent-glow pointer-events-none absolute -bottom-56 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full" />

          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-strong">06 · Contact</p>
            <h2 className="mt-5 font-display text-4xl italic leading-tight text-ink sm:text-6xl">Let&apos;s talk data.</h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-ink-muted">
              A role, a collaboration, or a pipeline problem that could use a second pair of eyes: I&apos;d
              like to hear about it.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${site.email}`}
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-7 text-sm font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                Email me
                <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              {site.resumeAvailable ? (
                <button
                  type="button"
                  onClick={openResume}
                  className="inline-flex min-h-12 items-center rounded-full border border-border-strong bg-paper px-7 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent-strong"
                >
                  View resume
                </button>
              ) : null}
            </div>
            <div className="mt-4">
              <EmailCopy email={site.email} className="font-mono text-[13px] text-ink-faint hover:text-accent-strong" />
            </div>

            <ul className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {links.map(({ href, label, handle, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-border bg-paper px-4 py-3 text-left transition-colors hover:border-accent"
                  >
                    <Icon size={17} className="text-ink-muted transition-colors group-hover:text-accent-strong" />
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink">{label}</span>
                      <span className="block truncate font-mono text-[11px] text-ink-faint">{handle}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
