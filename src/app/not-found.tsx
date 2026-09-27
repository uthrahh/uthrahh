import { Container } from "@/components/Container";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-start justify-center pb-20 pt-32">
      <p className="font-mono text-xs uppercase tracking-widest text-accent">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-base text-ink-muted">
        The link might be outdated, or the page moved. Try the projects page
        or head back home.
      </p>
      <div className="mt-8 flex gap-4">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/projects" variant="secondary">
          Projects
        </ButtonLink>
      </div>
    </Container>
  );
}
