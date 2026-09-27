"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { getProject } from "@/lib/data/projects";

type Layer = {
  key: string;
  label: string;
  sub: string;
  color: string;
  detail: string;
  /** Project slugs where this layer was actually built. */
  seenIn: string[];
};

// Each layer points at real work in `projects.ts`, so the diagram doubles as
// navigation into the case studies rather than decoration.
const LAYERS: Layer[] = [
  {
    key: "sources",
    label: "Sources",
    sub: "SAP · APIs · flat files",
    color: "var(--ink-faint)",
    detail: "SAP extracts, REST APIs, monthly flat-file exports and even free-text WhatsApp messages.",
    seenIn: ["ai-powered-sap-erp-intelligence-assistant", "aic-worklog-automation"],
  },
  {
    key: "bronze",
    label: "Bronze",
    sub: "ingest · schema on read",
    color: "var(--bronze)",
    detail: "Raw data lands as-is and append-only, so every downstream number can be traced back to its source.",
    seenIn: ["ev-fleet-lakehouse-platform", "reckitt-sales-analytics-pipeline"],
  },
  {
    key: "silver",
    label: "Silver",
    sub: "validate · dedupe · DQ checks",
    color: "var(--silver)",
    detail: "Validated, deduplicated and conformed, with checks that fail loudly instead of passing bad rows along.",
    seenIn: ["reckitt-sales-analytics-pipeline", "data-pipeline-sentinel"],
  },
  {
    key: "gold",
    label: "Gold",
    sub: "star schema · KPIs",
    color: "var(--gold)",
    detail: "Dimensional models and KPI definitions shaped around the questions the business actually asks.",
    seenIn: ["reckitt-sales-analytics-pipeline", "ev-fleet-lakehouse-platform"],
  },
  {
    key: "serve",
    label: "Serve",
    sub: "Power BI · REST APIs · NL",
    color: "var(--accent-strong)",
    detail: "Dashboards, APIs and natural-language assistants that put the modeled data in front of decision-makers.",
    seenIn: ["ai-powered-sap-erp-intelligence-assistant", "data-pipeline-sentinel"],
  },
];

const NODE_H = 56;
const NODE_GAP = 10;

export function HeroPipeline() {
  const [active, setActive] = useState(2);
  const [pinned, setPinned] = useState(false);
  const openProject = useProjectModal();
  const hovering = useRef(false);

  // Gently auto-advance through the layers until the visitor interacts.
  useEffect(() => {
    if (pinned || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!hovering.current) setActive((i) => (i + 1) % LAYERS.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [pinned]);

  const spineLength = (LAYERS.length - 1) * (NODE_H + NODE_GAP);
  const layer = LAYERS[active];

  return (
    <div
      className="relative rounded-[26px] border border-border bg-paper-raised/85 p-5 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-6"
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <p className="font-mono text-xs text-ink-faint">
          <span className="text-accent-strong">uthrahh</span>/data-platform
        </p>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-paper-sunken px-3 py-1 font-mono text-[11px] text-ink-muted">
          <span className="soft-pulse h-1.5 w-1.5 rounded-full bg-ok" aria-hidden="true" />
          medallion flow
        </span>
      </div>

      <div className="relative pl-9">
        {/* spine */}
        <div
          aria-hidden="true"
          className="absolute left-[13px] w-px border-l border-dashed border-border-strong"
          style={{ top: NODE_H / 2, height: spineLength }}
        />
        {[0, 1, 2, 3].map((k) => (
          <span
            key={k}
            aria-hidden="true"
            className="spine-particle absolute left-[10px] h-[7px] w-[7px] rounded-full"
            style={
              {
                top: NODE_H / 2 - 3.5,
                animationDelay: `${k * 1.05}s`,
                "--spine-length": `${spineLength}px`,
              } as CSSProperties
            }
          />
        ))}

        <ul className="space-y-[10px]" role="list" aria-label="Medallion data pipeline layers">
          {LAYERS.map((l, i) => {
            const isActive = i === active;
            return (
              <li key={l.key} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-9 top-1/2 flex h-[27px] w-[27px] -translate-y-1/2 items-center justify-center rounded-full border-2 bg-paper-raised transition-transform"
                  style={{ borderColor: l.color, transform: `translateY(-50%) scale(${isActive ? 1.12 : 1})` }}
                >
                  {isActive ? <span className="h-2 w-2 rounded-full" style={{ background: l.color }} /> : null}
                </span>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => {
                    setActive(i);
                    setPinned(true);
                  }}
                  aria-pressed={isActive}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 text-left transition-colors ${
                    isActive
                      ? "border-accent/50 bg-accent-soft"
                      : "border-border bg-paper-sunken hover:border-border-strong"
                  }`}
                  style={{ height: NODE_H }}
                >
                  <span>
                    <span
                      className="block font-mono text-[11px] font-medium uppercase tracking-[0.18em]"
                      style={{ color: l.color }}
                    >
                      {l.label}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] text-ink-muted">{l.sub}</span>
                  </span>
                  {i > 0 ? (
                    <span
                      aria-hidden="true"
                      className="soft-pulse h-2 w-2 rounded-full bg-ok"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-5 min-h-[112px] rounded-xl border border-border bg-paper-sunken p-4" aria-live="polite">
        <p className="text-[13.5px] leading-relaxed text-ink-muted">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: layer.color }}>
            {layer.label}
          </span>{" "}
          · {layer.detail}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-[10.5px] uppercase tracking-widest text-ink-faint">built in</span>
          {layer.seenIn.map((slug) => {
            const p = getProject(slug);
            if (!p) return null;
            return (
              <button
                key={slug}
                type="button"
                onClick={() => openProject(slug)}
                className="rounded-full border border-border bg-paper-raised px-2.5 py-0.5 text-xs text-ink transition-colors hover:border-accent hover:text-accent-strong"
              >
                {p.title.split(":")[0]} ↗
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
