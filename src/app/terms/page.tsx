import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/ui";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for this site.",
};

export default function TermsPage() {
  return (
    <Container className="max-w-2xl pb-16 pt-32 sm:pb-20 sm:pt-36">
      <SectionHeading eyebrow="Legal" title="Terms of use" />
      <div className="prose-body mt-8 space-y-5 text-base leading-relaxed text-ink-muted">
        <p>
          This site is a personal portfolio belonging to {site.name}. Its
          content (project write-ups, resume information, and design) is
          shared for the purpose of professional review and is not licensed
          for reuse or republication without permission.
        </p>
        <p>
          Project descriptions reflect my own work and documentation at the
          time of writing. Where a project is explicitly marked as a
          prototype, proof of concept, or in progress, treat that status as
          current and accurate rather than a finished product.
        </p>
        <p>
          External links (GitHub, LinkedIn, employer and university sites)
          point to third parties I don&apos;t control, and I&apos;m not
          responsible for their content or availability.
        </p>
        <p>
          This site is provided as-is, without warranty of any kind. If you
          spot an error or broken link, I&apos;d appreciate a note at{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-ink underline decoration-border-strong underline-offset-4 hover:text-accent-strong hover:decoration-accent"
          >
            {site.email}
          </a>
          .
        </p>
      </div>
    </Container>
  );
}
