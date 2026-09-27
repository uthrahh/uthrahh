"use client";

import { useEffect, useRef } from "react";
import { MediaFrame } from "@/components/MediaFrame";
import { AwardBlock } from "@/components/AwardBadge";
import { Tag } from "@/components/ui";
import type { Project } from "@/lib/types";

const statusLabel: Record<Project["status"], string> = {
  "Shipped internally": "Shipped internally",
  "In progress": "In progress",
  "Proof of concept": "Proof of concept",
  Completed: "Completed",
  "Award winner": "Award winner",
  "Product in development": "Product in development",
};

/** A section's body is one flowing paragraph when it has a single entry,
 * or a scannable bulleted list when it has several — the latter is how
 * most "Key engineering decisions" / "Architecture" sections are actually
 * shaped (a handful of discrete points), and reads far better as bullets
 * than as back-to-back paragraphs. */
function SectionBody({ body }: { body: string[] }) {
  if (body.length <= 1) {
    return <p className="text-[14px] leading-relaxed text-ink-muted">{body[0]}</p>;
  }
  return (
    <ul className="space-y-2.5">
      {body.map((paragraph, i) => (
        <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-muted">
          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
          <span>{paragraph}</span>
        </li>
      ))}
    </ul>
  );
}

export function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
    } else if (!project && dialog.open) {
      dialog.close();
    }
  }, [project]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="m-0 h-full max-h-full w-full max-w-full border-0 bg-transparent p-0 backdrop:bg-black/55 backdrop:backdrop-blur-md open:animate-none"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {project ? (
        <div className="glass-modal mx-auto flex h-full max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-none border border-border bg-[#141411]/95 backdrop-blur-xl shadow-2xl lg:my-6 lg:h-[calc(100%-3rem)] lg:rounded-2xl">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-8">
            <p className="font-mono text-xs uppercase tracking-widest text-ink-faint">
              Case study
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-ink-muted transition-colors hover:border-accent hover:text-accent-strong"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="overflow-y-auto px-5 py-8 sm:px-8">
            <div className="flex flex-wrap items-center gap-2">
              {project.categories.map((c) => (
                <Tag key={c}>{c}</Tag>
              ))}
              <span className="font-mono text-xs uppercase tracking-wide text-ink-faint">
                {statusLabel[project.status]}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-[2.4rem]">
              {project.title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
              {project.summary}
            </p>

            {project.achievement ? (
              <div className="mt-6">
                <AwardBlock achievement={project.achievement} />
              </div>
            ) : null}

            {project.metrics ? (
              <div className="mt-6 rounded-xl border border-border bg-paper-raised p-5">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
                  Impact
                </p>
                <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                  {project.metrics.map((m) => (
                    <div key={m.label}>
                      <dd className="text-lg font-bold text-ink">{m.value}</dd>
                      <dt className="text-sm text-ink-muted">{m.label}</dt>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6">
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-faint">
                Techstack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-border py-6 sm:grid-cols-3">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">Role</dt>
                <dd className="mt-1 text-sm text-ink">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">Context</dt>
                <dd className="mt-1 text-sm text-ink">{project.context}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-wide text-ink-faint">Links</dt>
                <dd className="mt-1 flex flex-col gap-1">
                  {project.websiteUrl ? (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent-strong underline underline-offset-4 hover:text-accent"
                    >
                      Website ↗
                    </a>
                  ) : null}
                  {project.links.length ? (
                    project.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent-strong underline underline-offset-4 hover:text-accent"
                      >
                        {l.label} ↗
                      </a>
                    ))
                  ) : project.websiteUrl ? null : (
                    <span className="text-sm text-ink-faint">No public repository</span>
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <MediaFrame asset={{ ...project.cover, aspect: "16/9" }} priority />
              {project.gallery?.length ? (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {project.gallery.map((asset, i) => (
                    <MediaFrame key={i} asset={asset} />
                  ))}
                </div>
              ) : null}
            </div>

            <div className="mt-10 max-w-2xl space-y-8">
              {project.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-xl font-bold tracking-tight text-ink">{section.heading}</h2>
                  <div className="mt-3">
                    <SectionBody body={section.body} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
