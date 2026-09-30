"""Generate theme-aware animated SVGs for the uthrahh GitHub profile README."""
import os
from collections import defaultdict
from xml.sax.saxutils import escape

from fonts import font_face_css, width, wrap

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")

THEMES = {
    "dark": dict(
        raised="#1a1a15", sunken="#12120f", border="#2c2b24", border2="#3c3b31",
        ink="#efeee6", muted="#a9a89b", faint="#85847a", accent="#cc5500", accent2="#e07a1f",
        cool="#6ca9e0", ok="#7fb069", bronze="#c07a45", silver="#b9c0c6", gold="#e0b54a",
        glow=0.22, dots="#34332b",
    ),
    "light": dict(
        raised="#fbfaf6", sunken="#f1eee5", border="#dbd7ca", border2="#c3bfae",
        ink="#16181a", muted="#55564f", faint="#6f7066", accent="#cc5500", accent2="#b34a00",
        cool="#2b6cb0", ok="#3f7d3a", bronze="#9a5a2a", silver="#66707a", gold="#9c6f07",
        glow=0.12, dots="#dcd8cb",
    ),
}

BASE_CSS = """
.blink{animation:blink 1.1s steps(1) infinite}
@keyframes blink{50%{opacity:0}}
.pulse{animation:pulse 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
@keyframes pulse{0%,100%{opacity:.35}50%{opacity:1}}
.rise{opacity:0;animation:rise .45s ease-out forwards}
@keyframes rise{from{opacity:0}to{opacity:1}}
.draw{stroke-dasharray:var(--len);stroke-dashoffset:var(--len);animation:draw 2.6s ease-in-out infinite}
@keyframes draw{0%{stroke-dashoffset:var(--len)}55%,80%{stroke-dashoffset:0}100%{stroke-dashoffset:calc(var(--len)*-1)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;opacity:1!important;stroke-dashoffset:0!important}}
"""


class Doc:
    def __init__(self, w, h, theme, title):
        self.w, self.h, self.t, self.title = w, h, THEMES[theme], title
        self.parts, self.defs, self.css = [], [], [BASE_CSS]
        self.usage = defaultdict(set)

    def add(self, s):
        self.parts.append(s)

    def text(self, x, y, txt, fam, size, fill, anchor="start", cls="", extra=""):
        self.usage[fam] |= set(txt)
        c = f' class="{cls}"' if cls else ""
        return (
            f'<text x="{x:.1f}" y="{y:.1f}" font-family="u{fam}" font-size="{size}" '
            f'fill="{fill}" text-anchor="{anchor}"{c} {extra}>{escape(txt)}</text>'
        )

    def spans(self, x, y, segs, size, cls="", extra=""):
        """segs: [(text, family, fill)] rendered as one line of tspans."""
        out = []
        for txt, fam, fill in segs:
            self.usage[fam] |= set(txt)
            out.append(f'<tspan font-family="u{fam}" fill="{fill}">{escape(txt)}</tspan>')
        c = f' class="{cls}"' if cls else ""
        return (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" xml:space="preserve"{c} {extra}>'
                + "".join(out) + "</text>")

    def render(self):
        faces = font_face_css({k: v for k, v in self.usage.items()}).replace("font-family:'", "font-family:'u")
        return (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" '
            f'viewBox="0 0 {self.w} {self.h}" text-rendering="geometricPrecision" role="img" aria-label="{escape(self.title)}">'
            f"<title>{escape(self.title)}</title>"
            f"<style>{faces}{''.join(self.css)}</style>"
            f"<defs>{''.join(self.defs)}</defs>{''.join(self.parts)}</svg>"
        )

    def save(self, name, theme):
        os.makedirs(OUT, exist_ok=True)
        path = os.path.join(OUT, f"{name}-{theme}.svg")
        with open(path, "w", encoding="utf-8") as f:
            f.write(self.render())
        return path


def chevron(x, y, s, color, sw=2.4):
    return (f'<path d="M{x},{y - s} L{x + s * 0.9},{y} L{x},{y + s}" fill="none" stroke="{color}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>')


def card_bg(d, x=0.75, y=0.75, w=None, h=None, rx=20, fill=None):
    t = d.t
    w = (w or d.w) - 1.5
    h = (h or d.h) - 1.5
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill or t["raised"]}" stroke="{t["border"]}" stroke-width="1.5"/>'


def texture(d, cx, cy, r, mask_dir="right", clip_id="clip"):
    """Dot grid (faded) + accent glow, clipped to the card."""
    t = d.t
    d.defs.append(
        f'<clipPath id="{clip_id}"><rect x="1" y="1" width="{d.w - 2}" height="{d.h - 2}" rx="19"/></clipPath>'
        f'<pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="{t["dots"]}"/></pattern>'
        f'<linearGradient id="fade" x1="{0 if mask_dir == "right" else 1}" x2="{1 if mask_dir == "right" else 0}" y1="0" y2="0">'
        f'<stop offset="0.25" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity="1"/></linearGradient>'
        f'<mask id="m"><rect width="{d.w}" height="{d.h}" fill="url(#fade)"/></mask>'
        f'<radialGradient id="glow"><stop offset="0" stop-color="{t["accent"]}" stop-opacity="{t["glow"]}"/>'
        f'<stop offset="1" stop-color="{t["accent"]}" stop-opacity="0"/></radialGradient>'
    )
    return (f'<g clip-path="url(#{clip_id})"><rect width="{d.w}" height="{d.h}" fill="url(#dots)" mask="url(#m)"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#glow)"/></g>')


def pill(d, x, y, label, fam, size, h, fill, stroke, color, padx=12, dot=None, cls="", extra=""):
    w = width(label, fam, size) + padx * 2 + (16 if dot else 0)
    s = f'<g class="{cls}" {extra}>' if cls or extra else "<g>"
    s += f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h}" rx="{h / 2}" fill="{fill}" stroke="{stroke}" stroke-width="1.2"/>'
    tx = x + padx
    if dot:
        s += f'<circle cx="{x + padx + 4:.1f}" cy="{y + h / 2:.1f}" r="4" fill="{dot}"/>'
        tx += 16
    s += d.text(tx, y + h / 2 + size * 0.36, label, fam, size, color) + "</g>"
    return s, w


# ------------------------------------------------------------------ hero
def hero(theme):
    d = Doc(1200, 440, theme, "Pavithra Uthrah R K — Data Engineering, Backend Systems, Applied ML")
    t = d.t
    d.add(card_bg(d))
    d.add(texture(d, 1010, 60, 460))
    x = 64
    # prompt line
    d.add(chevron(x + 2, 88, 7, t["accent2"]))
    d.add(d.spans(x + 22, 94, [("~/uthrahh ", "Mono", t["accent2"]), ("whoami", "Mono", t["ink"])], 18))
    cur_x = x + 22 + width("~/uthrahh whoami ", "Mono", 18)
    d.add(f'<rect class="blink" x="{cur_x:.1f}" y="78" width="10" height="20" fill="{t["accent2"]}"/>')
    # name
    d.add(d.text(x - 3, 170, "Pavithra Uthrah R K", "SansBold", 60, t["ink"], extra='letter-spacing="-1"'))
    d.add(d.spans(x, 218, [("Data Engineer", "SansMed", t["accent2"]),
                           ("  ·  Backend Systems  ·  Applied ML", "SansMed", t["muted"])], 24))
    d.add(d.text(x, 270, "I build pipelines that business teams can trust.", "Serif", 25, t["ink"]))
    # chips
    cx, cy = x, 316
    for label in ["B.Tech CSE @ VIT Chennai '27", "Data Engineer Intern @ KaarTech", "SDE Intern @ AIC-CIIC",
                  "1st place @ HackHub'25"]:
        w = width(label, "Mono", 14) + 28
        if cx + w > 700:
            cx, cy = x, cy + 46
        s, w = pill(d, cx, cy, label, "Mono", 14, 34, t["sunken"], t["border"], t["muted"], padx=14)
        d.add(s)
        cx += w + 10

    # medallion pipeline
    nodes = [
        ("SOURCES", "SAP · APIs · flat files", t["faint"]),
        ("BRONZE", "ingest · schema on read", t["bronze"]),
        ("SILVER", "validate · dedupe · DQ checks", t["silver"]),
        ("GOLD", "star schema · KPIs", t["gold"]),
        ("SERVE", "Power BI · REST APIs", t["accent2"]),
    ]
    nx, ny, nw, nh, gap = 830, 44, 306, 56, 14
    port_x = nx - 26
    ys = [ny + i * (nh + gap) + nh / 2 for i in range(len(nodes))]
    d.add(f'<line x1="{port_x}" y1="{ys[0]}" x2="{port_x}" y2="{ys[-1]}" stroke="{t["border2"]}" stroke-width="2" stroke-dasharray="3 5"/>')
    for i, (lab, sub, col) in enumerate(nodes):
        y0 = ny + i * (nh + gap)
        d.add(f'<rect x="{nx}" y="{y0}" width="{nw}" height="{nh}" rx="12" fill="{t["sunken"]}" stroke="{t["border"]}" stroke-width="1.2"/>')
        d.add(f'<rect x="{nx}" y="{y0 + 12}" width="3.5" height="{nh - 24}" rx="1.75" fill="{col}"/>')
        d.add(d.text(nx + 20, y0 + 23, lab, "MonoBold", 12.5, col, extra='letter-spacing="2.2"'))
        d.add(d.text(nx + 20, y0 + 43, sub, "Sans", 15, t["muted"]))
        d.add(f'<line x1="{port_x}" y1="{ys[i]}" x2="{nx}" y2="{ys[i]}" stroke="{t["border2"]}" stroke-width="1.5"/>')
        d.add(f'<circle cx="{port_x}" cy="{ys[i]}" r="7" fill="{t["raised"]}" stroke="{col}" stroke-width="2.2"/>')
        if i:
            d.add(f'<circle class="pulse" style="animation-delay:{i * 0.45:.2f}s" cx="{nx + nw - 20}" cy="{y0 + nh / 2}" r="4.5" fill="{t["ok"]}"/>')
    # particles flowing down the spine, colour shifting per layer
    dur = 4.2
    cols = ";".join([t["faint"], t["bronze"], t["silver"], t["gold"], t["accent2"]])
    for k in range(4):
        d.add(
            f'<circle r="4.5" fill="{t["faint"]}" opacity="0">'
            f'<animateMotion dur="{dur}s" begin="{k * dur / 4:.2f}s" repeatCount="indefinite" path="M{port_x},{ys[0]} V{ys[-1]}"/>'
            f'<animate attributeName="fill" dur="{dur}s" begin="{k * dur / 4:.2f}s" repeatCount="indefinite" values="{cols}" calcMode="discrete" keyTimes="0;0.2;0.45;0.7;0.92"/>'
            f'<animate attributeName="opacity" dur="{dur}s" begin="{k * dur / 4:.2f}s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;0.06;0.94;1"/>'
            f"</circle>"
        )
    return d


# ------------------------------------------------------------------ section header
def header(theme, num, title, caption):
    d = Doc(1200, 72, theme, title)
    t = d.t
    d.add(d.text(2, 46, num, "MonoBold", 17, t["accent2"]))
    d.add(d.text(40, 48, title, "SansBold", 30, t["ink"], extra='letter-spacing="-0.4"'))
    x1 = 40 + width(title, "SansBold", 30) + 26
    cap_w = width(caption, "Mono", 15)
    x2 = 1198 - cap_w - 22
    d.add(f'<line x1="{x1:.1f}" y1="38" x2="{x2:.1f}" y2="38" stroke="{t["border2"]}" stroke-width="1.5"/>')
    d.add(f'<circle r="3.5" fill="{t["accent2"]}"><animateMotion dur="3.2s" repeatCount="indefinite" '
          f'path="M{x1:.1f},38 H{x2:.1f}" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".6 0 .4 1"/></circle>')
    d.add(d.text(1198, 43, caption, "Mono", 15, t["faint"], anchor="end"))
    return d


# ------------------------------------------------------------------ about terminal
def about(theme):
    t = THEMES[theme]
    K, V, C, P = t["accent2"], t["ink"], t["faint"], t["muted"]
    why = ("I care about the why behind a system as much as the system itself: what a business needed to "
           "see clearly enough to make a decision, and what the data platform had to get right for that to happen.")
    rows = [
        ("cmd", "cat about.yaml"),
        ("kv", "name", "Pavithra Uthrah R K", None),
        ("kv", "studying", "B.Tech CSE @ Vellore Institute of Technology, Chennai (2027)", None),
        ("kv", "focus", "Data engineering: pipelines, lakehouse architecture, BI", None),
        ("kv", "also", "Backend systems (FastAPI, Django) and applied ML", None),
        ("blank",),
        ("key", "experience"),
        ("item", "Data Engineer Intern @ KaarTech", "Databricks, PySpark, Power BI, SAP data"),
        ("item", "Software Development Engineer Intern @ AIC-CIIC", "ERP, automation, booking systems"),
        ("blank",),
        ("kv", "leading", "Chairperson, Open Source Programming Club, VIT Chennai", None),
        ("cont", "Best Tech Club 2025-26, 250+ members"),
        ("kv", "won", "1st place @ HackHub'25 with AutCore, an AI-driven autism screening tool", None),
        ("kv", "writing", "Notes on data, systems, and why companies make the calls they do (Substack)", None),
        ("blank",),
        ("cmd", "echo $WHY"),
        ("why", why),
        ("cmd", ""),
    ]
    size, lh, x0, top = 17, 31, 40, 98
    keyw = 12  # key column in chars
    cw = width("M", "Mono", size)
    # expand rows into rendered lines
    lines = []
    for r in rows:
        if r[0] == "why":
            for ln in wrap(r[1], "Serif", 19, 1080):
                lines.append(("why", ln))
        else:
            lines.append(r)
    h = top + lh * len(lines) + 20
    d = Doc(1200, h, theme, "About me: " + why)
    d.add(card_bg(d, rx=16))
    d.defs.append(f'<clipPath id="tb"><rect x="1" y="1" width="1198" height="{h - 2}" rx="15"/></clipPath>')
    d.add(f'<g clip-path="url(#tb)"><rect width="1200" height="48" fill="{t["sunken"]}"/>'
          f'<line x1="0" y1="48" x2="1200" y2="48" stroke="{t["border"]}" stroke-width="1.5"/></g>')
    for i, c in enumerate([t["accent"], t["gold"], t["ok"]]):
        d.add(f'<circle cx="{30 + i * 22}" cy="24" r="6.5" fill="{c}"/>')
    d.add(d.text(600, 30, "uthrahh@github: ~", "Mono", 14.5, t["faint"], anchor="middle"))
    y = top
    delay = 0.9
    for i, r in enumerate(lines):
        style = f'style="animation-delay:{delay + i * 0.11:.2f}s"'
        kind = r[0]
        if kind == "cmd":
            d.add(f'<g class="rise" style="animation-delay:{(0 if i == 0 else delay + i * 0.11):.2f}s">'
                  + chevron(x0 + 2, y - 6, 6.5, t["accent2"], 2.3)
                  + d.text(x0 + 22, y, r[1], "Mono", size, V) + "</g>")
            if r[1] == "":
                d.add(f'<rect class="blink" x="{x0 + 22}" y="{y - 16}" width="10" height="20" fill="{t["accent2"]}"/>')
        elif kind == "kv":
            key = (r[1] + ":").ljust(keyw)
            d.add(d.spans(x0, y, [(key, "Mono", K), (r[2], "Mono", V)], size, cls="rise", extra=style))
        elif kind == "key":
            d.add(d.spans(x0, y, [(r[1] + ":", "Mono", K)], size, cls="rise", extra=style))
        elif kind == "item":
            d.add(d.spans(x0, y, [("  - ", "Mono", P), (r[1].ljust(50), "Mono", V), ("# " + r[2], "Mono", C)],
                          size, cls="rise", extra=style))
        elif kind == "cont":
            d.add(d.spans(x0 + cw * keyw, y, [("# " + r[1], "Mono", C)], size, cls="rise", extra=style))
        elif kind == "why":
            d.add(d.text(x0 + 22, y, r[1], "Serif", 19, t["muted"], cls="rise", extra=style))
        y += lh
    return d


# ------------------------------------------------------------------ stack
def stack(theme):
    t = THEMES[theme]
    lanes = [
        ("01", "INGEST", "move & schedule data", t["cool"], ["Python", "SQL", "Apache Airflow", "dbt"]),
        ("02", "PROCESS", "transform at scale", t["accent2"], ["PySpark", "Databricks", "Pandas", "NumPy"]),
        ("03", "STORE", "tables you can trust", t["gold"], ["Delta Lake", "Unity Catalog", "PostgreSQL", "SQLite"]),
        ("04", "SERVE", "insight & interfaces", t["ok"], ["Power BI · DAX", "Tableau", "FastAPI", "Django"]),
    ]
    bands = [
        ("APPLIED AI & ML", t["accent2"], ["RAG", "Vector Search", "Databricks Genie", "OpenAI / Gemini APIs",
                                          "XGBoost", "Pyomo (LP / IP)", "Feature engineering"]),
        ("BUILD & SHIP", t["cool"], ["TypeScript", "Java", "C / C++", "React", "Next.js", "Tailwind CSS", "Express",
                                     "JWT · RBAC", "Docker", "Git", "pytest", "Azure Databricks"]),
    ]
    pad, gap = 36, 40
    lw = (1200 - 2 * pad - 3 * gap) / 4
    lane_top, chip_h, chip_gap = 36, 38, 10
    lane_h = 104 + 4 * (chip_h + chip_gap)
    # band layout (compute height first)
    bw = (1200 - 2 * pad - 24) / 2
    band_layouts, band_h = [], 0
    for label, col, chips in bands:
        cx, cy, pos = 22, 62, []
        for c in chips:
            w = width(c, "SansMed", 14.5) + 28
            if cx + w > bw - 22:
                cx, cy = 22, cy + 44
            pos.append((cx, cy, c))
            cx += w + 8
        band_layouts.append(pos)
        band_h = max(band_h, cy + 34 + 22)
    band_top = lane_top + lane_h + 28
    h = band_top + band_h + 34
    d = Doc(1200, h, theme, "Tech stack, organised as a data platform: ingest, process, store, serve, plus applied AI and application tooling")
    d.add(card_bg(d))
    d.add(texture(d, 150, h - 40, 420, mask_dir="left"))
    for i, (num, lab, sub, col, chips) in enumerate(lanes):
        x = pad + i * (lw + gap)
        d.add(f'<rect x="{x:.1f}" y="{lane_top}" width="{lw:.1f}" height="{lane_h}" rx="14" fill="{t["sunken"]}" stroke="{t["border"]}" stroke-width="1.2"/>')
        d.add(f'<rect x="{x + 18:.1f}" y="{lane_top}" width="44" height="3" rx="1.5" fill="{col}"/>')
        d.add(d.spans(x + 18, lane_top + 38, [(num + "  ", "MonoBold", t["faint"]), (lab, "MonoBold", col)], 14,
                      extra='letter-spacing="2"'))
        d.add(d.text(x + 18, lane_top + 64, sub, "Serif", 17, t["muted"]))
        for j, c in enumerate(chips):
            cy = lane_top + 88 + j * (chip_h + chip_gap)
            d.add(f'<rect x="{x + 16:.1f}" y="{cy}" width="{lw - 32:.1f}" height="{chip_h}" rx="9" fill="{t["raised"]}" stroke="{t["border"]}" stroke-width="1.2"/>')
            d.add(f'<circle cx="{x + 34:.1f}" cy="{cy + chip_h / 2}" r="3.5" fill="{col}"/>')
            d.add(d.text(x + 48, cy + chip_h / 2 + 5.4, c, "SansMed", 15, t["ink"]))
        if i < 3:  # flow arrow into next lane
            ax1, ax2, ay = x + lw + 6, x + lw + gap - 6, lane_top + lane_h / 2
            d.add(f'<line x1="{ax1:.1f}" y1="{ay}" x2="{ax2 - 4:.1f}" y2="{ay}" stroke="{t["border2"]}" stroke-width="2"/>')
            d.add(f'<path d="M{ax2 - 9:.1f},{ay - 5} L{ax2:.1f},{ay} L{ax2 - 9:.1f},{ay + 5}" fill="none" stroke="{t["border2"]}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>')
            d.add(f'<circle r="3.5" opacity="0" fill="{col}"><animateMotion dur="1.8s" begin="{i * 0.6:.1f}s" repeatCount="indefinite" path="M{ax1:.1f},{ay} H{ax2 - 8:.1f}"/>'
                  f'<animate attributeName="opacity" dur="1.8s" begin="{i * 0.6:.1f}s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.15;.8;1"/></circle>')
    for k, ((label, col, _), pos) in enumerate(zip(bands, band_layouts)):
        bx = pad + k * (bw + 24)
        d.add(f'<rect x="{bx:.1f}" y="{band_top}" width="{bw:.1f}" height="{band_h}" rx="14" fill="{t["sunken"]}" stroke="{t["border"]}" stroke-width="1.2"/>')
        d.add(f'<rect x="{bx + 18:.1f}" y="{band_top}" width="44" height="3" rx="1.5" fill="{col}"/>')
        d.add(d.text(bx + 22, band_top + 38, label, "MonoBold", 14, col, extra='letter-spacing="2"'))
        for cx, cy, c in pos:
            s, _ = pill(d, bx + cx, band_top + cy, c, "SansMed", 14.5, 34, t["raised"], t["border"], t["ink"], padx=14)
            d.add(s)
    return d


# ------------------------------------------------------------------ project cards
PROJECTS = [
    dict(slug="autcore", num="01", cat="AI & GENAI / COMPUTER VISION", title="AutCore",
         sub="AI-driven autism screening tool",
         desc="Oculomotor and facial-behavior analysis, speech disfluency analysis, and a conversational screening assistant.",
         status=("1st place · HackHub'25", "gold"), chips=["Python", "TensorFlow", "OpenCV", "MediaPipe"], glyph="eye"),
    dict(slug="abov", num="02", cat="FULL-STACK / PRODUCT", title="Abov",
         sub="Career & hiring platform",
         desc="Job search, skill-gap planning, and match scoring for employers. Live demo runs on seeded data.",
         status=("live demo", "ok"), chips=["Next.js", "Prisma", "PostgreSQL", "Auth.js"], glyph="match"),
    dict(slug="women360", num="03", cat="FULL-STACK / HEALTHTECH", title="Women360",
         sub="Health & wellness SaaS",
         desc="Unifies menstrual, nutrition, sleep and mental-wellbeing tracking, with a dedicated Senior Mode for older adults.",
         status=("in development", "cool"), chips=["React", "TypeScript", "Express", "PostgreSQL"], glyph="orbit"),
    dict(slug="sentinel", num="04", cat="DATA ENGINEERING / DATABRICKS", title="Sentinel",
         sub="Pipeline observability & auto-remediation",
         desc="Live Jobs API monitoring, auto-detected incidents, and a human-approved rerun loop. Runs as two Databricks Apps.",
         status=("live on Databricks", "ok"), chips=["Next.js", "FastAPI", "Databricks SDK", "Delta Lake"], glyph="pulse"),
    dict(slug="fmcg", num="05", cat="DATA ENGINEERING / ETL", title="FMCG Sales Pipeline",
         sub="Raw retail exports into a Power BI star schema",
         desc="Tested PySpark ETL with validation and dimensional modeling, built to run on Windows without Hadoop.",
         status=("39 tests passing", "ok"), chips=["PySpark", "pytest", "YAML", "Power BI"], glyph="star"),
    dict(slug="ev", num="06", cat="DATA ENGINEERING / LAKEHOUSE", title="EV Fleet Lakehouse",
         sub="Medallion architecture for fleet telemetry",
         desc="Bronze/Silver/Gold pipeline design consolidating vehicle telemetry, charging and maintenance data.",
         status=("in progress", "cool"), chips=["Databricks", "PySpark", "Delta Lake", "Unity Catalog"], glyph="layers"),
    dict(slug="erp", num="07", cat="BACKEND / DJANGO", title="Incubation ERP",
         sub="System of record for a startup incubator",
         desc="Replaced spreadsheets, email and WhatsApp: 5 roles, 11 Django apps, RBAC across 30+ resource types.",
         status=("shipped internally", "gold"), chips=["Django", "PostgreSQL", "RBAC", "Bootstrap"], glyph="grid"),
    dict(slug="lastmile", num="08", cat="FULL-STACK / LOGISTICS", title="Last-Mile Tracker",
         sub="Pricing, routing & delivery tracking",
         desc="Configurable pricing engine, zone-based routing, agent assignment, and immutable delivery tracking.",
         status=("completed", "gold"), chips=["React", "Express", "PostgreSQL", "Drizzle"], glyph="route"),
    dict(slug="worklog", num="09", cat="AI / AUTOMATION", title="Worklog Automation",
         sub="WhatsApp worklogs into structured task data",
         desc="LLM extraction with a rule-based fallback, carry-forward backlogs, and daily Excel / PDF reports.",
         status=("shipped internally", "gold"), chips=["FastAPI", "PostgreSQL", "OpenAI / Gemini"], glyph="chat"),
]


def glyph(d, kind, gx, gy):
    """Small line-art mark per project, top-right of the card (area ~120x70)."""
    t = d.t
    s, a = t["border2"], t["accent2"]
    if kind == "pulse":
        path = f"M{gx},{gy + 35} h28 l10,-26 l14,52 l12,-40 l8,14 h48"
        return (f'<path d="{path}" fill="none" stroke="{s}" stroke-width="2.2" stroke-linejoin="round"/>'
                f'<path class="draw" style="--len:190" d="{path}" fill="none" stroke="{a}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>')
    if kind == "star":
        cx, cy = gx + 60, gy + 35
        pts = [(cx - 50, cy - 24), (cx + 50, cy - 24), (cx - 50, cy + 26), (cx + 50, cy + 26)]
        out = "".join(f'<line x1="{cx}" y1="{cy}" x2="{px}" y2="{py}" stroke="{s}" stroke-width="2"/>' for px, py in pts)
        out += "".join(f'<rect x="{px - 11}" y="{py - 8}" width="22" height="16" rx="4" fill="{t["raised"]}" stroke="{s}" stroke-width="2"/>' for px, py in pts)
        out += f'<rect class="pulse" x="{cx - 16}" y="{cy - 11}" width="32" height="22" rx="5" fill="{t["raised"]}" stroke="{a}" stroke-width="2.4"/>'
        return out
    if kind == "grid":
        out = ""
        for r in range(3):
            for c in range(4):
                on = (r * 4 + c) in (1, 6, 11)
                cls = ' class="pulse"' if on else ""
                dl = f' style="animation-delay:{(r * 4 + c) * 0.2:.1f}s"' if on else ""
                out += (f'<rect{cls}{dl} x="{gx + c * 30}" y="{gy + r * 24}" width="24" height="18" rx="4" '
                        f'fill="{t["raised"]}" stroke="{a if on else s}" stroke-width="2"/>')
        return out
    if kind == "route":
        path = f"M{gx + 4},{gy + 60} C{gx + 40},{gy + 60} {gx + 30},{gy + 10} {gx + 66},{gy + 14} S{gx + 100},{gy + 50} {gx + 116},{gy + 16}"
        return (f'<path d="{path}" fill="none" stroke="{s}" stroke-width="2.2" stroke-dasharray="5 5"/>'
                f'<circle cx="{gx + 4}" cy="{gy + 60}" r="5" fill="{t["raised"]}" stroke="{s}" stroke-width="2"/>'
                f'<path d="M{gx + 116},{gy + 16} m0,-2 a9,9 0 1,0 0.01,0 z" fill="none"/>'
                f'<path d="M{gx + 116},{gy + 22} l-7,-10 a8.5,8.5 0 1,1 14,0 z" fill="{a}"/>'
                f'<circle r="4.5" fill="{a}"><animateMotion dur="3.4s" repeatCount="indefinite" path="{path}"/></circle>')
    if kind == "chat":
        out = (f'<path d="M{gx},{gy + 4} h54 a8,8 0 0 1 8,8 v22 a8,8 0 0 1 -8,8 h-34 l-12,10 v-10 h-8 a8,8 0 0 1 -8,-8 v-22 a8,8 0 0 1 8,-8 z" '
               f'transform="translate(8,0)" fill="{t["raised"]}" stroke="{s}" stroke-width="2"/>')
        for i, w in enumerate([34, 24]):
            out += f'<line x1="{gx + 20}" y1="{gy + 17 + i * 11}" x2="{gx + 20 + w}" y2="{gy + 17 + i * 11}" stroke="{s}" stroke-width="2.2" stroke-linecap="round"/>'
        for i in range(3):
            out += (f'<rect class="pulse" style="animation-delay:{i * 0.35:.2f}s" x="{gx + 82}" y="{gy + 6 + i * 20}" width="40" height="14" rx="3.5" '
                    f'fill="{t["raised"]}" stroke="{a}" stroke-width="2"/>')
        out += f'<path d="M{gx + 70},{gy + 26} h7 m-4,-4 l4,4 l-4,4" fill="none" stroke="{a}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
        return out
    if kind == "match":
        return (f'<circle cx="{gx + 44}" cy="{gy + 34}" r="28" fill="none" stroke="{s}" stroke-width="2.2"/>'
                f'<circle cx="{gx + 80}" cy="{gy + 34}" r="28" fill="none" stroke="{s}" stroke-width="2.2"/>'
                f'<path class="pulse" d="M{gx + 62},{gy + 12} a28,28 0 0 1 0,44 a28,28 0 0 1 0,-44 z" fill="{a}" opacity=".85"/>')
    if kind == "eye":
        cx, cy = gx + 60, gy + 35
        path = f"M{gx},{cy} Q{cx},{gy + 2} {gx + 120},{cy} Q{cx},{gy + 68} {gx},{cy} Z"
        return (f'<path d="{path}" fill="none" stroke="{s}" stroke-width="2.2"/>'
                f'<circle cx="{cx}" cy="{cy}" r="16" fill="none" stroke="{a}" stroke-width="2.2"/>'
                f'<circle class="pulse" cx="{cx}" cy="{cy}" r="7" fill="{a}"/>'
                f'<line x1="{gx - 4}" y1="{cy}" x2="{gx + 124}" y2="{cy}" stroke="{s}" stroke-width="1.4" stroke-dasharray="2 5" opacity="0.5"/>')
    if kind == "orbit":
        cx, cy = gx + 55, gy + 35
        return (f'<circle cx="{cx}" cy="{cy}" r="30" fill="none" stroke="{s}" stroke-width="2"/>'
                f'<circle cx="{cx}" cy="{cy}" r="18" fill="none" stroke="{s}" stroke-width="2"/>'
                f'<circle cx="{cx}" cy="{cy}" r="4" fill="{a}"/>'
                f'<circle r="5" fill="{a}"><animateMotion dur="4s" repeatCount="indefinite" path="M {cx + 30},{cy} a30,30 0 1,1 -0.01,0"/></circle>'
                f'<circle r="3.5" fill="{a}" opacity="0.6"><animateMotion dur="2.6s" repeatCount="indefinite" path="M {cx + 18},{cy} a18,18 0 1,1 -0.01,0"/></circle>')
    if kind == "layers":
        colors = [t["bronze"], t["silver"], t["gold"]]
        out = ""
        for i, col in enumerate(colors):
            yy = gy + 50 - i * 20
            out += (f'<rect class="pulse" style="animation-delay:{i * 0.3:.1f}s" x="{gx}" y="{yy}" width="120" height="16" rx="4" '
                    f'fill="{t["raised"]}" stroke="{col}" stroke-width="2.4"/>')
        return out
    return ""


def project_card(theme, p):
    d = Doc(600, 290, theme, f"{p['title']}: {p['sub']}. {p['desc']}")
    t = d.t
    d.add(card_bg(d, rx=18))
    x = 30
    d.add(d.spans(x, 46, [(p["num"] + "  ", "MonoBold", t["accent2"]), (p["cat"], "Mono", t["faint"])], 13,
                  extra='letter-spacing="1.4"'))
    d.add(d.text(x - 1, 104, p["title"], "SansBold", 31, t["ink"], extra='letter-spacing="-0.4"'))
    d.add(d.text(x, 134, p["sub"], "SansMed", 16, t["accent2"]))
    for i, ln in enumerate(wrap(p["desc"], "Sans", 15, 540)[:3]):
        d.add(d.text(x, 170 + i * 23, ln, "Sans", 15, t["muted"]))
    d.add(glyph(d, p["glyph"], 440, 62))
    # status pill, top right
    label, key = p["status"]
    w = width(label, "Mono", 12.5) + 40
    s, _ = pill(d, 600 - 28 - w, 26, label, "Mono", 12.5, 28, t["sunken"], t["border"], t["muted"], padx=12, dot=t[key])
    d.add(s)
    # tech chips + arrow
    cx = x
    for c in p["chips"]:
        s, w = pill(d, cx, 234, c, "Mono", 12.5, 30, t["sunken"], t["border"], t["ink"], padx=12)
        d.add(s)
        cx += w + 8
    d.add(f'<circle cx="554" cy="249" r="17" fill="{t["accent"]}"/>'
          f'<path d="M548,255 L560,243 M551,243 H560 V252" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>')
    return d


# ------------------------------------------------------------------ footer
def footer(theme):
    d = Doc(1200, 210, theme, "Let's talk data. uthrahrk@gmail.com")
    t = d.t
    d.add(card_bg(d))
    d.add(texture(d, 600, 250, 520, mask_dir="right"))
    d.add(d.text(600, 92, "Let's talk data.", "Serif", 44, t["ink"], anchor="middle"))
    d.add(d.spans(600 - width("uthrahrk@gmail.com  /  linkedin.com/in/uthrah-rk  /  uthrahrk.vercel.app", "Mono", 16) / 2, 132,
                  [("uthrahrk@gmail.com", "Mono", t["accent2"]), ("  /  linkedin.com/in/uthrah-rk  /  uthrahrk.vercel.app", "Mono", t["muted"])], 16))
    y = 172
    d.add(f'<line x1="120" y1="{y}" x2="1080" y2="{y}" stroke="{t["border2"]}" stroke-width="1.5" stroke-dasharray="2 6"/>')
    for k in range(3):
        d.add(f'<circle r="3.5" opacity="0" fill="{t["accent2"]}"><animateMotion dur="5s" begin="{k * 1.66:.2f}s" repeatCount="indefinite" path="M120,{y} H1080"/>'
              f'<animate attributeName="opacity" dur="5s" begin="{k * 1.66:.2f}s" repeatCount="indefinite" values="0;1;1;0" keyTimes="0;.1;.9;1"/></circle>')
    return d


HEADERS = [
    ("about", "01", "About me", "cat about.yaml"),
    ("stack", "02", "The stack", "a lakehouse, end to end"),
    ("work", "03", "Featured work", "things I've shipped"),
    ("activity", "04", "Activity", "git log --graph"),
]

if __name__ == "__main__":
    sizes = {}
    for th in THEMES:
        docs = [("hero", hero(th)), ("about", about(th)), ("stack", stack(th)), ("footer", footer(th))]
        docs += [(f"h-{k}", header(th, n, ti, c)) for k, n, ti, c in HEADERS]
        docs += [(f"p-{p['slug']}", project_card(th, p)) for p in PROJECTS]
        for name, doc in docs:
            path = doc.save(name, th)
            sizes[os.path.basename(path)] = os.path.getsize(path)
    for k, v in sorted(sizes.items()):
        print(f"{v / 1024:6.1f} KB  {k}")
