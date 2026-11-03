"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { getScrollY } from "@/lib/scroll";

/**
 * A giant ticker that reacts to scrolling: it speeds up and leans into the
 * direction you scroll, then settles back to a slow drift.
 */
export function Marquee({
  words,
  tone = "paper",
  reverse = false,
}: {
  words: string[];
  tone?: "paper" | "night";
  reverse?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dir = reverse ? 1 : -1;
    const tween = gsap.fromTo(el, { xPercent: dir === -1 ? 0 : -50 }, { xPercent: dir === -1 ? -50 : 0, ease: "none", duration: 38, repeat: -1 });
    const skew = gsap.quickTo(el, "skewX", { duration: 0.45, ease: "power3.out" });

    let last = getScrollY();
    let smooth = 0;
    const tick = () => {
      const y = getScrollY();
      const v = (y - last) * 60;
      last = y;
      smooth += (v - smooth) * 0.12;
      skew(gsap.utils.clamp(-14, 14, (smooth / -90) * (reverse ? -1 : 1)));
      tween.timeScale(1 + Math.min(Math.abs(smooth) / 350, 7));
    };
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      tween.kill();
    };
  }, [reverse]);

  const item = (w: string, i: number) => (
    <span key={i} className="flex shrink-0 items-center gap-[0.35em] pr-[0.35em]">
      <span className={i % 2 ? "marquee-word marquee-word--outline" : "marquee-word"}>{w}</span>
      <span aria-hidden="true" className="text-[0.5em] text-[#ff6a13]">
        ✦
      </span>
    </span>
  );

  return (
    <div
      ref={root}
      aria-hidden="true"
      className={`marquee-big overflow-hidden py-6 ${tone === "night" ? "night bg-paper" : "bg-paper"}`}
    >
      <div ref={track} className="flex w-max whitespace-nowrap text-[clamp(3.5rem,11vw,10rem)] font-black uppercase leading-[0.9] tracking-tighter will-change-transform">
        {[...words, ...words, ...words, ...words].map(item)}
      </div>
    </div>
  );
}
