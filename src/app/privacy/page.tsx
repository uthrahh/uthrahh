import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/ui";
import { site } from "@/lib/data/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this site handles data.",
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-2xl pb-16 pt-32 sm:pb-20 sm:pt-36">
      <SectionHeading eyebrow="Legal" title="Privacy" />
      <div className="prose-body mt-8 space-y-5 text-base leading-relaxed text-ink-muted">
        <p>
          This is a static personal portfolio. It does not use cookies, does
          not run analytics, and does not have a login, database, or contact
          form that stores anything you submit.
        </p>
        <p>
          The site is hosted on standard web infrastructure, which may keep
          ordinary server logs (such as IP address and request time) for
          operational and security purposes, consistent with the hosting
          provider&apos;s own policy.
        </p>
        <p>
          Links to LinkedIn and GitHub take you to third-party sites governed
          by their own privacy policies. Emailing{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-ink underline decoration-border-strong underline-offset-4 hover:text-accent-strong hover:decoration-accent"
          >
            {site.email}
          </a>{" "}
          sends your message through your own email provider; it isn&apos;t
          collected by this site.
        </p>
        <p>
          If this policy changes materially (for example if a contact form
          or analytics is added later), this page will be updated to reflect
          it.
        </p>
      </div>
    </Container>
  );
}
