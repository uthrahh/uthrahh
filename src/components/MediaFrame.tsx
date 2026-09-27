"use client";

import { useEffect, useRef, useState } from "react";
import type { MediaAsset, MediaKind } from "@/lib/types";

const KIND_LABEL: Record<MediaKind, string> = {
  screenshot: "Project screenshot",
  website: "Website screenshot",
  code: "Code snapshot",
  architecture: "Architecture",
  dashboard: "Dashboard",
  product: "Product UI",
  team: "Team photo",
  event: "Event photo",
  documentation: "Documentation",
  portrait: "Profile photo",
};

const ASPECT_CLASS: Record<NonNullable<MediaAsset["aspect"]>, string> = {
  "16/9": "aspect-[16/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
  "3/4": "aspect-[3/4]",
};

function KindIcon({ kind }: { kind: MediaKind }) {
  const common = { stroke: "currentColor", strokeWidth: 1.2, fill: "none" } as const;
  switch (kind) {
    case "screenshot":
    case "website":
    case "product":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <rect x="2" y="4" width="18" height="14" rx="1" {...common} />
          <path d="M2 8h18" {...common} />
          <circle cx="5" cy="6" r="0.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case "code":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <path d="M8 5 3 11l5 6M14 5l5 6-5 6" {...common} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "architecture":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <rect x="2" y="3" width="6" height="4" {...common} />
          <rect x="14" y="3" width="6" height="4" {...common} />
          <rect x="8" y="15" width="6" height="4" {...common} />
          <path d="M5 7v4h12V7M11 11v4" {...common} />
        </svg>
      );
    case "dashboard":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <path d="M4 17V9M11 17V4M18 17v-6" {...common} strokeLinecap="round" />
          <path d="M2 19h18" {...common} strokeLinecap="round" />
        </svg>
      );
    case "team":
    case "event":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <circle cx="8" cy="8" r="3" {...common} />
          <circle cx="15" cy="9" r="2.4" {...common} />
          <path d="M3 18c0-3 2.5-5 5-5s5 2 5 5M13 18c.3-2.2 1.8-4 4-4s4.2 1.6 4.5 4" {...common} strokeLinecap="round" />
        </svg>
      );
    case "documentation":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <path d="M6 2h7l4 4v14H6z" {...common} strokeLinejoin="round" />
          <path d="M13 2v4h4" {...common} strokeLinejoin="round" />
          <path d="M8.5 12h6M8.5 15h6" {...common} strokeLinecap="round" />
        </svg>
      );
    case "portrait":
      return (
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
          <circle cx="11" cy="8.5" r="3.5" {...common} />
          <path d="M4 19c0-4 3-7 7-7s7 3 7 7" {...common} strokeLinecap="round" />
        </svg>
      );
  }
}

function Placeholder({ asset }: { asset: MediaAsset }) {
  return (
    <div
      role="img"
      aria-label={asset.alt}
      className="media-placeholder absolute inset-0 flex flex-col items-center justify-center gap-2.5 rounded-lg border border-dashed border-border-strong bg-paper-sunken text-ink-faint"
    >
      <KindIcon kind={asset.kind} />
      <span className="font-mono text-[10px] uppercase tracking-widest">
        {KIND_LABEL[asset.kind]}
      </span>
    </div>
  );
}

/**
 * Full-size lightbox for a single MediaAsset. Mirrors the accessible
 * <dialog> pattern already used by ProjectDetailModal: native showModal(),
 * Escape and backdrop-click close for free, focus restored to the trigger
 * on close. The image renders with object-contain so its true aspect ratio
 * is preserved instead of the cropped object-cover used in card/frame view.
 */
function Lightbox({
  asset,
  open,
  onClose,
}: {
  asset: MediaAsset;
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Mirrors ProjectDetailModal: the <dialog> stays mounted and is driven
  // imperatively via showModal()/close() rather than being mounted only
  // while open. Closing it this way (instead of unmounting the element)
  // is what makes the browser restore focus to the trigger button and
  // fire the native "close" event for Escape/backdrop-click.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  // Explicit Escape handling alongside the native <dialog> behavior, since
  // native support for closing a modal dialog on Escape is inconsistent
  // enough across browsers/automation not to rely on alone.
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={asset.alt}
      className="m-0 h-full max-h-full w-full max-w-full border-0 bg-transparent p-0 backdrop:bg-ink/65 backdrop:backdrop-blur-md open:animate-none"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      {open ? (
        <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-10">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/85 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/55 hover:text-white sm:right-5 sm:top-5"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={asset.src}
            alt={asset.alt}
            className="max-h-full max-w-full rounded-lg object-contain"
          />
        </div>
      ) : null}
    </dialog>
  );
}

/**
 * Renders `asset.src` when it loads successfully; falls back to the
 * labeled placeholder automatically if the file is missing (404) or not
 * yet provided. This means media paths can be filled in ahead of time
 * (see MEDIA_CHECKLIST.md) and start rendering the instant the real file
 * is dropped into /public, with no code changes.
 */
export function MediaFrame({
  asset,
  className = "",
  imgClassName = "",
  priority = false,
  fill = false,
  lightbox = true,
}: {
  asset: MediaAsset;
  className?: string;
  /** Extra classes on the rendered <img> itself, e.g. a hover scale transition. */
  imgClassName?: string;
  priority?: boolean;
  /** Render as an absolutely-positioned layer filling its parent, instead of
   * owning its own aspect-ratio box. Use when the parent element (e.g. a
   * product-style card) already defines the box and the image is a
   * background layer with content stacked on top of it. */
  fill?: boolean;
  /** Clicking the image opens it in a larger lightbox view. Defaults to
   * true; set false when the image already sits inside its own click
   * target (e.g. a card whose click opens a full detail view). Has no
   * effect in `fill` mode, which never gets a lightbox trigger. */
  lightbox?: boolean;
}) {
  const [errored, setErrored] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const aspectClass = ASPECT_CLASS[asset.aspect ?? "4/3"];
  const showImage = Boolean(asset.src) && !errored;
  const canEnlarge = showImage && !fill && lightbox;

  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={asset.src}
      alt={asset.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setErrored(true)}
      className={`h-full w-full object-cover ${imgClassName}`}
    />
  );

  const frame = (
    <div
      className={
        fill
          ? "absolute inset-0 overflow-hidden bg-paper-sunken"
          : `relative overflow-hidden rounded-lg border border-border bg-paper-sunken ${aspectClass}`
      }
    >
      {showImage ? (
        canEnlarge ? (
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label={`View larger image: ${asset.alt}`}
            className="block h-full w-full cursor-zoom-in"
          >
            {img}
          </button>
        ) : (
          img
        )
      ) : (
        <Placeholder asset={asset} />
      )}
    </div>
  );

  const wrapped = fill ? (
    <div className={className}>{frame}</div>
  ) : (
    <figure className={className}>
      {frame}
      {asset.caption ? (
        <figcaption className="mt-2 text-xs text-ink-faint">{asset.caption}</figcaption>
      ) : null}
    </figure>
  );

  return (
    <>
      {wrapped}
      {canEnlarge ? (
        <Lightbox asset={asset} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />
      ) : null}
    </>
  );
}
