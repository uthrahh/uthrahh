"use client";

import type { RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export const PINNED = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

type StripState = { progress: number; x: number; scale: number; viewport: number };

/**
 * Pins `section` and drives `wrap` sideways as the page scrolls (vertical
 * scroll in, horizontal motion out). The wrap is designed at a fixed pixel
 * height and scaled to fit the viewport. Below 768px, or with reduced
 * motion, nothing is pinned and the CSS falls back to a native
 * horizontal scroller.
 */
export function useStrip({
  section,
  wrap,
  designHeight,
  ready,
  parallax,
  parallaxFactor = 0.35,
  onUpdate,
}: {
  section: RefObject<HTMLElement | null>;
  wrap: RefObject<HTMLElement | null>;
  designHeight: number;
  ready: boolean;
  parallax?: RefObject<HTMLElement | null>;
  parallaxFactor?: number;
  onUpdate?: (state: StripState) => void;
}) {
  useGSAP(
    () => {
      if (!ready) return;
      const mm = gsap.matchMedia();
      mm.add(PINNED, () => {
        const sec = section.current;
        const el = wrap.current;
        if (!sec || !el) return;

        let scale = 1;
        const measure = () => {
          scale = Math.min(1.15, window.innerHeight / designHeight);
          gsap.set(el, { scale, transformOrigin: "0% 100%" });
        };
        const distance = () => Math.max(0, el.offsetWidth * scale - window.innerWidth);
        // The page scrolls a little less than the strip moves, so long strips
        // do not take forever to cross.
        const SPEED = 1.3;
        measure();

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => "+=" + distance() / SPEED,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: measure,
            onUpdate: (self) =>
              onUpdate?.({
                progress: self.progress,
                x: -distance() * self.progress,
                scale,
                viewport: window.innerWidth,
              }),
          },
        });
        tl.to(el, { x: () => -distance(), duration: 1 }, 0);
        if (parallax?.current) {
          tl.to(parallax.current, { x: () => -distance() * parallaxFactor, duration: 1 }, 0);
        }
      });
      return () => mm.revert();
    },
    { scope: section, dependencies: [ready], revertOnUpdate: true }
  );
}
