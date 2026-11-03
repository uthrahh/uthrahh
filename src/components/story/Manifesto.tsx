"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/Container";
import { useScrollReady } from "./SmoothScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const LINES: { text: string; hot?: boolean }[][] = [
  [
    { text: "I turn" },
    { text: "messy data", hot: true },
    { text: "into" },
    { text: "pipelines" },
    { text: "people" },
    { text: "trust," },
  ],
  [{ text: "then" }, { text: "build" }, { text: "the" }, { text: "apps", hot: true }, { text: "on" }, { text: "top." }],
];

/** A big statement whose words light up one by one as you scroll through it. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const ready = useScrollReady();

  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>(".manifesto__w", root.current);
        gsap.fromTo(
          words,
          { opacity: 0.14, yPercent: 30 },
          {
            opacity: 1,
            yPercent: 0,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 55%", scrub: 0.6 },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <section ref={root} className="relative bg-paper py-28 sm:py-40">
      <Container>
        <p className="flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-accent-strong">
          <span className="h-px w-10 bg-accent" />
          <span className="text-ink">The short version</span>
        </p>
        <p className="mt-8 text-[clamp(2.4rem,7.4vw,6.4rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
          {LINES.map((line, i) => (
            <span key={i} className="block">
              {line.map((w, j) => (
                <span key={j} className={`manifesto__w mr-[0.22em] inline-block ${w.hot ? "text-accent-strong" : ""}`}>
                  {w.text}
                </span>
              ))}
            </span>
          ))}
        </p>
        <p className="mt-10 max-w-xl font-mono text-[13px] uppercase leading-relaxed tracking-[0.18em] text-ink-faint">
          Tested. Observable. Documented. Shipped.
        </p>
      </Container>
    </section>
  );
}
