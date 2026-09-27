import Link from "next/link";
import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-muted">
      {children}
    </span>
  );
}

/**
 * Numbered section header: `01  Title ———•——— caption`. Mirrors the section
 * headers in the GitHub profile README. `eyebrow` is kept as the fallback
 * title so older call sites keep working.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  caption,
  description,
}: {
  index?: string;
  eyebrow?: string;
  title?: string;
  caption?: string;
  description?: string;
}) {
  const heading = title || eyebrow || "";
  return (
    <div data-reveal="">
      <div className="flex items-center gap-4 sm:gap-5">
        {index ? (
          <span className="font-mono text-sm font-medium text-accent-strong">{index}</span>
        ) : null}
        <h2 className="shrink-0 text-[1.7rem] font-bold leading-none tracking-tight text-ink sm:text-[2.1rem]">
          {heading}
        </h2>
        <span aria-hidden="true" className="relative hidden h-px flex-1 bg-border-strong sm:block">
          <span className="rule-dot absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong" />
        </span>
        {caption ? (
          <span className="hidden shrink-0 font-mono text-xs text-ink-faint md:block">{caption}</span>
        ) : null}
      </div>
      {description ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}

/** Standard vertical rhythm + anchor offset for a top-level section. */
export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-16 sm:py-24 ${className}`}>
      {children}
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-sm px-5 py-2.5 text-sm font-medium transition-colors min-h-11";
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-accent-strong"
      : "border border-border-strong text-ink hover:border-accent hover:text-accent-strong";

  const extProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link href={href} className={`${base} ${styles}`} {...extProps}>
      {children}
    </Link>
  );
}

export function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
