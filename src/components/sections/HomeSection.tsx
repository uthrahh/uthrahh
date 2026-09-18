"use client";

import { Container } from "@/components/Container";
import { RoleCylinder } from "@/components/RoleCylinder";
import { TextCylinder } from "@/components/TextCylinder";
import { EmailCopy } from "@/components/EmailCopy";
import { ProtectedPhoto } from "@/components/ProtectedPhoto";
import { useResumeModal } from "@/components/ResumeModalProvider";
import { site } from "@/lib/data/site";

const SIGNATURE_STACK = [
  "Python",
  "SQL",
  "PySpark",
  "Databricks",
  "Power BI",
  "Django",
  "FastAPI",
  "React",
  "PostgreSQL",
  "Docker",
  "Pandas",
  "NumPy",
  "RAG",
  "Git / GitHub",
];

const CONTACT_LINK_STYLE = "text-accent-strong hover:text-accent";

export function HomeSection() {
  const openResumeModal = useResumeModal();

  return (
    <section
      id="home"
      className="relative flex h-[100svh] min-h-[680px] flex-col justify-between overflow-hidden border-b border-border"
    >
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 0%, var(--paper) 85%)",
        }}
        aria-hidden="true"
      />

      <Container className="relative flex flex-1 flex-col justify-center py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
          <div className="min-w-0">
            <h1 className="font-display text-3xl leading-[1.08] text-ink sm:text-4xl md:text-[3.2rem]">
              {site.name}
            </h1>

            {/* Name, roles, and skills share one consistent vertical rhythm;
                the gap before the prose summary is deliberately larger to
                separate the identity/tech-stack block from the paragraph. */}
            <div className="mt-4 sm:mt-5">
              <RoleCylinder />
            </div>

            <div className="mt-4 max-w-md sm:mt-5">
              <TextCylinder
                items={SIGNATURE_STACK}
                textClassName="font-mono text-xs uppercase tracking-widest text-ink-faint sm:text-[13px]"
                heightEm={1}
                durationSeconds={26}
                perspective={1500}
                reverse
              />
            </div>

            <p className="mt-8 max-w-xl text-[14px] leading-relaxed text-ink-muted sm:mt-10 sm:text-[15px]">
              I&apos;m a Computer Science &amp; Engineering candidate at{" "}
              <span className="font-medium text-ink">Vellore Institute of Technology, Chennai</span>{" "}
              (graduating 2027), with a <span className="font-medium text-ink">data engineering</span>{" "}
              focus: building the pipelines and infrastructure that turn raw
              data into something a business can act on. My internships and projects center on data
              engineering on Databricks, extended by backend systems in Django and FastAPI and applied
              machine learning, alongside two years of leadership running a 250+ member technical
              community at VIT Chennai.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <EmailCopy email={site.email} className={CONTACT_LINK_STYLE} />
              <span className="text-border-strong">·</span>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${CONTACT_LINK_STYLE}`}
              >
                LinkedIn
              </a>
              <span className="text-border-strong">·</span>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors ${CONTACT_LINK_STYLE}`}
              >
                GitHub
              </a>
              {site.resumeAvailable ? (
                <>
                  <span className="text-border-strong">·</span>
                  <button
                    type="button"
                    onClick={openResumeModal}
                    className={`transition-colors ${CONTACT_LINK_STYLE}`}
                  >
                    Resume ↗
                  </button>
                </>
              ) : null}
            </div>
          </div>

          <div className="relative mx-auto shrink-0 lg:mx-0">
            <ProtectedPhoto
              src="/profilephoto.jpg"
              alt={`Portrait of ${site.name}`}
              className="relative w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
