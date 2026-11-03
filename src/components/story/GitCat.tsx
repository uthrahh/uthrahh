import { useId } from "react";

const ORANGE = "#ff6a13";
const ORANGE_DARK = "#d9520a";
const INK = "#16130f";
const CREAM = "#f4f1ea";
const AMBER = "#ffb547";

const HOOD = "M200 64 C118 64 74 130 74 206 C74 248 90 276 112 292 L288 292 C310 276 326 248 326 206 C326 130 282 64 200 64 Z";
const EAR_L = "M96 128 L88 40 L170 84 Z";
const EAR_R = "M304 128 L312 40 L230 84 Z";
const EAR_L_IN = "M104 112 L100 66 L142 90 Z";
const EAR_R_IN = "M296 112 L300 66 L258 90 Z";
const FACE = "M200 112 C146 112 114 156 114 204 C114 248 150 276 200 276 C250 276 286 248 286 204 C286 156 254 112 200 112 Z";
const EYE_L = "M146 192 Q168 168 192 192 Q168 210 146 192 Z";
const EYE_R = "M208 192 Q232 168 254 192 Q232 210 208 192 Z";
const NOSE = "M192 218 L208 218 L200 229 Z";
const MOUTH = "M200 229 V240 M200 240 Q190 250 180 244 M200 240 Q210 250 220 244";
const WHISKERS = "M138 222 L84 212 M138 232 L80 236 M140 242 L90 258 M262 222 L316 212 M262 232 L320 236 M260 242 L310 258";
const BODY = "M112 292 C64 312 44 392 44 540 L356 540 C356 392 336 312 288 292 Z";
const POCKET = "M108 478 L292 478 L270 530 L130 530 Z";
const STRINGS = "M178 294 V366 M222 294 V366";
const HEX = "M200 372 L240 395 L240 441 L200 464 L160 441 L160 395 Z";
const GIT_LINES = "M188 410 V426 M188 424 C188 414 196 414 208 414";
const TAIL = "M350 504 C412 504 416 412 372 386";

/**
 * The git cat: a cat in an orange hoodie, with a git-branch tail. The left
 * half is the "app" side (flat, solid colour); the right half is the "data"
 * side (the same cat as an amber wireframe with scan lines).
 */
export function GitCat({ className = "" }: { className?: string }) {
  const p = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 420 540"
      className={className}
      role="img"
      aria-label="A cat in an orange hoodie with a git-branch tail"
    >
      <defs>
        <clipPath id={`${p}-l`}>
          <rect x="-20" y="-20" width="220" height="600" />
        </clipPath>
        <clipPath id={`${p}-r`}>
          <rect x="200" y="-20" width="240" height="600" />
        </clipPath>
        <clipPath id={`${p}-sil`}>
          <path d={HOOD} />
          <path d={BODY} />
          <path d={EAR_L} />
          <path d={EAR_R} />
        </clipPath>
        <radialGradient id={`${p}-glow`} cx="50%" cy="45%" r="55%">
          <stop offset="0" stopColor={ORANGE} stopOpacity="0.45" />
          <stop offset="1" stopColor={ORANGE} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="200" cy="260" r="260" fill={`url(#${p}-glow)`} className="cat-glow" />

      {/* left: the app side, flat and solid */}
      <g clipPath={`url(#${p}-l)`}>
        <path d={TAIL} fill="none" stroke={ORANGE} strokeWidth="18" strokeLinecap="round" />
        <path d={BODY} fill={ORANGE} />
        <path d={POCKET} fill={ORANGE_DARK} />
        <path d={EAR_L} fill={ORANGE} />
        <path d={EAR_R} fill={ORANGE} />
        <path d={EAR_L_IN} fill={ORANGE_DARK} />
        <path d={EAR_R_IN} fill={ORANGE_DARK} />
        <path d={HOOD} fill={ORANGE} />
        <path d={FACE} fill={INK} />
        <path d={EYE_L} fill={CREAM} />
        <path d={EYE_R} fill={CREAM} />
        <ellipse cx="169" cy="191" rx="4.5" ry="9" fill={INK} />
        <ellipse cx="231" cy="191" rx="4.5" ry="9" fill={INK} />
        <path d={NOSE} fill={ORANGE} />
        <path d={MOUTH} fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d={WHISKERS} fill="none" stroke={CREAM} strokeWidth="2.5" strokeLinecap="round" />
        <path d={STRINGS} fill="none" stroke={CREAM} strokeWidth="3" strokeLinecap="round" />
        <circle cx="178" cy="372" r="5" fill={INK} />
        <circle cx="222" cy="372" r="5" fill={INK} />
        <path d={HEX} fill={INK} stroke={CREAM} strokeWidth="6" strokeLinejoin="round" />
        <path d={GIT_LINES} fill="none" stroke={CREAM} strokeWidth="4" strokeLinecap="round" />
        <circle cx="188" cy="404" r="6" fill={INK} stroke={CREAM} strokeWidth="3.5" />
        <circle cx="188" cy="432" r="6" fill={INK} stroke={CREAM} strokeWidth="3.5" />
        <circle cx="214" cy="414" r="6" fill={INK} stroke={CREAM} strokeWidth="3.5" />
        <circle cx="372" cy="384" r="14" fill={CREAM} stroke={ORANGE} strokeWidth="6" />
      </g>

      {/* right: the data side, the same cat as a wireframe */}
      <g clipPath={`url(#${p}-r)`} className="cat-wire" fill="none" stroke={AMBER} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        <path d={TAIL} strokeWidth="2.5" />
        <path d={BODY} />
        <path d={POCKET} />
        <path d={EAR_L} />
        <path d={EAR_R} />
        <path d={EAR_L_IN} />
        <path d={EAR_R_IN} />
        <path d={HOOD} />
        <path d={FACE} />
        <path d={EYE_L} />
        <path d={EYE_R} />
        <ellipse cx="169" cy="191" rx="4.5" ry="9" />
        <ellipse cx="231" cy="191" rx="4.5" ry="9" />
        <path d={NOSE} />
        <path d={MOUTH} />
        <path d={WHISKERS} />
        <path d={STRINGS} />
        <path d={HEX} />
        <path d={GIT_LINES} />
        <circle cx="188" cy="404" r="6" />
        <circle cx="188" cy="432" r="6" />
        <circle cx="214" cy="414" r="6" />
        <circle cx="372" cy="384" r="14" />
        <g clipPath={`url(#${p}-sil)`} opacity="0.28" strokeWidth="1.5">
          {Array.from({ length: 22 }, (_, i) => (
            <path key={i} d={`M0 ${70 + i * 22} H420`} />
          ))}
        </g>
        <g fill={AMBER} stroke="none">
          <circle cx="74" cy="206" r="3.5" />
          <circle cx="326" cy="206" r="3.5" />
          <circle cx="312" cy="40" r="3.5" />
          <circle cx="356" cy="540" r="3.5" />
          <circle cx="240" cy="395" r="3.5" />
        </g>
      </g>

      <path d="M200 30 V540" stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 7" opacity="0.55" />
    </svg>
  );
}

/** Small logo mark: the cat inside the hexagon. */
export function CatMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        d="M24 3 L42 13.5 V34.5 L24 45 L6 34.5 V13.5 Z"
        fill="none"
        stroke={ORANGE}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M13 21 L15 11 L21.5 16 Q24 15.4 26.5 16 L33 11 L35 21 Q36.2 31 24 34 Q11.8 31 13 21 Z"
        fill={ORANGE}
      />
      <ellipse cx="19.5" cy="23" rx="1.8" ry="2.6" fill={INK} />
      <ellipse cx="28.5" cy="23" rx="1.8" ry="2.6" fill={INK} />
      <path d="M22.6 27 H25.4 L24 28.8 Z" fill={INK} />
    </svg>
  );
}
