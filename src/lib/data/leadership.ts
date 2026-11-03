import type { ActivityEntry, HackathonEntry } from "@/lib/types";

export const clubLeadership: ActivityEntry[] = [
  {
    org: "Open Source Programming Club, VIT",
    orgUrl: "https://www.linkedin.com/company/opensource-programming-club-vitc/",
    role: "Chairperson",
    start: "April 2026",
    end: "Present",
    detail: [
      "Took over as Chairperson for the 2026-27 tenure after the club was recognized as VIT's Best Tech Club for 2025-26.",
    ],
  },
  {
    org: "Open Source Programming Club, VIT",
    orgUrl: "https://www.linkedin.com/company/opensource-programming-club-vitc/",
    role: "Vice Chairperson",
    start: "April 2025",
    end: "April 2026",
    detail: [
      "Led a 250+ member technical community and helped scale the club to the #1 position among 110+ student clubs within two years of its founding.",
      "Organized 3 national-level hackathons and 10+ workshops, competitions, and technical events across the tenure.",
      "Coordinated cross-functional teams spanning operations, design, technical, and outreach.",
      "Led recruitment of team leads across departments and ensured timely, high-quality delivery from technical departments.",
      "Co-organized the club's 3 flagship annual hackathons - Spectrum'25 (design, registration, sponsorship, and finance), VOID.v1 (registration process, design, and on-day logistics) and Glytch'25 (planning, execution, and liaison with institutional bodies)."
    ],
  },
  {
    org: "Open Source Programming Club, VIT",
    orgUrl: "https://www.linkedin.com/company/opensource-programming-club-vitc/",
    role: "Design & Content Lead",
    start: "December 2024",
    end: "April 2025",
    detail: [
      "Managed a 15-member design team; created 30+ graphics across 10+ events; Oversaw poster design for all events during the tenure and directed social media content creation.",
    ],
  },
  {
    org: "Open Source Programming Club, VIT",
    orgUrl: "https://www.linkedin.com/company/opensource-programming-club-vitc/",
    role: "Web Development Member",
    start: "October 2024",
    end: "December 2024",
  },
];

export const collegeActivities: ActivityEntry[] = [
  {
    org: "TechnoVIT'25, VIT",
    role: "Committee Coordinator",
    start: "",
    end: "2025",
    detail: [],
  },
  {
    org: "Centre for Skill & Entrepreneurship Development (CSED), VIT",
    role: "HR Rep.",
    start: "",
    end: "",
    detail: [],
  },
];

export const communityUniversity: ActivityEntry[] = [
  {
    org: "Microsoft Innovations Club, VIT",
    role: "Management Member",
    start: "October 2024",
    end: "July 2025",
    detail: [
      "Drafted event proposals and contributed to the club's annual report.",
      "Assisted in planning the Vibrance event and supported marketing activities.",
    ],
  },
  {
    org: "Arignar Anna Thamizh Mandram, VIT",
    role: "Graphic Designer",
    start: "",
    end: "",
    detail: [],
  },
  {
    org: "Rotaract Club of VIT",
    role: "Rotaractor",
    start: "July 2025",
    end: "Present",
    detail: [],
  },
];

export const communitySocial: ActivityEntry[] = [
  {
    org: "U&I Trust",
    orgUrl: "https://uandi.org.in/",
    role: "Student Mentor Volunteer",
    start: "July 2026",
    end: "Present",
    detail: [
      "Provide weekly academic tutoring and mentorship to a group of primary school students, supporting their educational progress and personal development.",
    ],
    photo: {
      kind: "event",
      src: "/uandi-photo-1.jpeg",
      alt: "U&I mentoring session with primary school students",
      aspect: "4/3",
    },
  },
];

export const hackathons: HackathonEntry[] = [
  {
    name: "AI-Powered Lead Conversion and Appointment Booking Agent",
    result: "Track Winner",
    date: "March 2026",
    organizer: "GlitchCon 2.0, VITAA x ECDS",
    problem:
      "Healthcare providers lose leads to delayed responses and inconsistent qualification, causing high drop-off between first contact and booked appointment.",
    solution: [
      "A 24/7 conversational agent capturing leads from web and WhatsApp and extracting key details automatically.",
      "Contextual, personalized engagement with adaptive, structured follow-up questions for qualification.",
      "Automatic classification of leads into Hot, Warm, and Cold based on intent and urgency.",
      "Autonomous appointment booking for high-intent leads by checking availability in real time.",
      "Full-pipeline analytics across channels and services, with the agent improving from past interactions.",
    ],
    contribution:
      "Built against mock datasets and structured APIs to simulate real-world constraints within the hackathon's time limit.",
  },
  {
    name: "AutCore: AI-Driven Autism Screening & Risk Assessment",
    result: "1st Place, Team Perry the Platypus",
    date: "March 2025",
    organizer: "HackHub'25, IEEE Computer Society VITC, sponsored by GitHub & Devfolio",
    team: "With Prannavakhanth A and Lohita Lakshmi L.S",
    projectSlug: "autcore",
    problem:
      "Autism screening tools are largely subjective and inaccessible; the team set out to make early screening faster, more objective, and more available.",
    solution: [
      "Oculomotor and facial-behavior analysis using computer vision.",
      "Speech and language disfluency analysis.",
      "Intelligent autism symptom profiling and risk evaluation.",
      "A conversational assistant layer for guided interaction.",
    ],
    contribution:
      "Built the web platform, integrating the ML/CV components, real-time analysis, and the user-facing experience, joining a 36-hour hackathon with 24 hours remaining. Placed 1st out of 500 teams that entered (60 reached the final round).",
  },
];
