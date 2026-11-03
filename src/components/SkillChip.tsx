"use client";

import { useId, useState } from "react";
import { getSkillUsage } from "@/lib/skillUsage";

const MAX_VISIBLE = 4;

/**
 * A single skill label. When it has verified usage (drawn from experience
 * and project `technologies` arrays — never guessed), hovering or focusing
 * it reveals a compact "Used in" panel; otherwise it renders as plain text,
 * unchanged from before this feature existed. For a broadly-used skill the
 * panel caps at a few entries plus a "+N more" note, so it stays a small
 * hovercard rather than growing into a full project list.
 */
export function SkillChip({ skill, compact = false }: { skill: string; compact?: boolean }) {
  const size = compact ? "text-[12px]" : "text-[14px]";
  const usage = getSkillUsage(skill);
  const [open, setOpen] = useState(false);
  const panelId = useId();

  if (!usage.length) {
    return <span className={`${size} text-ink`}>{skill}</span>;
  }

  return (
    <span className="relative inline-block">
      <button
        type="button"
        aria-describedby={panelId}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className={`cursor-default ${size} text-ink no-underline outline-none transition-colors hover:text-accent-strong focus-visible:text-accent-strong`}
      >
        {skill}
      </button>

      {open ? (
        <span
          id={panelId}
          className="glass pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-[220px] -translate-x-1/2 rounded-md px-3 py-2 text-left backdrop-blur-md"
        >
          <span className="block font-mono text-[10px] uppercase tracking-widest text-ink-faint">
            Used in
          </span>
          <span className="mt-1 block space-y-0.5">
            {usage.slice(0, MAX_VISIBLE).map((u) => (
              <span key={u.label} className="block text-xs leading-snug text-ink-muted">
                {u.label} <span className="text-ink-faint">· {u.type}</span>
              </span>
            ))}
            {usage.length > MAX_VISIBLE ? (
              <span className="block text-xs text-ink-faint">
                +{usage.length - MAX_VISIBLE} more
              </span>
            ) : null}
          </span>
        </span>
      ) : null}
    </span>
  );
}
