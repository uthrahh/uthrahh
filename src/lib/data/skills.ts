import type { SkillGroup } from "@/lib/types";

export const skills: SkillGroup[] = [
  // ============================================================
  // TEMPLATE — copy a new skill category from here. No coding needed.
  // ============================================================
  // HOW TO ADD A NEW SKILL CATEGORY:
  // 1. Select everything inside the comment block directly below
  //    this note (the whole { ... } object, including the opening
  //    and closing braces and the trailing comma).
  // 2. Paste it anywhere in this array.
  // 3. Delete the two comment markers around your PASTED COPY only.
  //    Leave this original template exactly as it is.
  // 4. Replace every <LIKE THIS> placeholder with your own text.
  // 5. Save the file. Done — no other files need to change.
  //
  // TO ADD A SKILL TO AN EXISTING CATEGORY: just add another
  // "Skill Name" entry to that category's `skills` list below, e.g.
  // skills: ["Python", "SQL", "<New Skill>"].
  /*
  {
    // The category heading shown above the chip group, e.g.
    // "Languages", "Cloud & Tools", "Design".
    category: "<Category Name>",

    // Plain list of skills in this category — each one renders as
    // its own chip.
    skills: ["<Skill 1>", "<Skill 2>", "<Skill 3>"],
  },
  */
  // ============================================================
  // END TEMPLATE — real skill categories start below
  // ============================================================
  {
    category: "Languages",
    skills: ["Python", "SQL", "TypeScript", "JavaScript", "Java", "C", "C++"],
  },
  {
    category: "Data Engineering",
    skills: [
      "PySpark",
      "Databricks",
      "Delta Lake",
      "Unity Catalog",
      "Medallion architecture",
      "Star schema / dimensional modeling",
      "ETL & data validation",
      "Apache Airflow",
      "dbt",
    ],
  },
  {
    category: "Machine Learning",
    skills: ["XGBoost", "Model evaluation (ROC-AUC)", "Linear/integer programming (Pyomo)"],
  },
  {
    category: "Backend & APIs",
    skills: ["Django", "FastAPI", "Express", "REST API design", "RBAC", "JWT authentication"],
  },
  {
    category: "Data & BI",
    skills: ["Power BI", "DAX", "Tableau", "Pandas", "NumPy", "Feature engineering"],
  },
  {
    category: "AI & GenAI",
    skills: ["RAG", "Vector search", "Databricks Genie", "LLM prompt engineering", "OpenAI / Gemini APIs"],
  },
  {
    category: "Frontend",
    skills: ["React", "TypeScript", "Tailwind CSS", "Bootstrap 5"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "SQLite"],
  },
  {
    category: "Cloud & Tools",
    skills: ["Azure Databricks", "Docker", "Git / GitHub", "Alembic migrations", "pytest"],
  },
];
