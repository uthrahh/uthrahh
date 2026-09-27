"use client";

import {
  useEffect,
  type CSSProperties,
  type ElementType,
  type PointerEvent,
  type ReactNode,
} from "react";

/**
 * Marks the document as JS-enabled and reveals every `[data-reveal]`
 * element as it scrolls into view. Mounted once in the root layout. Content
 * is never hidden without JS: the hidden state is scoped to `.js-reveal`,
 * which only this effect adds.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const observeAll = () =>
      document
        .querySelectorAll("[data-reveal]:not(.is-visible)")
        .forEach((el) => io.observe(el));

    observeAll();
    // Sections that render later (filtered project grids, expanded lists)
    // get picked up without each one wiring its own observer.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

/** Wrapper that fades/slides its content in when scrolled into view. */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;
  return (
    <Tag data-reveal="" style={style} className={className}>
      {children}
    </Tag>
  );
}

/** Pointer handler that feeds the `.spotlight` hover glow its position. */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}
