"""Font loading, measuring, and per-SVG subsetting (embedded as base64 WOFF)."""
import base64
import io
from functools import lru_cache

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTCollection, TTFont
from fontTools.varLib import instancer

GF = "/usr/share/fonts/truetype/google-fonts/"
SOURCES = {
    # css family name: loader
    "Sans": lambda: TTFont(GF + "Poppins-Regular.ttf"),
    "SansMed": lambda: TTFont(GF + "Poppins-Medium.ttf"),
    "SansBold": lambda: TTFont(GF + "Poppins-Bold.ttf"),
    "Serif": lambda: instancer.instantiateVariableFont(
        TTFont(GF + "Lora-Italic-Variable.ttf"), {"wght": 500}
    ),
    "Mono": lambda: TTCollection("/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc").fonts[7],
    "MonoBold": lambda: TTCollection("/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc").fonts[7],
}


@lru_cache(maxsize=None)
def load(family):
    return SOURCES[family]()


@lru_cache(maxsize=None)
def _metrics(family):
    f = load(family)
    return f.getBestCmap(), f["hmtx"].metrics, f["head"].unitsPerEm


def width(text, family, size):
    cmap, hmtx, upem = _metrics(family)
    total = 0
    for ch in text:
        g = cmap.get(ord(ch))
        total += hmtx[g][0] if g else upem * 0.5
    return total * size / upem


def wrap(text, family, size, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = (cur + " " + w).strip()
        if width(trial, family, size) <= max_w:
            cur = trial
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def font_face_css(usage):
    """usage: {family: set_of_chars} -> @font-face CSS with subset WOFF data URIs."""
    css = []
    for family, chars in sorted(usage.items()):
        chars = set(chars) | {" "}
        buf = io.BytesIO()
        font = SOURCES[family]()  # fresh copy: subsetting mutates
        opts = Options()
        opts.flavor = "woff"
        opts.layout_features = ["kern"]
        opts.name_IDs = []
        opts.notdef_outline = False
        opts.hinting = False
        sub = Subsetter(opts)
        sub.populate(unicodes=[ord(c) for c in chars])
        sub.subset(font)
        font.flavor = "woff"
        font.save(buf)
        b64 = base64.b64encode(buf.getvalue()).decode()
        css.append(
            f"@font-face{{font-family:'{family}';src:url(data:font/woff;base64,{b64}) format('woff');}}"
        )
    return "".join(css)
