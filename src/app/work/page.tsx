import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { WorkIndex } from "@/components/WorkIndex";
import { projects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "All projects",
  description: "Every case study: data pipelines, lakehouses, and full-stack products.",
};

export default function WorkPage() {
  return (
    <Container className="max-w-6xl pb-24 pt-32 sm:pt-40">
      <Link
        href="/"
        className="font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-accent-strong"
      >
        ← Back to the story
      </Link>
      <p className="mt-10 flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.24em] text-accent-strong">
        <span className="h-px w-10 bg-accent" />
        <span className="text-ink">All projects</span>
      </p>
      <h1 className="mt-5 text-[clamp(2.4rem,7vw,5.2rem)] font-black uppercase leading-[0.95] tracking-tight text-ink">
        {projects.length} case studies,
        <br />
        <span className="text-accent-strong">no filler.</span>
      </h1>
      <p className="mt-5 max-w-xl text-ink-muted">
        Pipelines, lakehouses and full-stack products. Open any card for the problem, the architecture and what actually
        shipped.
      </p>
      <div className="mt-12">
        <WorkIndex />
      </div>
    </Container>
  );
}
