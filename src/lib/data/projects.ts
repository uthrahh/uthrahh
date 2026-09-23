import type { Project } from "@/lib/types";

// Media convention: drop new project images into /public named
// `<slug>-cover.<ext>` or `<slug>-gallery-1.<ext>`, `<slug>-gallery-2.<ext>`,
// etc. (slug = this array's `slug` field), then set that exact path as the
// matching asset's `src` below. MediaFrame already renders a labeled
// placeholder for any asset with no `src` (or a `src` that 404s), so this is
// the only edit needed per photo — no other code changes.
export const projects: Project[] = [
  // ============================================================
  // TEMPLATE — copy a new project from here. No coding needed.
  // ============================================================
  // HOW TO ADD A NEW PROJECT:
  // 1. Select everything inside the comment block directly below
  //    this note (the whole { ... } object, including the opening
  //    and closing braces and the trailing comma).
  // 2. Paste it anywhere in this array — right here, right above
  //    the closing "]" at the bottom, wherever.
  // 3. Delete the two comment markers around your PASTED COPY only.
  //    Leave this original template exactly as it is, so it's still
  //    here the next time you need it.
  // 4. Replace every <LIKE THIS> placeholder with your own text.
  // 5. Save the file. That's the whole process — no other files or
  //    code need to change.
  /*
  {
    // A short, web-safe id — lowercase, words separated by hyphens,
    // no spaces. Must be unique. Used internally to link things
    // (like a workstream in experience.ts) to this project.
    slug: "<my-new-project>",

    // The project's display title (card heading + case-study heading).
    title: "<My New Project>",

    // One to two sentences: the "elevator pitch," shown on the card
    // and at the top of the case study.
    summary: "<What is this project, in one or two sentences?>",

    // One or more tags shown at the top of the project card.
    // Pick any of: "Data Engineering" | "AI & GenAI" |
    // "Software Engineering" | "Full-Stack" | "Data Analytics & ML"
    categories: ["Software Engineering"],

    // Plain list of technologies/tools used — shown as chips.
    technologies: ["<Tech 1>", "<Tech 2>", "<Tech 3>"],

    // Your role, e.g. "Sole developer", "Backend engineer (solo)",
    // "Team project".
    role: "<Sole developer>",

    // Short context for where/why this was built, e.g.
    // "Independent project", "Hackathon", or an internship name.
    context: "<Independent project>",

    // true = appears earlier/more prominently in the grid.
    // false = still shown, just not prioritized.
    featured: false,

    // Pick exactly one of: "Shipped internally" | "In progress" |
    // "Proof of concept" | "Completed" | "Award winner" |
    // "Product in development"
    status: "Completed",

    // OPTIONAL — delete this whole block if it doesn't apply.
    // Only for a hackathon/competition win — shows an award ribbon
    // on the card.
    // achievement: {
    //   rank: "1st Place",
    //   event: "<Hackathon name>",
    //   organizer: "<Who ran it>",
    //   year: "<2026>",
    // },

    // OPTIONAL — delete this line if there's no live/hosted version.
    // When set, a "Website" link appears automatically in the case
    // study — no other changes needed.
    // websiteUrl: "https://example.com",

    // Links shown in the case study. `kind` is one of:
    // "repo" | "docs" | "demo" | "data"
    links: [
      { label: "Repository", href: "https://github.com/<you>/<repo>", kind: "repo" },
    ],

    // The case-study body: one or more sections, each with a
    // heading and one or more paragraphs. Each string in `body` is
    // its own paragraph — list more than one and they render as a
    // bulleted list instead of paragraphs.
    sections: [
      {
        heading: "Problem",
        body: ["<What problem was this project solving?>"],
      },
      {
        heading: "Solution",
        body: ["<What did you build, and how does it work?>"],
      },
    ],

    // OPTIONAL — delete this whole block if you don't have concrete
    // numbers to show. Renders as a small stats row in the case study.
    // metrics: [
    //   { label: "<Metric name>", value: "<Metric value>" },
    // ],

    // The main image on the card and at the top of the case study.
    // `kind` picks the placeholder icon/label shown until a real
    // image exists: "screenshot" | "website" | "code" |
    // "architecture" | "dashboard" | "product" | "team" | "event" |
    // "documentation" | "portrait"
    // `aspect` is one of: "16/9" | "4/3" | "1/1" | "3/2" | "3/4"
    // Leave `src` out entirely until the real image file exists
    // under /public — a labeled placeholder shows automatically
    // until then, so nothing ever looks broken in the meantime.
    cover: {
      kind: "screenshot",
      // src: "/my-new-project-cover.png",  // add once the file exists in /public
      alt: "<Describe what this image shows, for accessibility>",
      aspect: "4/3",
    },

    // OPTIONAL — delete this whole block if there are no extra
    // images. Same shape as `cover`, just a list — add as many as
    // you like.
    // gallery: [
    //   { kind: "screenshot", alt: "<Describe this image>", aspect: "4/3" },
    // ],
  },
  */
  // ============================================================
  // END TEMPLATE — real projects start below
  // ============================================================
  {
    slug: "autcore",
    title: "AutCore",
    summary:
      "An AI-driven autism screening and risk-assessment tool combining oculomotor and facial-behavior analysis, speech and language disfluency analysis, and a conversational screening assistant.",
    categories: ["AI & GenAI", "Data Analytics & ML"],
    technologies: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "MediaPipe",
      "React",
      "Next.js",
      "FastAPI",
      "Speech Analysis",
      "Deep Learning",
      "Computer Vision",
    ],
    role: "AI/ML engineer and web dev",
    context: "Hackathon",
    featured: true,
    status: "Award winner",
    achievement: {
      rank: "1st Place",
      event: "HackHub'25",
      organizer: "IEEE CompSoc VIT-C, GitHub & Devfolio",
      year: "2025",
    },
    cover: {
      kind: "team",
      src: "/autcore-gallery-2.jpeg",
      alt: "Team Perry the Platypus celebrating AutCore's 1st place win at HackHub'25",
      aspect: "16/9",
    },
    gallery: [
      {
        kind: "team",
        src: "/autcore-gallery-3.jpeg",
        alt: "Team demonstrating AutCore to a judge at HackHub'25",
        aspect: "4/3",
      },
    ],
    links: [],
    sections: [
      {
        heading: "Problem",
        body: [
          "Autism screening today is largely subjective and clinically bottlenecked, leaving early signs unassessed for long stretches without a specialist visit. The team set out to make a first-pass screening faster, more objective, and available without one.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "AutCore combines four components into a single screening flow: oculomotor and facial-behavior analysis using computer vision, AI-powered speech and language disfluency analysis, intelligent symptom profiling that turns those signals into a structured risk evaluation, and a conversational assistant that guides the user through the screening and explains the result.",
        ],
      },
      {
        heading: "My contribution",
        body: [
          "Built the web platform: integrating the computer-vision and speech models behind a real-time interface, handling session state through the multi-step screening flow, and presenting the risk evaluation in a way a non-clinical user could understand.",
        ],
      },
      {
        heading: "Working under pressure",
        body: [
          "The team joined the 36-hour hackathon 12 hours after it started, leaving 24 hours to design, build, and ship a complete, judged product.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Placed 1st out of 500 teams that entered HackHub'25, with 60 reaching the final round, as Team Perry the Platypus (with Prannavakhanth A and Lohita Lakshmi L.S), judged by IEEE Computer Society VIT Chennai with GitHub and Devfolio as sponsors.",
        ],
      },
    ],
  },
  {
    slug: "abov-hr",
    title: "Abov: Career & Hiring Platform",
    summary:
      "A career platform unifying job search, career guidance, and skill-building for candidates with a hiring pipeline and match scoring for employers.",
    categories: ["Full-Stack", "Software Engineering"],
    technologies: ["Next.js 16", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma", "Auth.js"],
    role: "Sole developer",
    context: "Independent product, in development",
    featured: true,
    status: "Product in development",
    websiteUrl: "https://abovhr.vercel.app",
    cover: {
      kind: "website",
      src: "/abov-hr-cover.svg",
      alt: "Abov homepage: job search, recently posted roles, and career-guidance features",
      aspect: "16/9",
    },
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/AbovHR", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Job search, understanding whether a role actually fits, closing the skill gaps standing in the way, and — on the other side — hiring against transparent match data instead of guesswork are typically scattered across separate tools with no shared thread between them.",
        ],
      },
      {
        heading: "What it does",
        body: [
          "Candidate side: search real openings by skill/location/work mode, a career-guidance assessment surfacing potential role paths, and structured skill-building roadmaps toward a target role.",
          "Employer side: post jobs, track applicants through a hiring pipeline, and see match scores between candidates and roles instead of manually screening resumes.",
          "Role-based access spans four account types — Candidate, Employer, Institution admin, and platform Admin — each with a distinct view into the same underlying data.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Next.js 16 (App Router, Turbopack) with a PostgreSQL database via Prisma, and Auth.js v5 handling credentials-based auth with JWT sessions across all four roles.",
        ],
      },
      {
        heading: "Engineering practice",
        body: [
          "Documented beyond the code itself: a system-architecture doc (schema, RBAC model, API surface, and what's explicitly not implemented yet), a data-flow and third-party-dependency inventory, an accessibility/SEO/performance/security self-audit, a legal and IP risk register, and a deployment checklist — the kind of documentation set usually associated with a team handoff, written solo.",
        ],
      },
      {
        heading: "Status",
        body: [
          "Under active development, not yet deployed to production. The live demo is seeded with fictional job listings, companies, and accounts for evaluation only — real data has never touched it.",
        ],
      },
    ],
  },
  {
    slug: "aic-erp",
    title: "Startup Incubation ERP",
    summary:
      "A modular, role-based ERP that replaced spreadsheets, email, and WhatsApp as the system of record for a startup incubation centre.",
    categories: ["Software Engineering"],
    technologies: ["Python", "Django", "Django ORM", "PostgreSQL", "Bootstrap 5", "ReportLab", "OpenPyXL"],
    role: "Backend engineer (solo)",
    context: "Software Development Engineer Internship, AIC - Crescent Innovation and Incubation Council",
    featured: true,
    status: "Shipped internally",
    cover: {
      kind: "website",
      src: "/aic-erp-cover.jpeg",
      alt: "AIC-CIIC public website, part of the ERP platform's shipped scope",
      aspect: "16/9",
    },
    gallery: [
      { kind: "screenshot", alt: "Startup application review workflow", aspect: "4/3" },
      { kind: "architecture", src: "/aic-erp-gallery-2.svg", alt: "AIC ERP RBAC and module architecture", aspect: "4/3" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/AIC-Enterprise-Resource-Planning", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "AIC - Crescent Innovation and Incubation Council ran the entire startup lifecycle (applications, onboarding, lab and hall bookings, mentorship, services, and finance) through spreadsheets, email threads, and WhatsApp. There was no single source of truth, no audit trail, and no way to see incubation-wide metrics without manually reconciling records across tools.",
        ],
      },
      {
        heading: "Objective",
        body: [
          "Build a centralized, role-based web platform covering the full startup lifecycle for five distinct roles (Public User, Applicant, Startup, Mentor, Administrator), replacing manual processes while remaining extensible for future modules the incubation team hadn't scoped yet.",
        ],
      },
      {
        heading: "Solution & architecture",
        body: [
          "Built on Django with a PostgreSQL backend, organized into eleven Django apps by domain: accounts, applications, startups, labs, halls, mentors, mentorship, services, finance, feedback, and audit. Each module evolves independently without cross-contaminating models.",
          "Role-based access control gates every module through decorators and middleware. A permission matrix covers more than 30 resource types across four authenticated roles (view, create, edit, manage, full access), enforced consistently rather than left to ad-hoc view-level checks.",
          "The data model tracks a startup's full profile (founders, employees, financials, funding rounds, loans, IPR, bank details, social links) as normalized child tables under a single startup record. Dashboards and reports are computed dynamically from these tables instead of maintained by hand.",
        ],
      },
      {
        heading: "Key engineering decisions",
        body: [
          "Startup financial and lifecycle data (funding, valuation, IPR, awards) was modeled as separate related tables rather than JSON blobs on the startup record, keeping it queryable for the dashboard aggregates the incubation team needed: funding stage breakdowns, IPR counts, jobs created.",
          "Lab and equipment booking treats equipment availability independently per item, so a startup can book one piece of equipment in a lab even while other equipment in the same lab is in use elsewhere. This came from a specific requirement in how the physical labs are actually used.",
          "Application review supports an explicit On Hold state distinct from Rejected, which routes the applicant to a mentor for improvement and re-evaluation rather than a hard rejection, modeling the incubation centre's actual decision workflow rather than a generic approve/reject binary.",
        ],
      },
      {
        heading: "What shipped vs. what's pending",
        body: [
          "Shipped: authentication and RBAC, the public website, the full startup application workflow, startup profile management, the startup directory, laboratory and equipment management with Excel import, lab and conference hall booking with calendar views, service requests, feedback and complaints, and audit logging.",
          "Documented as pending at handover: payment gateway integration, automated invoice generation, the quarterly financial-update reminder workflow, mentor scheduling, and the advanced analytics dashboard, captured explicitly in the handover documentation for the next contributor rather than left undocumented.",
        ],
      },
    ],
  },
  {
    slug: "aic-facility-booking",
    title: "Facility Booking System",
    summary:
      "A booking backend for labs, equipment, and conference halls serving 140+ incubated startups, with conflict detection and an approval workflow.",
    categories: ["Software Engineering"],
    technologies: ["Python", "Django 6", "PostgreSQL", "Bootstrap 5", "JavaScript"],
    role: "Backend engineer (solo)",
    context: "Software Development Engineer Internship, AIC - Crescent Innovation and Incubation Council",
    featured: false,
    status: "Shipped internally",
    cover: {
      kind: "screenshot",
      src: "/aic-facility-booking-cover.jpeg",
      alt: "Facility booking calendar showing lab and hall reservations",
      aspect: "4/3",
    },
    gallery: [
      {
        kind: "screenshot",
        src: "/aic-facility-booking-gallery-1.jpeg",
        alt: "Lab booking form with time-slot and equipment selection",
        aspect: "4/3",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/AIC-CIIC-Facility-Booking", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Before this system, booking a lab, a piece of equipment, or a conference hall meant emailing the admin team directly, with no visibility into what was already booked. That led to double-bookings and no historical record of usage.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A Django backend with separate apps for accounts, startups, labs, bookings, halls, dashboard, and notifications. Startup users request lab, equipment, or hall bookings through validated forms; administrators review and approve or reject through a dedicated dashboard.",
          "Booking validation checks two things independently before confirming a request: time-slot overlap for the resource being booked, and equipment-specific availability, since a lab can host multiple bookings simultaneously if they use different equipment.",
          "Every booking carries an auditable lifecycle (NEW → APPROVED / REJECTED → CANCELLED), with a notification generated at each transition and a booking-history table that preserves the full timeline rather than overwriting the latest state.",
        ],
      },
      {
        heading: "Key features",
        body: [
          "Admin-side CRUD for labs, equipment (with hourly usage fees), and halls (with seating capacity), including bulk import from CSV for initial data load.",
          "A calendar view surfacing approved lab and hall bookings by time slot, so administrators can visually confirm availability before approving a new request.",
          "Separate dashboards for startup users (their bookings, pending vs. approved counts) and administrators (fleet-wide booking volume, pending requests by type, notification counts).",
        ],
      },
    ],
  },
  {
    slug: "aic-worklog-automation",
    title: "WhatsApp Worklog Automation Platform",
    summary:
      "An AI-assisted pipeline that turns unstructured WhatsApp worklog messages into structured, trackable task data and daily reports.",
    categories: ["Software Engineering", "AI & GenAI"],
    technologies: ["Python", "FastAPI", "SQLAlchemy", "PostgreSQL", "whatsapp-web.js", "OpenAI API", "Google Gemini API"],
    role: "Backend engineer (solo)",
    context: "Software Development Engineer Internship, AIC - Crescent Innovation and Incubation Council",
    featured: false,
    status: "Shipped internally",
    cover: {
      kind: "dashboard",
      src: "/aic-worklog-automation-cover.jpeg",
      alt: "Worklog automation dashboard showing daily task extraction summary",
      aspect: "4/3",
    },
    gallery: [
      {
        kind: "dashboard",
        src: "/aic-worklog-automation-gallery-1.jpeg",
        alt: "Pending and completed tasks view in the worklog dashboard",
        aspect: "4/3",
      },
      {
        kind: "code",
        src: "/aic-worklog-automation-gallery-2.jpeg",
        alt: "WhatsApp sync script parsing and posting extracted tasks",
        aspect: "16/9",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/AIC-Whatsapp-Automation-Platform", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Employees reported daily work updates in a WhatsApp group in free-text form. Turning that into a usable record of who did what, what's still pending, and who's falling behind required someone to manually read and re-type every message into a spreadsheet each day.",
        ],
      },
      {
        heading: "Solution",
        body: [
          "A FastAPI backend syncs the day's messages from a WhatsApp group through a whatsapp-web.js/Puppeteer listener, then extracts completed and pending tasks from each message using an LLM (OpenAI or Gemini, selected via config) with a rule-based parser as a fallback when no API key is configured.",
          "The extraction layer handles multiple real message formats employees actually used: numbered lists with a 'Pending:' section, natural-language updates, collaborator tags after a task, and deadlines embedded inline, rather than enforcing one rigid template.",
          "Pending tasks automatically carry forward day to day until marked complete, so the system reflects a running task backlog per employee rather than a fresh, disconnected list every 24 hours.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "Produces a daily dashboard (submissions, pending vs. completed tasks, employee productivity, missing submissions) and exportable Excel/PDF reports, replacing what had been a fully manual, error-prone transcription process.",
        ],
      },
    ],
  },
  {
    slug: "last-mile-delivery-tracker",
    title: "Last-Mile Delivery Tracker",
    summary:
      "A full-stack logistics platform with a configurable pricing engine, zone-based routing, agent assignment, and immutable delivery tracking.",
    categories: ["Full-Stack", "Software Engineering"],
    technologies: ["React", "TypeScript", "Express", "PostgreSQL", "Drizzle ORM", "JWT", "Zod", "Vite"],
    role: "Full-stack engineer (solo)",
    context: "Independent / academic project",
    featured: true,
    status: "Completed",
    cover: {
      kind: "product",
      alt: "Last-Mile Delivery Tracker customer app showing live delivery tracking",
      aspect: "16/9",
    },
    gallery: [
      {
        kind: "screenshot",
        src: "/last-mile-delivery-tracker-gallery-1.png",
        alt: "Admin dashboard with zone and rate card management",
        aspect: "4/3",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/Last-Mile-Delivery-Tracker", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "A realistic last-mile delivery operation needs more than order creation and driver assignment: pricing depends on zones and package dimensions, agents need to be assigned by availability and geography, deliveries fail and need recovery without losing history, and administrators need to change pricing without corrupting past orders.",
        ],
      },
      {
        heading: "Solution & architecture",
        body: [
          "Layered architecture: an Express/TypeScript REST API on top of dedicated business services (pricing engine, assignment engine, tracking state machine, rescheduling, notifications), backed by PostgreSQL via Drizzle ORM. The pricing and assignment logic live outside the HTTP layer entirely, callable and testable independent of any route.",
          "Pricing engine: pickup/drop pincodes resolve to areas and then zones; intra- vs inter-zone classification plus B2B/B2C order type selects one of four rate cards; chargeable weight is `MAX(actual weight, volumetric weight)` where volumetric weight is `L×B×H / 5000`; weight-slab pricing and a configurable COD surcharge (flat or percentage, with min/max caps) complete the calculation.",
          "Assignment engine is deliberately separated from the order-management API: it considers agent availability and zone suitability, supports manual admin override, and can be swapped for a smarter strategy (GPS-distance, workload balancing) later without touching order code.",
          "Tracking is append-only: every status transition writes a new tracking event (previous status, new status, timestamp, actor, actor role) rather than overwriting a single 'current status' field, producing a full auditable delivery timeline.",
        ],
      },
      {
        heading: "Key engineering decision: historical pricing",
        body: [
          "An order's price is computed and persisted as a snapshot at creation time, not recalculated from the live rate card. Changing a rate card only affects future orders; existing orders keep the price they were quoted, which matters for financial auditability and customer disputes.",
        ],
      },
      {
        heading: "Failed-delivery recovery",
        body: [
          "A failed delivery triggers a customer notification and a reschedule path rather than terminating the order: reschedule, then a new delivery attempt, then agent reassignment, then continued tracking, with every previous attempt retained in the order's history.",
        ],
      },
      {
        heading: "Security",
        body: [
          "JWT authentication with bcrypt password hashing, role-based route protection for Customer / Agent / Admin, request validation with Zod, Helmet security headers, API rate limiting, and CORS configuration.",
        ],
      },
    ],
    metrics: [
      { label: "Pricing combinations", value: "4 rate cards (B2B/B2C × intra/inter-zone)" },
      { label: "Delivery lifecycle states", value: "5 (Created to Delivered) plus Failed" },
    ],
  },
  {
    slug: "women360",
    title: "Women360: Health & Wellness SaaS",
    summary:
      "A cloud-native SaaS platform unifying menstrual, nutrition, sleep, activity, and mental-wellbeing tracking, with a dedicated Senior Mode for older adults.",
    categories: ["Full-Stack"],
    technologies: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Express", "PostgreSQL", "JWT", "React Router"],
    role: "Sole developer",
    context: "Independent product, in development",
    featured: false,
    status: "Product in development",
    cover: {
      kind: "product",
      src: "/women360-cover.png",
      alt: "Women360 dashboard showing unified health and wellness tracking",
      aspect: "4/3",
    },
    // websiteUrl: "<live site URL once hosted>" — set this and the case
    // study picks up a "Website" link automatically, no component changes.
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/Women360", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Women currently track menstrual health, nutrition, sleep, and mental wellbeing across separate single-purpose apps with no shared timeline, so lifestyle patterns that correlate across these areas go unnoticed. Existing apps also assume a young, tech-fluent user and create real friction for older adults.",
        ],
      },
      {
        heading: "Key features",
        body: [
          "End-to-end tracking in one place: menstrual cycle, nutrition, activity, sleep, mental wellbeing, and preventive care share a single timeline, instead of the fragmented single-purpose apps most women stitch together today.",
          "Senior Mode is a fully separate navigation model, not a scaled-up version of the standard UI: high-contrast typography, larger touch targets, and a short list of plain-language tiles ('My health', 'My medicines', 'My appointments') that the user chooses themselves in Settings, rather than a fixed menu.",
          "Role-based access for three user types: the end user (Woman), a Wellness Coach with permission-gated visibility into a user's data, and an Admin managing users and content.",
          "Frontend is built against a replaceable mock service layer (every feature calls a function in `src/services/*`, never `fetch` directly), so the real Express/PostgreSQL API, already scaffolded with JWT auth, can be wired in without touching any component.",
        ],
      },
      {
        heading: "Explicit safety boundaries",
        body: [
          "The requirements spec explicitly scopes this as a wellness and tracking tool, not a diagnostic system: it does not claim to autonomously diagnose conditions or prescribe treatment, and risk flags are written to prompt a user toward professional evaluation rather than present a conclusion.",
        ],
      },
      {
        heading: "Status",
        body: [
          "The Woman/end-user experience is complete against the mock service layer: authentication, onboarding, the full app shell, all core tracking modules, light/dark theming, and Senior Mode. The Express/PostgreSQL API exists alongside it; connecting the frontend to it end-to-end and building the Coach and Admin views is the next phase.",
        ],
      },
    ],
  },
  {
    slug: "reckitt-sales-analytics-pipeline",
    title: "FMCG Sales Analytics Pipeline",
    summary:
      "A tested PySpark ETL pipeline transforming raw FMCG retail sales data into a Power BI-ready star schema, with 39 automated tests.",
    categories: ["Data Engineering"],
    technologies: ["PySpark 3.5", "Python 3.12", "YAML", "pytest", "Power BI"],
    role: "Data engineer (solo)",
    context: "Data Engineering Internship, KaarTech",
    featured: true,
    status: "Completed",
    cover: {
      kind: "dashboard",
      src: "/reckitt-sales-analytics-pipeline-cover.png",
      alt: "Power BI executive overview dashboard built on the curated star schema",
      aspect: "16/9",
    },
    gallery: [
      {
        kind: "code",
        src: "/reckitt-sales-analytics-pipeline-gallery-1.svg",
        alt: "Sequence diagram of the ETL pipeline's ingestion, validation, cleaning, and star-schema build stages",
        aspect: "4/3",
      },
      {
        kind: "architecture",
        src: "/reckitt-sales-analytics-pipeline-gallery-2.svg",
        alt: "Bronze to curated pipeline flow diagram",
        aspect: "4/3",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/Reckitt-Dashboard", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "FMCG sales data arrives as a single flat monthly export spanning geography, product, store, supplier, and inventory dimensions. Business users (sales managers, category managers, supply chain and regional heads) need a trustworthy, centralized dataset for BI without manually cleaning or reconciling the raw export every reporting cycle.",
        ],
      },
      {
        heading: "Architecture & pipeline",
        body: [
          "Raw CSV feeds PySpark ingestion (explicit schema, no `inferSchema`), then validation, then cleaning, then feature engineering, then star-schema build (with dimension uniqueness validated before every join), then curated CSV export, then Power BI.",
          "Ingestion reads the source with an explicit, versioned PySpark schema rather than inferred typing, and normalizes column-name whitespace before anything downstream touches the data.",
          "Validation computes null percentages and duplicate-row counts and flags any column exceeding a configurable null threshold, so the pipeline fails fast on data-quality problems instead of silently propagating them.",
        ],
      },
      {
        heading: "Key engineering decisions",
        body: [
          "Cleaning converts placeholder tokens (`-`, `NA`, `N/A`, `NULL`, blank/whitespace) and comma-formatted numbers to proper nulls/numerics before casting, removes exact-duplicate rows, and imputes missing warehouse IDs, without silently dropping otherwise-valid records.",
          "Feature engineering adds calendar attributes, price-per-unit, a category sales rank computed with a window function, and an inventory-risk flag.",
          "The star-schema builder validates that every dimension table has unique natural keys before any fact join runs, specifically to prevent the row-explosion bug that silent duplicate dimension keys cause in joins.",
          "Export writes curated tables to flat CSV via pandas rather than Spark's native writer, deliberately avoiding the Hadoop NativeIO/winutils dependency that otherwise breaks CSV export on Windows.",
        ],
      },
      {
        heading: "Data model",
        body: [
          "One fact table (`fact_sales`, grain: one product sold at one store in one month) joined to six dimensions: date, geography, store, product, supplier, warehouse, modeled for single-direction, one-to-many relationships in Power BI's VertiPaq engine.",
        ],
      },
      {
        heading: "Testing",
        body: [
          "39 automated pytest tests covering ingestion, validation, cleaning, feature engineering, star-schema construction, and full pipeline integration, run via a dedicated `requirements-dev.txt` and `pytest.ini`.",
        ],
      },
    ],
    metrics: [
      { label: "Automated tests", value: "39 (pytest)" },
      { label: "Star schema", value: "1 fact + 6 dimension tables" },
    ],
  },
  {
    slug: "ev-fleet-lakehouse-platform",
    title: "EV Fleet Lakehouse Platform",
    summary:
      "Requirements, data model, and Medallion architecture design for a Databricks Lakehouse consolidating a commercial EV fleet's telemetry, charging, and maintenance data.",
    categories: ["Data Engineering"],
    technologies: ["Databricks", "PySpark", "Delta Lake", "Unity Catalog", "Apache Airflow", "dbt", "Power BI"],
    role: "Data engineer, requirements & architecture (solo)",
    context: "Data Engineering Internship, KaarTech",
    featured: true,
    status: "In progress",
    cover: {
      kind: "architecture",
      src: "/ev-fleet-lakehouse-platform-cover.svg",
      alt: "EV Fleet Lakehouse Medallion architecture: Bronze, Silver, Gold layers",
      aspect: "16/9",
    },
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/EV-Fleet-Lakehouse-Platform", kind: "repo" },
      { label: "Requirements & architecture doc", href: "https://github.com/uthrahh/EV-Fleet-Lakehouse-Platform/blob/main/project_requirements.md", kind: "docs" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "A commercial EV fleet operator's data (vehicle telemetry, trip records, charging sessions, diagnostic faults, and maintenance history) originates from six independent source systems with different structures and update frequencies. Without a unified platform, the operator can't reliably answer basic operational questions: which vehicles are underutilized, which batteries are degrading, which vehicles are overdue for service.",
        ],
      },
      {
        heading: "Scope of this phase: requirements and architecture",
        body: [
          "Defined the full source-system model (six systems: telematics/IoT, fleet management, trip management, charging management, diagnostics, maintenance) and the business-entity graph connecting Vehicle, Trip, Charging Session, Fault Event, and Maintenance Event.",
          "Specified a Bronze/Silver/Gold Medallion architecture on Databricks: Bronze as raw source-aligned ingestion via Auto Loader, Silver as cleaned/deduplicated/standardized/integrated data, Gold as business-level, BI-optimized aggregates, with an explicit success criterion that bad records must not reach Gold unnoticed (not that source data itself is ever 100% clean).",
          "Defined 30+ KPIs across six analytics domains (fleet utilization, battery & energy, charging performance, vehicle health, maintenance & reliability, safety) and the Power BI report pages each domain needs.",
        ],
      },
      {
        heading: "Design decisions specified for the build phase",
        body: [
          "Delta Lake is required to demonstrate ACID writes, `MERGE`-based upserts, schema enforcement and evolution, time travel, and `OPTIMIZE`/`VACUUM`, not just used as a storage format.",
          "Every pipeline run is required to produce an audit record (run_id, source/bronze/silver/gold record counts, inserted/updated/rejected counts, quality status) written to a dedicated Delta audit table, making every run independently reconstructable.",
          "Orchestration is specified through Airflow with explicit stage dependencies (Ingestion, then Bronze, then Bronze validation, then Silver, then Silver validation, then Gold via dbt, then Gold validation), retries, and rerun capability, not a single monolithic job.",
        ],
      },
      {
        heading: "Status",
        body: [
          "Requirements, KPI definitions, and architecture are complete; synthetic telemetry, charging, and fault datasets are prepared. The Bronze/Silver/Gold pipeline build and Power BI report layer are the next phase of this internship project.",
        ],
      },
    ],
  },
  {
    slug: "ai-powered-sap-erp-intelligence-assistant",
    title: "AI-Powered SAP ERP Intelligence Assistant",
    summary:
      "A proof-of-concept architecture combining Databricks Genie (structured SAP data) with a RAG layer (policy documents) into a single natural-language procurement assistant.",
    categories: ["AI & GenAI", "Data Engineering"],
    technologies: ["Databricks", "Databricks Genie", "RAG", "Vector Search", "Unity Catalog", "SAP data model"],
    role: "AI/data engineer, architecture & knowledge base (solo)",
    context: "Data Engineering Internship, KaarTech",
    featured: true,
    status: "Proof of concept",
    cover: {
      kind: "architecture",
      src: "/ai-powered-sap-erp-intelligence-assistant-cover.svg",
      alt: "Query routing architecture between Databricks Genie and the RAG knowledge base",
      aspect: "16/9",
    },
    gallery: [
      {
        kind: "documentation",
        src: "/ai-powered-sap-erp-intelligence-assistant-gallery-1.svg",
        alt: "Business glossary translating SAP fields to business terms",
        aspect: "4/3",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/AI-Powered-SAP-ERP-Intelligence-Assistant", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "SAP ERP systems hold procurement data behind technical table and field names that business users can't query directly, and the policies governing that data (approval thresholds, vendor eligibility) live in separate documents entirely disconnected from the live data. Answering a real procurement question often needs both at once.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Two complementary retrieval paths sit behind one orchestration layer. Databricks Genie queries structured SAP procurement tables in Unity Catalog (EKKO/purchase order headers, EKPO/line items, LFA1/vendor master, MARA/material master) for spend and transaction questions; a RAG layer over six knowledge-base documents answers policy and process questions.",
          "The knowledge base was purpose-built, not just dumped in: a procurement policy (approval thresholds, compliance rules), a purchase-order SOP (lifecycle stages), a vendor management policy (classification/eligibility), a business glossary translating SAP field names into business language, analytics definitions (so metrics are computed consistently across queries), and an FAQ/scenarios document calibrating response structure.",
          "The orchestration layer routes each query to Genie-only, RAG-only, or a hybrid of both. Hybrid routing matters most for compliance questions, which need a live number from Genie (this quarter's spend with a vendor, for example) evaluated against a policy rule from RAG (the approval threshold that applies).",
        ],
      },
      {
        heading: "Evaluation design",
        body: [
          "Built a 32-question evaluation set deliberately balanced across the three routing patterns: 10 RAG-only (policy/process questions), 10 Genie-only (structured spend aggregations), and 12 hybrid (compliance judgments requiring both live data and policy rules), designed to catch routing errors, not just wrong answers.",
        ],
      },
      {
        heading: "Why the glossary document mattered most",
        body: [
          "The business glossary was treated as the translation layer of the whole system: it's what lets a response convert Genie's technical output (raw SAP field values) into the business-facing language a procurement stakeholder actually uses, which is the core of what 'masking SAP complexity' means in practice rather than just a marketing phrase.",
        ],
      },
      {
        heading: "Status",
        body: [
          "Knowledge base, SAP data extracts, Unity Catalog structure, and the evaluation framework are complete and documented in the repository. Genie configuration and the agentic orchestration layer were built and tested within KaarTech's Databricks workspace as part of the internship.",
        ],
      },
    ],
    metrics: [
      { label: "Evaluation questions", value: "32 (10 RAG / 10 Genie / 12 hybrid)" },
      { label: "Knowledge base documents", value: "6" },
    ],
  },
  {
    slug: "capital-allocation-risk-optimization",
    title: "Capital Allocation & Risk Optimization Platform",
    summary:
      "An XGBoost credit-risk model feeding an integer-programming portfolio optimizer that allocates capital across loans and properties under a budget constraint.",
    categories: ["Data Analytics & ML"],
    technologies: ["Python", "XGBoost", "Pyomo", "GLPK", "PostgreSQL", "pandas"],
    role: "Data scientist (solo)",
    context: "Independent project",
    featured: true,
    status: "Completed",
    cover: {
      kind: "code",
      src: "/capital-allocation-risk-optimization-cover.svg",
      alt: "Optimizer output: selected loans and properties under budget constraint",
      aspect: "16/9",
    },
    gallery: [
      {
        kind: "dashboard",
        alt: "Risk-adjusted return distribution across the loan portfolio",
        aspect: "4/3",
      },
    ],
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/Capital-Allocation---Risk-Optimization-Platform", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Given a fixed capital budget and two asset classes with different risk/return profiles, consumer loans and rental properties, how should capital be allocated to maximize expected return without exceeding budget, when each loan's real risk has to be estimated first?",
        ],
      },
      {
        heading: "Pipeline: risk model into optimizer",
        body: [
          "A credit-risk model (`credit_model.py`) pulls loan data from PostgreSQL, engineers features (loan amount, interest rate, annual income, debt-to-income ratio, installment, revolving balance and utilization), and trains an XGBoost classifier (`n_estimators=200`, `max_depth=4`, `learning_rate=0.05`) on a stratified 70/30 split to predict default probability.",
          "Each loan's predicted default probability feeds a risk-adjusted return calculation (expected return minus expected loss), so the optimizer downstream is allocating against risk-adjusted returns, not face-value returns.",
          "The optimizer (`optimizer.py`) treats loan and property selection as binary decisions and solves an integer linear program with Pyomo/GLPK to maximize total risk-adjusted return subject to a hard budget constraint.",
        ],
      },
      {
        heading: "Results",
        body: [
          "Credit model: 0.732 ROC-AUC on held-out test data.",
          "Vacancy/property model: 0.688 concordance index.",
          "Optimizer, given a $5,000,000 budget across 300 candidate loans and 100 candidate properties: selected 232 loans and 22 properties, deployed $4,999,940 of the $5,000,000 budget, for an optimized total return of $1,364,512, solved to a confirmed optimal solution.",
        ],
      },
      {
        heading: "Why this design",
        body: [
          "Separating the risk model from the optimizer keeps each piece independently testable and replaceable. The optimizer doesn't care whether risk-adjusted return came from XGBoost or a different model; it just needs a number per asset and a budget constraint.",
        ],
      },
    ],
    metrics: [
      { label: "Credit model ROC-AUC", value: "0.732" },
      { label: "Capital deployed", value: "$4,999,940 of $5,000,000" },
      { label: "Assets selected", value: "232 loans + 22 properties" },
    ],
  },
  {
    slug: "data-pipeline-sentinel",
    title: "Sentinel: Databricks Pipeline Observability & Remediation Platform",
    summary:
      "A full-stack pipeline observability platform with live Databricks integration and a working, human-approved automated remediation loop.",
    categories: ["Data Engineering", "Full-Stack"],
    technologies: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "FastAPI",
      "Python",
      "Databricks SDK",
      "Databricks Jobs API",
      "Delta Lake",
    ],
    role: "Full-stack engineer (solo)",
    context: "Originated as a KaarTech internship proof of concept, independently rebuilt since",
    featured: true,
    status: "In progress",
    cover: {
      kind: "dashboard",
      alt: "Sentinel pipeline observability dashboard showing live Databricks job monitoring and incident management",
      aspect: "16/9",
    },
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/Data-Pipeline-Sentinel", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Databricks pipeline failures typically require someone to notice a failed job, dig through logs, and manually decide whether and how to rerun it, with no structured record connecting the failure to how it was fixed.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "A Next.js 16 / React 19 / TypeScript frontend talks to a purpose-built FastAPI backend, which integrates with a real Databricks workspace through the official Databricks SDK — not a mocked or simulated data source.",
        ],
      },
      {
        heading: "What's built and verified working",
        body: [
          "Live pipeline monitoring pulls real job and run data from the Databricks Jobs API: job lists, run history, and KPIs (execution counts, success rate, durations) computed from actual runs, not sample data.",
          "A working incident-management loop: failed job runs are detected and tracked in a Delta table the backend owns; a human can approve or reject an incident; approving triggers an actual Databricks job rerun via the Jobs API, and the system polls the real run and auto-resolves the incident once it completes. This full lifecycle — detect a real failure, approve it, watch Databricks execute the rerun, watch it auto-resolve — was run end-to-end against a live workspace.",
        ],
      },
      {
        heading: "Scope, honestly stated",
        body: [
          "This is governed, automated pipeline monitoring and remediation, not an AI-agent system: there's no LLM or agent performing investigation or diagnosis today, by deliberate choice, to keep the backend minimal and everything provably real rather than a fabricated AI narrative. A multi-agent/LLM investigation layer is designed and documented but not built.",
        ],
      },
      {
        heading: "Status",
        body: [
          "Not deployed publicly yet — the frontend runs locally via `npm run dev` and the backend locally via `uvicorn`; neither is deployed to Vercel or Databricks Apps.",
        ],
      },
    ],
  },
  {
    slug: "task-goal-tracker",
    title: "Task Management & Goal Tracking SaaS",
    summary:
      "A cross-platform SaaS unifying tasks, habits, goals, milestones, notes, calendar, notifications, and focus sessions in one place.",
    categories: ["Full-Stack", "Software Engineering"],
    technologies: [
      "Next.js",
      "TypeScript",
      "React Native",
      "Expo",
      "Supabase",
      "PostgreSQL",
      "Tailwind CSS",
      "Framer Motion",
      "Google Calendar API",
      "Web Push",
      "Stripe",
    ],
    role: "Sole developer",
    context: "Independent project, in development",
    featured: false,
    status: "Product in development",
    websiteUrl: "https://wayfare101.vercel.app/",
    cover: {
      kind: "product",
      alt: "Task Management & Goal Tracking SaaS app showing unified tasks, habits, and goals",
      aspect: "4/3",
    },
    links: [
      { label: "Repository", href: "https://github.com/uthrahh/Task-Management-and-Goal-Tracking-SaaS", kind: "repo" },
    ],
    sections: [
      {
        heading: "Problem",
        body: [
          "Tasks, habits, goals, notes, and calendar commitments are usually split across separate single-purpose apps with no shared thread connecting daily actions to longer-term goals.",
        ],
      },
      {
        heading: "What it does",
        body: [
          "Unifies tasks, habits, goals, milestones, notes, calendar, notifications, and focus sessions into one cross-platform app, built for both web (Next.js) and mobile (React Native/Expo).",
        ],
      },
      {
        heading: "Status",
        body: ["In active development."],
      },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
export const featuredProjects = () => projects.filter((p) => p.featured);
