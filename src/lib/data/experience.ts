import type { ExperienceItem } from "@/lib/types";

export const experience: ExperienceItem[] = [
  // ============================================================
  // TEMPLATE — copy a new job/internship from here. No coding needed.
  // ============================================================
  // HOW TO ADD A NEW EXPERIENCE:
  // 1. Select everything inside the comment block directly below
  //    this note (the whole { ... } object, including the opening
  //    and closing braces and the trailing comma).
  // 2. Paste it anywhere in this array — most recent jobs usually
  //    go first, but order is up to you.
  // 3. Delete the two comment markers around your PASTED COPY only.
  //    Leave this original template exactly as it is.
  // 4. Replace every <LIKE THIS> placeholder with your own text.
  // 5. Save the file. Done — no other files need to change.
  /*
  {
    // Company / organization name, as it should display.
    org: "<Company Name>",

    // OPTIONAL — delete this line if the org has no website.
    // orgUrl: "https://example.com",

    // Your job title, e.g. "Data Engineer", "Software Engineer Intern".
    role: "<Your Role>",

    // e.g. "Internship", "Full-time", "Part-time", "Contract".
    employmentType: "Internship",

    // e.g. "On-site", "Remote", "Hybrid".
    workMode: "On-site",

    city: "<City>",

    // Short duration label shown on the card, e.g. "3mo", "6mo", "1yr".
    duration: "<3mo>",

    // Start/end as display text, e.g. "July 2026" / "September 2026".
    // Use "Present" as `end` if this is your current role.
    start: "<Month Year>",
    end: "<Month Year>",

    // OPTIONAL — delete this whole block if you'd rather only show the
    // bullet groups below with no separate intro paragraph.
    // summary: "<One or two sentences summarizing this role.>",

    // Bullet points, clustered into labeled groups so a longer list
    // still scans quickly (e.g. "Delivered" vs "Platform & exposure").
    // Wrap key terms in **double asterisks** to bold them.
    highlightGroups: [
      {
        label: "Delivered",
        items: [
          "<A concrete thing you built or shipped, with **key terms** bolded.>",
        ],
      },
    ],

    // Zero or more focused pieces of work within this role. Each one
    // can optionally link to a full case study in projects.ts via
    // `projectSlug` (must exactly match that project's `slug`).
    workstreams: [
      {
        title: "<Workstream Title>",
        // One line, shown in the compact list view.
        oneLiner: "<A one-sentence summary of this workstream.>",
        technologies: ["<Tech 1>", "<Tech 2>"],

        // OPTIONAL — delete if this workstream has no matching full
        // project case study in projects.ts.
        // projectSlug: "<matching-project-slug>",

        // OPTIONAL — shown only when the workstream is expanded.
        // context: "<What was the situation/problem before this work?>",
        // contribution: "<What exactly did you build or do?>",

        // OPTIONAL — small images shown when this workstream is expanded.
        // `kind` picks the placeholder shown until a real image exists:
        // "screenshot" | "website" | "code" | "architecture" |
        // "dashboard" | "product" | "team" | "event" | "documentation" |
        // "portrait". Leave `src` out until the file exists in /public.
        // media: [
        //   { kind: "code", alt: "<Describe this image>", aspect: "4/3" },
        // ],
      },
    ],

    // Plain list of technologies used across the whole role — shown
    // as chips at the bottom of the card.
    technologies: ["<Tech 1>", "<Tech 2>", "<Tech 3>"],
  },
  */
  // ============================================================
  // END TEMPLATE — real experience entries start below
  // ============================================================
  {
    org: "KaarTech",
    orgUrl: "https://www.kaartech.com",
    role: "Data Engineer",
    employmentType: "Internship",
    workMode: "On-site",
    city: "Chennai",
    duration: "3mo",
    start: "July 2026",
    end: "September 2026",
    summary:
      "Worked as a Data Engineer Intern building ETL/ELT pipelines, dimensional data models, and Power BI reporting on Databricks, in a SAP-oriented enterprise environment.",
    highlightGroups: [
      {
        label: "Delivered",
        items: [
          "Designed and developed **ETL/ELT pipelines** using Python, PySpark, SQL, and modern data engineering practices.",
          "Built structured datasets using **data cleaning, transformation, feature engineering, and dimensional modeling** techniques.",
          "Developed **star schemas and analytical data models** to support efficient reporting and business intelligence.",
          "Created interactive **Power BI dashboards** to translate large datasets into actionable business insights.",
        ],
      },
      {
        label: "Platform & exposure",
        items: [
          "Worked with **Databricks, Delta Lake, Spark, and lakehouse architecture** concepts for scalable data processing.",
          "Explored **AI-powered data and ERP intelligence solutions**, integrating natural-language interaction with enterprise data and analytics workflows.",
          "Worked in an **SAP-oriented enterprise environment**, gaining exposure to real-world business data, data quality, governance, and analytics requirements.",
        ],
      },
    ],
    workstreams: [
      {
        title: "FMCG sales analytics pipeline",
        oneLiner: "Tested PySpark ETL pipeline feeding a Power BI star schema.",
        technologies: ["PySpark", "Python", "YAML", "pytest", "Power BI"],
        projectSlug: "reckitt-sales-analytics-pipeline",
        context:
          "Raw FMCG retail sales data arrived as a single flat monthly export across geography, product, store, supplier, and inventory dimensions, with no trustworthy centralized dataset for BI.",
        contribution:
          "Built the full ingestion-to-star-schema pipeline solo: explicit-schema ingestion, null/duplicate validation, cleaning of placeholder tokens, feature engineering, and a validated star schema, covered by 39 automated pytest tests.",
        media: [
          { kind: "code", alt: "PySpark validation stage output", aspect: "4/3" },
          { kind: "dashboard", alt: "Power BI star schema dashboard", aspect: "4/3" },
        ],
      },
      {
        title: "EV fleet Lakehouse architecture",
        oneLiner: "Medallion architecture design for a commercial EV fleet Lakehouse.",
        technologies: ["Databricks", "PySpark", "Delta Lake", "Unity Catalog", "Airflow", "dbt"],
        projectSlug: "ev-fleet-lakehouse-platform",
        context:
          "A commercial EV fleet operator's telemetry, trip, charging, fault, and maintenance data lived in six disconnected source systems with no unified analytics platform.",
        contribution:
          "Defined the source-system model, business-entity graph, Bronze/Silver/Gold architecture, 30+ KPIs, and audit/orchestration requirements; prepared the synthetic datasets for the build phase.",
      },
      {
        title: "AI-powered SAP ERP intelligence assistant",
        oneLiner: "RAG + Genie architecture for a natural-language SAP procurement assistant.",
        technologies: ["Databricks", "Databricks Genie", "RAG", "Vector Search", "Unity Catalog"],
        projectSlug: "ai-powered-sap-erp-intelligence-assistant",
        context:
          "SAP procurement data sits behind technical field names business users can't query, while the policies governing that data live in separate, disconnected documents.",
        contribution:
          "Designed the two-path retrieval architecture (Genie for structured SAP data, RAG for policy documents), built the six-document knowledge base, and authored a 32-question evaluation set balanced across routing patterns.",
      },
      {
        title: "Natural-language data operations assistant",
        oneLiner: "Streamlit prototype classifying requests into data-ops workflows.",
        technologies: ["Python", "Streamlit", "LLM prompt engineering"],
        projectSlug: "ai-data-engineering-assistant",
        context:
          "Triggering routine data-engineering operations required knowing which Databricks job to run and how to invoke it manually.",
        contribution:
          "Studied an existing internal AI data-operations assistant with the team, then rebuilt its intent-classification layer: a constrained LLM prompt mapping free text to one of three operations, with a regex fallback.",
      },
    ],
    technologies: [
      "Python",
      "SQL",
      "PySpark",
      "Databricks",
      "Delta Lake",
      "Unity Catalog",
      "Power BI",
      "Databricks Genie",
    ],
  },
  {
    org: "AIC - Crescent Innovation and Incubation Council",
    orgUrl: "https://aic-ciic.ventures",
    role: "Software Development Engineer",
    employmentType: "Internship",
    workMode: "On-site",
    city: "Chennai",
    duration: "1mo",
    start: "May 2026",
    end: "June 2026",
    summary:
      "Worked as a Software Development Engineer Intern at AIC-CIIC, building a Django-based ERP platform, a FastAPI-based workflow automation system, and a Django/PostgreSQL facility booking platform end to end — covering database architecture, REST APIs and integrations, authentication and role-based access, and testing, debugging, and deployment.",
    highlightGroups: [
      {
        label: "Delivered",
        items: [
          "**ERP Platform:** Designed and developed a centralized **Django-based ERP platform** for AIC-CIIC to digitize startup management, document workflows, services, lab operations, finance, and administrative processes previously handled through fragmented manual/WhatsApp-based workflows.",
          "**WAP — Workflow Automation Platform:** Built a **Python/FastAPI-based workflow automation system** integrating PostgreSQL, Google Sheets, and WhatsApp Business APIs to streamline operational workflows, automate data movement, and reduce repetitive administrative work.",
          "**Facility Booking System:** Engineered a **Django + PostgreSQL facility management and booking platform** for managing labs, equipment, halls, startups, and booking history, with CSV-based master-data ingestion and **FullCalendar/Google Calendar integration** for real-time scheduling visibility.",
        ],
      },
      {
        label: "Approach & ownership",
        items: [
          "**Backend & Data Architecture:** Designed relational database schemas, Django models, REST APIs, validation logic, authentication, role-based access, and reusable backend components across multiple production-oriented internal systems.",
          "**End-to-End Ownership:** Worked across **requirements analysis, system design, backend development, database engineering, integrations, testing, debugging, and deployment**, translating operational requirements into maintainable software systems.",
        ],
      },
    ],
    workstreams: [
      {
        title: "ERP Platform",
        oneLiner:
          "Centralized Django ERP digitizing startup management, document workflows, services, labs, finance, and admin processes.",
        technologies: ["Django", "PostgreSQL", "RBAC", "Bootstrap 5"],
        projectSlug: "aic-erp",
        context:
          "AIC-CIIC ran its startup lifecycle, document workflows, services, lab operations, finance, and admin processes through fragmented manual and WhatsApp-based workflows, with no single source of truth.",
        contribution:
          "Designed and developed a centralized Django-based ERP to digitize all of it into one role-based platform.",
      },
      {
        title: "WAP — Workflow Automation Platform",
        oneLiner:
          "FastAPI automation system integrating PostgreSQL, Google Sheets, and WhatsApp Business APIs.",
        technologies: ["Python", "FastAPI", "PostgreSQL", "Google Sheets API", "WhatsApp Business API"],
        projectSlug: "aic-worklog-automation",
        context:
          "Operational workflows and data movement between systems required repetitive manual administrative work.",
        contribution:
          "Built a workflow automation system streamlining operational workflows and automating data movement to cut repetitive admin work.",
      },
      {
        title: "Facility Booking System",
        oneLiner:
          "Django + PostgreSQL booking platform for labs, equipment, halls, and startups, with calendar sync.",
        technologies: ["Django", "PostgreSQL", "FullCalendar", "Google Calendar API"],
        projectSlug: "aic-facility-booking",
        context:
          "Booking labs, equipment, and halls had no shared visibility across 140+ incubated startups.",
        contribution:
          "Engineered a facility management and booking platform with CSV-based master-data ingestion and FullCalendar/Google Calendar integration for real-time scheduling visibility.",
      },
    ],
    technologies: [
      "Python",
      "Django",
      "FastAPI",
      "PostgreSQL",
      "REST APIs",
      "RBAC",
      "Google Sheets API",
      "WhatsApp Business API",
      "Bootstrap 5",
    ],
  },
];
