export type ProjectCategory =
  | "Data Engineering"
  | "AI & GenAI"
  | "Software Engineering"
  | "Full-Stack"
  | "Data Analytics & ML";

export type ProjectLink = {
  label: string;
  href: string;
  kind: "repo" | "docs" | "demo" | "data";
};

export type ProjectSection = {
  heading: string;
  body: string[];
};

export type MediaKind =
  | "screenshot"
  | "website"
  | "code"
  | "architecture"
  | "dashboard"
  | "product"
  | "team"
  | "event"
  | "documentation"
  | "portrait";

export type MediaAsset = {
  kind: MediaKind;
  /** Path under /public once the real file is added. Omit to render the placeholder. */
  src?: string;
  alt: string;
  caption?: string;
  aspect?: "16/9" | "4/3" | "1/1" | "3/2" | "3/4";
};

export type Achievement = {
  rank: string;
  event: string;
  organizer: string;
  year: string;
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  categories: ProjectCategory[];
  technologies: string[];
  role: string;
  context: string;
  featured: boolean;
  status:
    | "Shipped internally"
    | "In progress"
    | "Proof of concept"
    | "Completed"
    | "Award winner"
    | "Product in development";
  achievement?: Achievement;
  /** Live site URL, once the project is hosted. Rendered as its own
   * "Website" link alongside `links` when set; omitted entirely until then
   * — no code changes needed to add it later. */
  websiteUrl?: string;
  links: ProjectLink[];
  sections: ProjectSection[];
  metrics?: { label: string; value: string }[];
  cover: MediaAsset;
  gallery?: MediaAsset[];
};

export type Workstream = {
  title: string;
  /** One-line summary shown in the compact, scannable list. */
  oneLiner: string;
  technologies: string[];
  projectSlug?: string;
  /** Shown only when the workstream is expanded. */
  context?: string;
  contribution?: string;
  media?: MediaAsset[];
};

export type ExperienceItem = {
  org: string;
  orgUrl?: string;
  role: string;
  employmentType: string;
  workMode: string;
  duration: string;
  start: string;
  end: string;
  /** Optional intro paragraph shown above `highlightGroups`. Some entries
   * (e.g. AIC) intentionally have no separate intro, only the bullets. */
  summary?: string;
  /** Compact, scannable responsibility/achievement bullets, clustered into
   * labeled groups (e.g. "Delivered" vs "Platform & exposure") so a longer
   * bullet list still scans quickly. Supports `**bold**` markdown-style
   * emphasis within each bullet for selectively highlighting key terms. */
  highlightGroups?: { label: string; items: string[] }[];
  workstreams: Workstream[];
  technologies: string[];
};

export type ActivityEntry = {
  org: string;
  orgUrl?: string;
  role: string;
  start: string;
  end: string;
  detail?: string[];
  /** Optional single photo shown alongside this entry (e.g. a volunteering
   * activity photo). Renders a placeholder until `src` is set. */
  photo?: MediaAsset;
};

export type HackathonEntry = {
  name: string;
  result: string;
  date: string;
  organizer: string;
  team?: string;
  problem: string;
  solution: string[];
  contribution: string;
  /** Slug of the matching entry in `projects`, when this hackathon result
   * has a full case study — makes the achievement clickable through to it. */
  projectSlug?: string;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export type LanguageEntry = {
  name: string;
  proficiency?: string;
};

export type SchoolLevel = {
  grade: string;
  board: string;
  result?: string;
};

export type ActivityItem = {
  label: string;
  /** Expandable tenure history, shown nested under the activity itself. */
  history?: ActivityEntry[];
};

export type EducationEntry = {
  institution: string;
  institutionUrl?: string;
  degree?: string;
  start?: string;
  end: string;
  activities: ActivityItem[];
  coursework: string[];
  levels?: SchoolLevel[];
  /** Optional row of photos shown at the bottom of the box; renders as
   * labeled placeholders until real images are added under /public. */
  photos?: MediaAsset[];
};

export type CertificationEntry = {
  name: string;
  issuer?: string;
  date?: string;
  url?: string;
};

export type SubstackPost = {
  title: string;
  url: string;
  publishedAt: string;
  excerpt?: string;
};
