"use client";

import { useState } from "react";

/**
 * Hero profile photo. Rendered as a CSS background layer instead of an
 * <img>, so there is no native "Save image as" menu item, no direct
 * drag-out, and no bare anchor to the raw file — a deterrent against
 * casual copying, not a guarantee. A browser can never fully stop someone
 * from screenshotting or otherwise capturing a rendered image, and this
 * makes no claim to.
 *
 * A visually-hidden probe <img> (pointer-events disabled, not focusable,
 * zero-size) detects whether the file actually loads, so a missing photo
 * still falls back to a labeled placeholder instead of a blank box.
 */
export function ProtectedPhoto({
  src,
  alt,
  className = "",
  shapeClassName = "aspect-square rounded-full",
}: {
  src: string;
  alt: string;
  className?: string;
  /** Aspect + corner treatment; defaults to the original round avatar. */
  shapeClassName?: string;
}) {
  const [errored, setErrored] = useState(false);
  const showImage = !errored;

  return (
    <div
      className={`relative select-none overflow-hidden border border-border bg-paper-sunken ${shapeClassName} ${className}`}
    >
      {showImage ? (
        <div
          role="img"
          aria-label={alt}
          onContextMenu={(e) => e.preventDefault()}
          className="h-full w-full bg-cover bg-top"
          style={{ backgroundImage: `url(${src})` }}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="media-placeholder absolute inset-0 flex flex-col items-center justify-center gap-2.5 border border-dashed border-border-strong bg-paper-sunken text-ink-faint"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
            <circle cx="11" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
            <path
              d="M4 19c0-4 3-7 7-7s7 3 7 7"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-widest">Profile photo</span>
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        tabIndex={-1}
        draggable={false}
        onError={() => setErrored(true)}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
    </div>
  );
}
