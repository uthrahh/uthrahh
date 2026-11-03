import { useId } from "react";
import { GITHUB_MARK_PATH } from "@/components/icons";

const ORANGE = "#ff6a13";
const AMBER = "#ffb547";
const INK = "#16130f";

/**
 * The GitHub cat, nothing added. The left half is the "app" side (solid
 * orange); the right half is the "data" side (the same cat as an amber
 * wireframe with scan lines).
 */
export function GitCat({ className = "" }: { className?: string }) {
  const p = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 24 24" className={className} role="img" aria-label="The GitHub cat">
      <defs>
        <clipPath id={`${p}-l`}>
          <rect x="-1" y="-1" width="13" height="26" />
        </clipPath>
        <clipPath id={`${p}-r`}>
          <rect x="12" y="-1" width="13" height="26" />
        </clipPath>
        <clipPath id={`${p}-sil`}>
          <path d={GITHUB_MARK_PATH} />
        </clipPath>
      </defs>

      <g clipPath={`url(#${p}-l)`}>
        <path d={GITHUB_MARK_PATH} fill={ORANGE} />
      </g>

      <g clipPath={`url(#${p}-r)`} className="cat-wire">
        <path d={GITHUB_MARK_PATH} fill="none" stroke={AMBER} strokeWidth="0.22" strokeLinejoin="round" />
        <g clipPath={`url(#${p}-sil)`} stroke={AMBER} strokeWidth="0.08" opacity="0.4">
          {Array.from({ length: 24 }, (_, i) => (
            <path key={i} d={`M0 ${1 + i} H24`} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/** Small logo mark: the GitHub cat inside a hexagon. */
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
      <g transform="translate(11 11) scale(1.08)">
        <path d={GITHUB_MARK_PATH} fill={ORANGE} />
      </g>
      <path d="M0 0" stroke={INK} />
    </svg>
  );
}
