"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useScrollReady } from "@/components/story/SmoothScroll";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * The timeline's spine, drawn like a git branch: an orange line grows down
 * the page as you read, with a glowing commit node riding its tip.
 */
export function GitRail() {
  const rail = useRef<HTMLSpanElement>(null);
  const fill = useRef<HTMLSpanElement>(null);
  const dot = useRef<HTMLSpanElement>(null);
  const ready = useScrollReady();

  useGSAP(
    () => {
      if (!ready || !rail.current || !fill.current || !dot.current) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          fill.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: rail.current!.parentElement,
              start: "top 65%",
              end: "bottom 55%",
              scrub: 0.4,
              onUpdate: (self) => {
                if (dot.current) dot.current.style.top = `${self.progress * 100}%`;
              },
            },
          }
        );
      });
      return () => mm.revert();
    },
    { scope: rail, dependencies: [ready], revertOnUpdate: true }
  );

  return (
    <span ref={rail} aria-hidden="true" className="absolute bottom-4 left-6 top-4 w-px bg-border">
      <span ref={fill} className="absolute inset-y-0 -left-px w-[3px] origin-top bg-accent" />
      <span
        ref={dot}
        className="absolute -left-[7px] top-0 h-[15px] w-[15px] -translate-y-1/2 rounded-full border-[3px] border-paper bg-accent shadow-[0_0_0_2px_var(--accent),0_0_24px_var(--accent)]"
      />
    </span>
  );
}
