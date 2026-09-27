import Link from "next/link";
import { Container } from "@/components/Container";
import { site } from "@/lib/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-4 py-8 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono">
          <span className="text-accent-strong">~/uthrahh</span> · © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="hidden font-mono md:inline">
            Press <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px]">/</kbd> to search
          </span>
          <Link href="/privacy" className="hover:text-ink">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-ink">
            Terms
          </Link>
        </div>
      </Container>
    </footer>
  );
}
