"use client";

import { useCallback, useEffect, useRef, useState, type FocusEvent } from "react";
import { useProjectModal } from "@/components/ProjectModalProvider";
import { WorkstreamRow } from "@/components/WorkstreamRow";
import type { Workstream } from "@/lib/types";

const RADIUS = 30;
const PERSPECTIVE = 1600;
const SCENE_HEIGHT = 132;
const SECONDS_PER_ITEM = 4.2;
const RESUME_DELAY_MS = 6000;

/**
 * The projects tied to one work experience, presented as a true 3D vertical
 * drum that spins continuously and smoothly — like a rotating drum, but
 * rotating around a horizontal axis. Every project sits at its own fixed
 * angle around the drum; the whole ring rotates via a CSS keyframe
 * animation, so motion is genuinely continuous rather than stepping from
 * project to project. Perspective alone makes the front-facing project
 * read largest and clearest — no per-item JS sizing is needed.
 *
 * Hovering or focusing the barrel pauses the spin (with a generous
 * fallback timer in case focus ever gets stranded) so any project can be
 * read in full and clicked to open its existing case-study modal. Because
 * each experience renders its own instance of this component with its own
 * state and its own CSS animation, multiple barrels on the page always
 * rotate fully independently — there is no shared index, timer, or
 * controller between them.
 *
 * Under `prefers-reduced-motion`, CSS swaps this for the plain, always-
 * fully-accessible WorkstreamRow list — see `.project-barrel-static` in
 * globals.css — and the animation itself is paused via inline style too.
 *
 * `asList` forces that same plain list even with motion allowed — used so
 * the barrel can switch to a full, readable list while its sibling
 * "Read more" panel is expanded, and switch back to the barrel once
 * collapsed (see ExperienceEntry.tsx).
 */
export function ExperienceProjectBarrel({
  workstreams,
  asList = false,
}: {
  workstreams: Workstream[];
  asList?: boolean;
}) {
  const [paused, setPaused] = useState(false);
  const openProject = useProjectModal();
  const count = workstreams.length;
  const resumeTimerRef = useRef<number | null>(null);

  const clearResumeTimer = useCallback(() => {
    if (resumeTimerRef.current !== null) {
      window.clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  // A click natively focuses its button, and that focus has no guaranteed
  // "end" event if the pointer never moves again afterward — so a fallback
  // timer guarantees the spin always resumes on its own, while
  // mouseleave/blur still resume it immediately when they do fire.
  const pauseWithFallbackResume = useCallback(() => {
    clearResumeTimer();
    setPaused(true);
    resumeTimerRef.current = window.setTimeout(() => {
      resumeTimerRef.current = null;
      setPaused(false);
    }, RESUME_DELAY_MS);
  }, [clearResumeTimer]);

  const resumeNow = useCallback(() => {
    clearResumeTimer();
    setPaused(false);
  }, [clearResumeTimer]);

  useEffect(() => clearResumeTimer, [clearResumeTimer]);

  const handleBlurCapture = (e: FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      resumeNow();
    }
  };

  if (count === 0) return null;

  if (asList) {
    return (
      <div className="overflow-hidden rounded-2xl border border-border px-4 sm:px-5">
        {workstreams.map((ws) => (
          <WorkstreamRow key={ws.title} workstream={ws} />
        ))}
      </div>
    );
  }

  const angleStep = 360 / count;
  const durationSeconds = count * SECONDS_PER_ITEM;

  return (
    <div>
      <div
        className="project-barrel-scene"
        style={{ height: SCENE_HEIGHT, perspective: PERSPECTIVE }}
        onMouseEnter={pauseWithFallbackResume}
        onMouseLeave={resumeNow}
        onFocusCapture={pauseWithFallbackResume}
        onBlurCapture={handleBlurCapture}
      >
        <div
          className="project-barrel-ring"
          style={{
            animationDuration: `${durationSeconds}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {workstreams.map((ws, i) => {
            const angle = i * angleStep;
            return (
              <button
                key={ws.title}
                type="button"
                onClick={() => {
                  if (ws.projectSlug) openProject(ws.projectSlug);
                }}
                aria-label={ws.projectSlug ? `${ws.title} — open case study` : ws.title}
                className="group project-barrel-item w-full min-w-0 text-left"
                style={{ transform: `rotateX(${angle}deg) translateZ(${RADIUS}px)` }}
              >
                <div className="mx-auto w-[88%] min-w-0 border-b border-border py-1.5">
                  <div className="flex min-w-0 items-center justify-between gap-2">
                    <h4 className="min-w-0 truncate font-display text-sm text-ink transition-colors group-hover:text-accent-strong group-focus-visible:text-accent-strong">
                      {ws.title}
                    </h4>
                    {ws.projectSlug ? (
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-ink-faint transition-all group-hover:translate-x-0.5 group-hover:text-accent-strong"
                      >
                        →
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-ink-muted">{ws.oneLiner}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible fallback under prefers-reduced-motion. */}
      <div className="project-barrel-static">
        {workstreams.map((ws) => (
          <WorkstreamRow key={ws.title} workstream={ws} />
        ))}
      </div>
    </div>
  );
}
