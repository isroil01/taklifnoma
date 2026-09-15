/* Hand-drawn SVG ornaments. Each renders once per page, so the gradient ids stay unique. */

type ArtProps = { className?: string };

export function Divider({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 200 20" aria-hidden="true">
      <path d="M0 10H80M120 10H200" stroke="currentColor" strokeWidth="0.8" />
      <circle cx="85" cy="10" r="1.4" fill="currentColor" />
      <circle cx="115" cy="10" r="1.4" fill="currentColor" />
      <path
        d="M100 16C95 12.4 91.5 9.6 91.5 6.6 91.5 4.4 93.2 2.9 95.2 2.9c1.7 0 3.2 1 4.8 2.8 1.6-1.8 3.1-2.8 4.8-2.8 2 0 3.7 1.5 3.7 3.7 0 3-3.5 5.8-8.5 9.4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
      />
    </svg>
  );
}

export function Heart({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.6 4.5c2.1 0 3.6 1.2 4.4 2.5.8-1.3 2.3-2.5 4.4-2.5 3.6 0 5.7 3.9 4.2 7.3C19.5 16.4 12 21 12 21Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PinIcon({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path
        d="M24 44s-13-13.3-13-23a13 13 0 0 1 26 0c0 9.7-13 23-13 23Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M24 26.5c-3-2.1-5.3-4-5.3-6.2 0-1.5 1.2-2.6 2.6-2.6 1.1 0 2 .6 2.7 1.6.7-1 1.6-1.6 2.7-1.6 1.4 0 2.6 1.1 2.6 2.6 0 2.2-2.3 4.1-5.3 6.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Burgundy wax seal pressed with the couple's initials. */
export function WaxSeal({ className, monogram }: ArtProps & { monogram: string }) {
  const script = { fontFamily: "var(--font-script), cursive" };

  return (
    <svg className={className} viewBox="-60 -60 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="seal-wax" cx="-16" cy="-20" r="84" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c23349" />
          <stop offset="0.45" stopColor="#80112a" />
          <stop offset="1" stopColor="#420511" />
        </radialGradient>
        <radialGradient id="seal-press" cx="0" cy="0" r="40" gradientUnits="userSpaceOnUse">
          <stop offset="0.7" stopColor="#5e0a1b" stopOpacity="0" />
          <stop offset="1" stopColor="#2e030b" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      {/* Uneven outer edge, like wax that spread before it was stamped. */}
      <path
        d="M0-54C14-55 22-47 34-44 47-40 52-28 54-14 57 0 50 10 52 24 54 38 42 46 30 51 17 56 8 50-6 54-20 57-30 49-40 42-51 34-55 22-53 8-51-6-58-16-51-29-44-42-31-46-18-51-11-53-6-53 0-54Z"
        fill="url(#seal-wax)"
      />
      <circle r="38" fill="url(#seal-press)" />
      <circle r="38" fill="none" stroke="#3a040e" strokeWidth="2" strokeOpacity="0.6" />
      <circle r="38" fill="none" stroke="#f08a9b" strokeWidth="1" strokeOpacity="0.35" transform="translate(-0.8 -0.8)" />
      <circle r="32" fill="none" stroke="#f3b3bd" strokeWidth="1.2" strokeOpacity="0.45" strokeDasharray="0.1 4" strokeLinecap="round" />

      <text y="11" textAnchor="middle" fontSize="30" fill="#2e030b" fillOpacity="0.55" style={script} transform="translate(0.8 1.2)">
        {monogram}
      </text>
      <text y="11" textAnchor="middle" fontSize="30" fill="#f6c6cd" style={script}>
        {monogram}
      </text>

      <ellipse cx="-20" cy="-30" rx="15" ry="6" fill="#fff" fillOpacity="0.16" transform="rotate(-32 -20 -30)" />
    </svg>
  );
}
