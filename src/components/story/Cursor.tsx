"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TRAIL = 8;
const INTERACTIVE =
  "a, button, [role='tab'], [role='switch'], summary, select, label, [data-cursor]";

/**
 * A git-commit cursor: a head dot that drags a short branch of commit nodes
 * behind it, inside a ring that swells and names the action when the pointer
 * is over something clickable. Native cursor and touch devices are left alone.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const line = useRef<SVGPolylineElement>(null);
  const nodes = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = root.current;
    const ringEl = ring.current;
    if (!el || !ringEl) return;

    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = Array.from({ length: TRAIL }, () => ({ x: -200, y: -200 }));
    const mouse = { x: -200, y: -200 };
    const ringPos = { x: -200, y: -200 };
    let seen = false;
    let suspended = false;
    let magnetEl: HTMLElement | null = null;

    const setSuspended = (value: boolean) => {
      suspended = value;
      html.classList.toggle("has-cursor", !value);
      el.classList.toggle("is-on", !value && seen);
    };

    html.classList.add("has-cursor");

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (magnetEl && !reduce) {
        const r = magnetEl.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.3;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        gsap.to(magnetEl, { x: dx, y: dy, duration: 0.3, ease: "power3.out", overwrite: "auto" });
      }
      if (!seen) {
        seen = true;
        pts.forEach((p) => {
          p.x = e.clientX;
          p.y = e.clientY;
        });
        ringPos.x = e.clientX;
        ringPos.y = e.clientY;
        el.classList.toggle("is-on", !suspended);
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const typing = target.closest("input, textarea");
      if (typing) {
        el.classList.remove("is-on");
        html.classList.remove("has-cursor");
        return;
      }
      if (!suspended && seen) {
        html.classList.add("has-cursor");
        el.classList.add("is-on");
      }
      const hit = target.closest<HTMLElement>(INTERACTIVE);
      const magnet = target.closest<HTMLElement>("[data-magnetic]");
      if (magnet !== magnetEl) {
        if (magnetEl) gsap.to(magnetEl, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
        magnetEl = magnet;
      }
      const text = hit?.dataset.cursor ?? "";
      ringEl.classList.toggle("is-hover", Boolean(hit));
      ringEl.classList.toggle("has-label", Boolean(text));
      if (label.current) label.current.textContent = text;
    };

    const onDown = () => ringEl.classList.add("is-down");
    const onUp = () => ringEl.classList.remove("is-down");
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) el.classList.remove("is-on");
    };
    const onEnter = () => {
      if (seen && !suspended) el.classList.add("is-on");
    };

    // Native cursor returns whenever a dialog is open (it sits above this layer).
    const mo = new MutationObserver(() => setSuspended(Boolean(document.querySelector("dialog[open]"))));
    mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["open"], childList: true });

    const tick = () => {
      const lead = reduce ? 1 : 0.55;
      pts[0].x += (mouse.x - pts[0].x) * lead;
      pts[0].y += (mouse.y - pts[0].y) * lead;
      for (let i = 1; i < TRAIL; i++) {
        const k = reduce ? 1 : 0.42 - i * 0.03;
        pts[i].x += (pts[i - 1].x - pts[i].x) * k;
        pts[i].y += (pts[i - 1].y - pts[i].y) * k;
      }
      ringPos.x += (mouse.x - ringPos.x) * (reduce ? 1 : 0.16);
      ringPos.y += (mouse.y - ringPos.y) * (reduce ? 1 : 0.16);

      line.current?.setAttribute("points", pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" "));
      nodes.current.forEach((n, i) => {
        if (!n) return;
        n.setAttribute("cx", pts[i].x.toFixed(1));
        n.setAttribute("cy", pts[i].y.toFixed(1));
      });
      ringEl.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    };

    gsap.ticker.add(tick);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      gsap.ticker.remove(tick);
      mo.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      html.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <svg className="cursor__trail" fill="none">
        <polyline ref={line} stroke="#ff6a13" strokeWidth="1.5" strokeOpacity="0.55" strokeLinejoin="round" strokeLinecap="round" />
        {Array.from({ length: TRAIL }, (_, i) => (
          <circle
            key={i}
            ref={(n) => {
              nodes.current[i] = n;
            }}
            r={i === 0 ? 4.5 : Math.max(1.4, 4 - i * 0.35)}
            fill="#ff6a13"
            opacity={i === 0 ? 1 : Math.max(0.2, 0.85 - i * 0.1)}
          />
        ))}
      </svg>
      <div ref={ring} className="cursor__ringwrap">
        <div className="cursor__ring">
          <span ref={label} className="cursor__label" />
        </div>
      </div>
    </div>
  );
}
