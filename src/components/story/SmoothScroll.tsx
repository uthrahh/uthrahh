"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const ReadyContext = createContext(false);

/**
 * True once the smooth-scroller (or the decision not to use one) is settled.
 * Scroll-driven sections wait for this before creating their triggers, since
 * ScrollSmoother has to exist before any ScrollTrigger measures the page.
 */
export function useScrollReady() {
  return useContext(ReadyContext);
}

export function SmoothScroll({ children, chrome }: { children: ReactNode; chrome?: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.1,
        effects: true,
      });
      return () => smoother.kill();
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setReady(true);

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      setReady(false);
      mm.revert();
    };
  }, []);

  return (
    <ReadyContext.Provider value={ready}>
      {chrome}
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </ReadyContext.Provider>
  );
}
