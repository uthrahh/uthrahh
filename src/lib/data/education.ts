import type { EducationEntry, CertificationEntry } from "@/lib/types";
import { clubLeadership } from "@/lib/data/leadership";

// Media convention: drop VIT photos into /public named `vit-photo-1.<ext>`,
// `vit-photo-2.<ext>`, etc., then set that path as the matching entry's
// `src` below (see the media convention note atop projects.ts for why a
// missing `src` is safe — it just shows a placeholder until then).

export const education: EducationEntry[] = [
  // ============================================================
  // TEMPLATE — copy a new education entry from here. No coding needed.
  // ============================================================
  // HOW TO ADD A NEW EDUCATION ENTRY:
  // 1. Select everything inside the comment block directly below
  //    this note (the whole { ... } object, including the opening
  //    and closing braces and the trailing comma).
  // 2. Paste it anywhere in this array.
  // 3. Delete the two comment markers around your PASTED COPY only.
  //    Leave this original template exactly as it is.
  // 4. Replace every <LIKE THIS> placeholder with your own text.
  // 5. Save the file. Done — no other files need to change.
  /*
  {
    institution: "<Institution Name>",

    // OPTIONAL — delete this line if the institution has no website.
    // institutionUrl: "https://example.com",

    // OPTIONAL — delete this line for a school entry that uses
    // `levels` instead (see below).
    // degree: "<B.Tech. in Computer Science and Engineering>",

    // OPTIONAL — delete this line if there's no clean start year
    // (school entries below often only set `end`).
    // start: "<2023>",

    // Always required. Use "Present"/"May 2027" style text for an
    // ongoing degree, or "Graduated <year>" for a finished one.
    end: "<May 2027>",

    // Clubs, leadership roles, committees, etc. Leave the array
    // empty ([]) if there are none to list.
    activities: [
      { label: "<Role - Organization/Club Name>" },
      // Add `history: [...]` instead of nothing on a line like this
      // one only if you need an expandable tenure history for that
      // specific activity (see clubLeadership above for the shape:
      // an array of { org, role, start, end, detail?, photo? }).
      // Most activities don't need this — a plain label is enough.
    ],

    // Courses taken. Leave as [] if not applicable (e.g. school-level
    // entries usually leave this empty).
    coursework: ["<Course 1>", "<Course 2>"],

    // OPTIONAL — only for a school-style entry with board exam
    // results instead of (or alongside) `degree`. Delete this whole
    // block for a university entry.
    // levels: [
    //   { grade: "<Grade 12>", board: "<ISC>", result: "<80%>" },
    // ],

    // OPTIONAL — delete this whole block if there are no photos yet.
    // Renders as labeled placeholders until real image files exist
    // under /public. `kind` is typically "event" for these.
    // photos: [
    //   { kind: "event", alt: "<Describe this photo>", aspect: "4/3" },
    // ],
  },
  */
  // ============================================================
  // END TEMPLATE — real education entries start below
  // ============================================================
  {
    institution: "Vellore Institute of Technology (VIT), Chennai",
    institutionUrl: "https://chennai.vit.ac.in/",
    degree: "B.Tech. in Computer Science and Engineering",
    start: "2023",
    end: "May 2027",
    activities: [
      { label: "Chairperson - Open Source Programming Club", history: clubLeadership },
      { label: "Rotaractor - Rotaract Club of VIT-C" },
      { label: "Committee Coordinator - TechnoVIT'25" },
      { label: "Organizer - Spectrum'25, VOID.v1, Glytch'25" },
      { label: "HR Rep. - Centre for Skill & Entrepreneurship Development (CSED)" },
      { label: "Member of Management - Microsoft Innovations Club" },
      { label: "Graphic Designer - Arignar Anna Thamizh Mandram" },
    ],
    coursework: [
      "Database Management Systems",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Computer Networks",
      "Object-Oriented Programming",
      "Software Engineering",
      "Data Analytics",
    ],
    photos: [
      { kind: "event", src: "/vit-photo-1.jpeg", alt: "VIT Chennai University Day 2026", aspect: "4/3" },
      { kind: "event", src: "/vit-photo-3.jpeg", alt: "GlitchCon hackathon at VIT Chennai", aspect: "4/3" },
      { kind: "event", src: "/vit-photo-4.jpeg", alt: "Spectrum hackathon at VIT Chennai", aspect: "4/3" },
      { kind: "event", src: "/vit-photo-5.jpeg", alt: "Open Source Programming Club members at VIT Chennai", aspect: "4/3" },
    ],
  },
  {
    institution: "St. Michael's Academy, Chennai",
    institutionUrl: "https://www.st-michaelsacademy.com/#",
    degree: "High School Diploma",
    end: "Graduated 2023",
    levels: [
      { grade: "Grade 12", board: "ISC", result: "80%" },
      { grade: "Grade 10", board: "ICSE", result: "92%" },
    ],
    activities: [{ label: "Event Coordinator - Annual Day '22 and Feast Day '22" }],
    coursework: [],
  },
];

export const certifications: CertificationEntry[] = [
  // ============================================================
  // TEMPLATE — copy a new certification from here. No coding needed.
  // ============================================================
  // HOW TO ADD A NEW CERTIFICATION:
  // 1. Select everything inside the comment block directly below
  //    this note (the whole { ... } object, including the opening
  //    and closing braces and the trailing comma).
  // 2. Paste it anywhere in this array.
  // 3. Delete the two comment markers around your PASTED COPY only.
  //    Leave this original template exactly as it is.
  // 4. Replace every <LIKE THIS> placeholder with your own text.
  // 5. Save the file. Done — no other files need to change.
  /*
  {
    name: "<Certification Name>",

    // OPTIONAL — delete any of these three lines you don't have.
    // issuer: "<Issuing Organization, e.g. Google, via Coursera>",
    // date: "<Month Year>",
    // url: "<Link to the credential/badge>",
  },
  */
  // ============================================================
  // END TEMPLATE — real certifications start below
  // ============================================================
  {
    name: "Google Data Analytics Professional Certificate",
    issuer: "Google, via Coursera",
    date: "January 2026",
    url: "https://www.credly.com/badges/0ba54e47-1f03-4f86-9a0e-2969e3bfbcda",
  },
];
