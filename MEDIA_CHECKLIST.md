# Media checklist

Every item below is currently showing a labeled placeholder (a hatched
frame with an icon and a caption like "PROJECT SCREENSHOT"). The site
never shows a broken image: until a real file exists at the exact path
listed, the placeholder keeps showing automatically. No code changes are
needed to activate a file, just:

1. Save the real image at the exact path listed (create the folders if
   they don't exist, under `public/`).
2. Open the matching entry in `src/lib/data/projects.ts` (or
   `experience.ts` for the two Experience items) and add `src: "<path>"`
   to that specific media object, right next to its `kind` and `alt`
   fields.
3. Refresh. The placeholder is replaced by the real image immediately.

Recommended format: JPG or WebP, under ~400KB each. Match the aspect
ratio noted (crop before uploading for the cleanest result: 16:9 wide
screenshots, 4:3 for everything else).

## Projects

| Project | Slot | Aspect | Suggested content | Path |
|---|---|---|---|---|
| AutCore | Cover | 16:9 | Screenshot of the screening app UI (or a mockup if the original isn't available) | `public/media/projects/autcore/cover.jpg` |
| AutCore | Gallery 1 | 4:3 | Symptom profiling / risk output screen | `public/media/projects/autcore/gallery-1.jpg` |
| AutCore | Gallery 2 | 4:3 | Team photo from HackHub'25 | `public/media/projects/autcore/gallery-2.jpg` |
| Startup Incubation ERP | Cover | 16:9 | Admin dashboard: startup directory | `public/media/projects/aic-erp/cover.jpg` |
| Startup Incubation ERP | Gallery 1 | 4:3 | Application review workflow screen | `public/media/projects/aic-erp/gallery-1.jpg` |
| Startup Incubation ERP | Gallery 2 | 4:3 | RBAC / module architecture diagram | `public/media/projects/aic-erp/gallery-2.jpg` |
| Facility Booking System | Cover | 4:3 | Booking calendar view | `public/media/projects/aic-facility-booking/cover.jpg` |
| WhatsApp Worklog Automation | Cover | 4:3 | Daily task-extraction dashboard | `public/media/projects/aic-worklog-automation/cover.jpg` |
| Last-Mile Delivery Tracker | Cover | 16:9 | Customer app: live delivery tracking | `public/media/projects/last-mile-delivery-tracker/cover.jpg` |
| Last-Mile Delivery Tracker | Gallery 1 | 4:3 | Admin: zone/rate card management | `public/media/projects/last-mile-delivery-tracker/gallery-1.jpg` |
| Last-Mile Delivery Tracker | Gallery 2 | 4:3 | Pricing/assignment engine architecture diagram | `public/media/projects/last-mile-delivery-tracker/gallery-2.jpg` |
| Women360 | Cover | 4:3 | Dashboard: unified health tracking | `public/media/projects/women360/cover.jpg` |
| FMCG Sales Analytics Pipeline | Cover | 16:9 | Power BI executive overview dashboard | `public/media/projects/reckitt-sales-analytics-pipeline/cover.jpg` |
| FMCG Sales Analytics Pipeline | Gallery 1 | 4:3 | PySpark validation/build stage (code screenshot) | `public/media/projects/reckitt-sales-analytics-pipeline/gallery-1.jpg` |
| FMCG Sales Analytics Pipeline | Gallery 2 | 4:3 | Pipeline flow diagram | `public/media/projects/reckitt-sales-analytics-pipeline/gallery-2.jpg` |
| EV Fleet Lakehouse Platform | Cover | 16:9 | Bronze/Silver/Gold architecture diagram | `public/media/projects/ev-fleet-lakehouse-platform/cover.jpg` |
| AI-Powered SAP ERP Assistant | Cover | 16:9 | Genie + RAG routing architecture diagram | `public/media/projects/ai-powered-sap-erp-intelligence-assistant/cover.jpg` |
| AI-Powered SAP ERP Assistant | Gallery 1 | 4:3 | Business glossary document screenshot | `public/media/projects/ai-powered-sap-erp-intelligence-assistant/gallery-1.jpg` |
| AI Data Operations Assistant | Cover | 4:3 | Streamlit chat interface screenshot | `public/media/projects/ai-data-engineering-assistant/cover.jpg` |
| Capital Allocation & Risk Optimization | Cover | 16:9 | Optimizer output (code/terminal screenshot) | `public/media/projects/capital-allocation-risk-optimization/cover.jpg` |
| Capital Allocation & Risk Optimization | Gallery 1 | 4:3 | Risk-adjusted return distribution chart | `public/media/projects/capital-allocation-risk-optimization/gallery-1.jpg` |
| Data Pipeline Sentinel | Cover | 4:3 | UI concept: KPI cards and pipeline table | `public/media/projects/data-pipeline-sentinel/cover.jpg` |

## Experience workstreams

| Experience | Workstream | Slot | Aspect | Suggested content | Path |
|---|---|---|---|---|---|
| KaarTech | FMCG sales analytics pipeline | Media 1 | 4:3 | PySpark validation output (code screenshot) | `public/media/experience/kaartech/reckitt-1.jpg` |
| KaarTech | FMCG sales analytics pipeline | Media 2 | 4:3 | Power BI star schema dashboard | `public/media/experience/kaartech/reckitt-2.jpg` |
| AIC - Crescent Innovation and Incubation Council | Startup incubation ERP | Media 1 | 4:3 | Startup directory / application review screen | `public/media/experience/aic-ciic/erp-1.jpg` |
| AIC - Crescent Innovation and Incubation Council | Startup incubation ERP | Media 2 | 4:3 | RBAC architecture diagram | `public/media/experience/aic-ciic/erp-2.jpg` |

## Other

| Item | Where | Notes |
|---|---|---|
| Résumé | `public/resume.pdf` | A generated placeholder résumé (real data, no fabricated claims) is already there. Replace with your real résumé when ready, same filename, same path, no code change needed. |
| Favicon | Already handled | Generated programmatically from your initial ("U") in `src/app/icon.tsx`, no file needed. |

## Not currently placeholders (fine as-is)

- Team/event photos beyond what's listed above weren't added anywhere else in the site, only where a real hackathon team photo would be genuinely meaningful (AutCore).
- No stock photography, AI-generated images, or fabricated screenshots exist anywhere in the codebase.
