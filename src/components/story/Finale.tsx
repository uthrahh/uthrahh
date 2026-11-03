"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Mask } from "@/components/ui";
import { Container } from "@/components/Container";
import { EmailCopy } from "@/components/EmailCopy";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { ArrowUpRight, GITHUB_MARK_PATH, GitHubIcon, LinkedInIcon, SubstackIcon } from "@/components/icons";
import { site } from "@/lib/data/site";

/** The cat signal: a beam of orange light with the GitHub cat at its source. */
function Signal() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
      <div className="finale__beam" />
      <svg viewBox="0 0 24 24" className="relative z-10 mt-2 h-20 w-20" fill="#ff6a13">
        <path d={GITHUB_MARK_PATH} />
      </svg>
    </div>
  );
}

/** A huge name whose letters swell and light up as the pointer comes near. */
function BigName() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const letters = Array.from(el.querySelectorAll<HTMLElement>("[data-l]"));
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        for (const l of letters) {
          const r = l.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          const k = Math.max(0, 1 - d / 260);
          l.style.transform = `translateY(${(-k * 26).toFixed(1)}px) scale(${(1 + k * 0.22).toFixed(3)})`;
          l.style.color = k > 0.05 ? `color-mix(in srgb, #ff6a13 ${Math.round(k * 100)}%, #f4f1ea)` : "";
        }
      });
    };
    const onLeave = () => {
      for (const l of letters) {
        l.style.transform = "";
        l.style.color = "";
      }
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={wrap}
      aria-hidden="true"
      className="mt-20 flex select-none justify-center overflow-hidden px-2 text-[clamp(4.5rem,21vw,19rem)] font-black uppercase leading-[0.82] tracking-tighter text-[#f4f1ea]/90"
    >
      {"UTHRAH".split("").map((c, i) => (
        <span key={i} className="bigname__l inline-block" style={{ "--i": i } as CSSProperties}>
          <span data-l="" className="inline-block transition-[transform,color] duration-200 ease-out">
            {c}
          </span>
        </span>
      ))}
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
            data-mask=""
            className="mx-auto mt-6 max-w-5xl text-[clamp(2.6rem,9vw,7.5rem)] font-black uppercase leading-[0.9] tracking-tight text-ink"
          >
            <Mask>Let&apos;s build</Mask>
            <Mask delay={120}>
              the <span className="text-accent">whole thing.</span>
            </Mask>
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
              data-magnetic=""
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
        <BigName />
      </section>
    </div>
  );
}
