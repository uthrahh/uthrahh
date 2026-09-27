#!/usr/bin/env python3
"""Render the branded GitHub activity card (dark + light) from live GitHub data.

Runs in GitHub Actions with only the standard library:
    GITHUB_TOKEN=... python3 readme-assets/build_stats.py <username> <out_dir>
Pass --sample to render with fixed demo data (for local layout checks).
"""
import datetime as dt
import json
import os
import sys
import urllib.request
from xml.sax.saxutils import escape

HERE = os.path.dirname(os.path.abspath(__file__))
FONTS = json.load(open(os.path.join(HERE, "stats-fonts.json")))

THEMES = {
    "dark": dict(raised="#1a1a15", sunken="#12120f", border="#2c2b24", border2="#3c3b31", ink="#efeee6",
                 muted="#a9a89b", faint="#85847a", accent2="#e07a1f", bar="#d95926", other="#6f6e64",
                 series=["#d95926", "#3987e5", "#c98500", "#199e70", "#9085e9"]),
    "light": dict(raised="#fbfaf6", sunken="#f1eee5", border="#dbd7ca", border2="#c3bfae", ink="#16181a",
                  muted="#55564f", faint="#6f7066", accent2="#b34a00", bar="#eb6834", other="#a9a79c",
                  series=["#eb6834", "#2a78d6", "#eda100", "#1baf7a", "#4a3aa7"]),
}

QUERY = """
query($login: String!) {
  user(login: $login) {
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC, first: 100) {
      totalCount
      nodes { languages(first: 10, orderBy: {field: SIZE, direction: DESC}) { edges { size node { name } } } }
    }
    contributionsCollection {
      contributionCalendar { totalContributions weeks { contributionDays { contributionCount date } } }
    }
  }
}"""


def fetch(login, token):
    req = urllib.request.Request(
        "https://api.github.com/graphql",
        data=json.dumps({"query": QUERY, "variables": {"login": login}}).encode(),
        headers={"Authorization": f"bearer {token}", "Content-Type": "application/json", "User-Agent": "readme-stats"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        body = json.load(r)
    if "errors" in body:
        raise SystemExit(f"GraphQL error: {body['errors']}")
    return body["data"]["user"]


def sample():
    import random
    random.seed(7)
    start = dt.date(2025, 9, 28)
    weeks = []
    for w in range(53):
        days = []
        for d in range(7):
            day = start + dt.timedelta(days=w * 7 + d)
            n = random.choice([0, 0, 0, 1, 2, 3, 5]) if w > 30 else random.choice([0, 0, 0, 0, 1])
            days.append({"date": day.isoformat(), "contributionCount": n})
        weeks.append({"contributionDays": days})
    langs = [("TypeScript", 900), ("Python", 520), ("CSS", 60), ("JavaScript", 40), ("HTML", 25), ("Shell", 3)]
    return {
        "repositories": {"totalCount": 17, "nodes": [{"languages": {"edges": [{"size": s, "node": {"name": n}} for n, s in langs]}}]},
        "contributionsCollection": {"contributionCalendar": {"totalContributions": 312, "weeks": weeks}},
    }


def summarize(user, today):
    cal = user["contributionsCollection"]["contributionCalendar"]
    days = [(dt.date.fromisoformat(d["date"]), d["contributionCount"]) for w in cal["weeks"] for d in w["contributionDays"]]
    days = [x for x in days if x[0] <= today]
    longest = run = 0
    for _, n in days:
        run = run + 1 if n else 0
        longest = max(longest, run)
    current = 0
    for i, (day, n) in enumerate(reversed(days)):
        if n:
            current += 1
        elif i == 0:  # today may simply not have activity yet
            continue
        else:
            break
    weekly = [sum(d["contributionCount"] for d in w["contributionDays"]) for w in cal["weeks"]][-52:]
    week_starts = [dt.date.fromisoformat(w["contributionDays"][0]["date"]) for w in cal["weeks"]][-52:]
    sizes = {}
    for repo in user["repositories"]["nodes"]:
        for e in repo["languages"]["edges"]:
            sizes[e["node"]["name"]] = sizes.get(e["node"]["name"], 0) + e["size"]
    total = sum(sizes.values()) or 1
    ranked = sorted(sizes.items(), key=lambda kv: -kv[1])
    # top five languages; anything under 2% folds into "Other" so no sliver segments render
    top = [(n, s / total) for n, s in ranked[:5] if s / total >= 0.02]
    langs = top
    rest = 1 - sum(sh for _, sh in top)
    if rest > 0.0005:
        langs.append(("Other", rest))
    return dict(total=cal["totalContributions"], current=current, longest=longest,
                repos=user["repositories"]["totalCount"], weekly=weekly, week_starts=week_starts, langs=langs)


# ---------------------------------------------------------------- rendering
def width(text, fam, size):
    f = FONTS[fam]
    return sum(f["adv"].get(c, f["upem"] * 0.55) for c in text) * size / f["upem"]


def T(x, y, s, fam, size, fill, anchor="start", extra=""):
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-family="u{fam}" font-size="{size}" fill="{fill}" '
            f'text-anchor="{anchor}" {extra}>{escape(s)}</text>')


def render(st, theme, today):
    t = THEMES[theme]
    W, H = 1200, 470
    p = []
    p.append(f'<rect x=".75" y=".75" width="{W - 1.5}" height="{H - 1.5}" rx="20" fill="{t["raised"]}" stroke="{t["border"]}" stroke-width="1.5"/>')
    p.append(T(36, 50, "LAST 12 MONTHS ON GITHUB", "MonoBold", 13, t["accent2"], extra='letter-spacing="2"'))
    p.append(T(W - 36, 50, f"updated {today.isoformat()}", "Mono", 13, t["faint"], anchor="end"))

    # KPI tiles
    tiles = [(f"{st['total']:,}", "contributions", "public, last 52 weeks"),
             (str(st["current"]), "current streak", "days in a row" if st["current"] != 1 else "day"),
             (str(st["longest"]), "longest streak", "days in a row" if st["longest"] != 1 else "day"),
             (str(st["repos"]), "public repositories", "owned, non-fork")]
    tw, gap, ty = (W - 72 - 3 * 16) / 4, 16, 74
    for i, (big, lab, sub) in enumerate(tiles):
        x = 36 + i * (tw + gap)
        p.append(f'<rect x="{x:.1f}" y="{ty}" width="{tw:.1f}" height="112" rx="14" fill="{t["sunken"]}" stroke="{t["border"]}" stroke-width="1.2"/>')
        p.append(T(x + 22, ty + 58, big, "SansBold", 40, t["ink"], extra='letter-spacing="-0.5"'))
        p.append(T(x + 22, ty + 84, lab, "SansMed", 15, t["ink"]))
        p.append(T(x + 22, ty + 102, sub, "Mono", 12, t["faint"]))

    # weekly contributions (single series bars)
    px, py, pw, ph = 36, 214, 690, 222
    p.append(f'<rect x="{px}" y="{py}" width="{pw}" height="{ph}" rx="14" fill="{t["sunken"]}" stroke="{t["border"]}" stroke-width="1.2"/>')
    p.append(T(px + 22, py + 34, "Contributions per week", "SansMed", 16, t["ink"]))
    wk = st["weekly"]
    mx = max(wk) or 1
    bx0, bx1, base, top = px + 22, px + pw - 22, py + ph - 42, py + 64
    n = len(wk)
    slot = (bx1 - bx0) / n
    bw = max(2.0, slot - 2)  # 2px surface gap between bars
    p.append(f'<line x1="{bx0}" y1="{base + 0.5}" x2="{bx1}" y2="{base + 0.5}" stroke="{t["border2"]}" stroke-width="1"/>')
    peak_i = max(range(n), key=lambda i: wk[i])
    for i, v in enumerate(wk):
        if v == 0:
            continue
        h = max(3.0, (base - top) * v / mx)
        x = bx0 + i * slot + (slot - bw) / 2
        r = min(2.0, bw / 2)
        # rounded data-end, square at the baseline
        p.append(f'<path d="M{x:.2f},{base} V{base - h + r:.2f} Q{x:.2f},{base - h:.2f} {x + r:.2f},{base - h:.2f} '
                 f'H{x + bw - r:.2f} Q{x + bw:.2f},{base - h:.2f} {x + bw:.2f},{base - h + r:.2f} V{base} Z" fill="{t["bar"]}"/>')
    # selective direct label: the peak week only
    if wk[peak_i]:
        lx = bx0 + peak_i * slot + slot / 2
        p.append(T(min(lx, bx1 - 4), top - 8, f"peak {wk[peak_i]}", "Mono", 12, t["muted"], anchor="end" if lx > bx1 - 60 else "middle"))
    # month ticks
    last_m = None
    for i, d in enumerate(st["week_starts"]):
        if d.month != last_m and d.day <= 7:
            last_m = d.month
            p.append(T(bx0 + i * slot, base + 22, d.strftime("%b"), "Mono", 11.5, t["faint"]))

    # languages (share of code, stacked bar + legend)
    lx, lw = px + pw + 18, W - 36 - (px + pw + 18)
    p.append(f'<rect x="{lx}" y="{py}" width="{lw}" height="{ph}" rx="14" fill="{t["sunken"]}" stroke="{t["border"]}" stroke-width="1.2"/>')
    p.append(T(lx + 22, py + 34, "Languages by code size", "SansMed", 16, t["ink"]))
    sx0, sx1, sy, sh = lx + 22, lx + lw - 22, py + 56, 14
    usable = (sx1 - sx0) - 2 * (len(st["langs"]) - 1)
    x = sx0
    colors = []
    for i, (name, share) in enumerate(st["langs"]):
        c = t["other"] if name == "Other" else t["series"][i]
        colors.append(c)
        w = max(2.0, usable * share)
        first, last = i == 0, i == len(st["langs"]) - 1
        rl, rr = (4 if first else 0), (4 if last else 0)
        p.append(f'<path d="M{x + rl:.2f},{sy} H{x + w - rr:.2f} Q{x + w:.2f},{sy} {x + w:.2f},{sy + rr} V{sy + sh - rr} '
                 f'Q{x + w:.2f},{sy + sh} {x + w - rr:.2f},{sy + sh} H{x + rl:.2f} Q{x:.2f},{sy + sh} {x:.2f},{sy + sh - rl} '
                 f'V{sy + rl} Q{x:.2f},{sy} {x + rl:.2f},{sy} Z" fill="{c}"/>')
        x += w + 2
    # legend: 2 columns, swatch + name + share (text in ink tokens, not series colour)
    col_w = (sx1 - sx0) / 2
    for i, ((name, share), c) in enumerate(zip(st["langs"], colors)):
        cx = sx0 + (i % 2) * col_w
        cy = sy + 50 + (i // 2) * 34
        p.append(f'<rect x="{cx:.1f}" y="{cy - 10}" width="12" height="12" rx="3" fill="{c}"/>')
        p.append(T(cx + 20, cy + 1, name, "SansMed", 14.5, t["ink"]))
        p.append(T(cx + col_w - 14, cy + 1, f"{share * 100:.1f}%", "Mono", 13, t["muted"], anchor="end"))

    faces = "".join(
        f"@font-face{{font-family:'u{k}';src:url(data:font/woff;base64,{v['b64']}) format('woff');}}"
        for k, v in FONTS.items())
    title = (f"GitHub activity: {st['total']} contributions in the last year, current streak {st['current']} days, "
             f"longest streak {st['longest']} days, {st['repos']} public repositories. Top languages: "
             + ", ".join(f"{n} {s * 100:.0f}%" for n, s in st["langs"]))
    return (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}" '
            f'text-rendering="geometricPrecision" role="img" aria-label="{escape(title)}"><title>{escape(title)}</title>'
            f"<style>{faces}</style>{''.join(p)}</svg>")


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    login, out = (args + ["uthrahh", "dist"])[:2]
    today = dt.date.today()
    user = sample() if "--sample" in sys.argv else fetch(login, os.environ["GITHUB_TOKEN"])
    st = summarize(user, today)
    os.makedirs(out, exist_ok=True)
    for theme in THEMES:
        with open(os.path.join(out, f"stats-{theme}.svg"), "w") as f:
            f.write(render(st, theme, today))
    print(json.dumps({k: v for k, v in st.items() if k not in ("weekly", "week_starts")}, default=str))


if __name__ == "__main__":
    main()
