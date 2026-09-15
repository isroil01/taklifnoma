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

/** Burgundy frame with notched corners that holds the photo-booth strip. */
export function PlaqueArt({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 200 340" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="plaque-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8d2034" />
          <stop offset="0.5" stopColor="#600e1d" />
          <stop offset="1" stopColor="#420713" />
        </linearGradient>
        <linearGradient id="plaque-sheen" x1="0" y1="0" x2="0.7" y2="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M40 0H160C160 16 172 28 188 28V312C172 312 160 324 160 340H40C40 324 28 312 12 312V28C28 28 40 16 40 0Z"
        fill="url(#plaque-fill)"
      />
      <path
        d="M40 0H160C160 16 172 28 188 28V312C172 312 160 324 160 340H40C40 324 28 312 12 312V28C28 28 40 16 40 0Z"
        fill="url(#plaque-sheen)"
      />
      <path
        d="M47 8H153C155 22 165 33 180 35V305C165 307 155 318 153 332H47C45 318 35 307 20 305V35C35 33 45 22 47 8Z"
        fill="none"
        stroke="#c0596b"
        strokeOpacity="0.7"
        strokeWidth="1.1"
      />
    </svg>
  );
}

/** Deep red hibiscus that sits on the dress-code title. */
export function Flower({ className }: ArtProps) {
  const petal =
    "M0 0C-30-14-58-48-44-74C-36-90-16-92-6-84C0-92 14-94 24-86C44-76 46-40 0 0Z";
  const angles = [0, 72, 144, 216, 288];

  return (
    <svg className={className} viewBox="-100 -100 200 200" aria-hidden="true">
      <defs>
        <radialGradient id="flower-petal" cx="0" cy="0" r="95" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#1e0106" />
          <stop offset="0.22" stopColor="#4a0510" />
          <stop offset="0.6" stopColor="#8f1428" />
          <stop offset="0.9" stopColor="#a8243a" />
          <stop offset="1" stopColor="#7d0f22" />
        </radialGradient>
        <linearGradient id="flower-sheen" x1="0" y1="-90" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ff9aac" stopOpacity="0.38" />
          <stop offset="0.6" stopColor="#ff9aac" stopOpacity="0" />
        </linearGradient>
      </defs>

      {angles.map((a) => (
        <path key={`back-${a}`} d={petal} fill="#5a0816" transform={`rotate(${a + 36}) scale(0.9)`} />
      ))}
      {angles.map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <path d={petal} fill="url(#flower-petal)" />
          <path d={petal} fill="url(#flower-sheen)" />
          <path
            d="M0-6C-6-30-10-55-14-76M0-6C4-32 8-56 12-80M0-8C-1-36-2-60 2-86"
            fill="none"
            stroke="#d0566b"
            strokeOpacity="0.32"
            strokeWidth="1.1"
          />
        </g>
      ))}

      <circle r="9" fill="#2a0208" />
      <path d="M0 0C6-10 14-22 30-40" fill="none" stroke="#e8c06a" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="30" cy="-40" r="4" fill="#f4cf6b" />
      <circle cx="36" cy="-35" r="2.2" fill="#f4cf6b" />
      <circle cx="25" cy="-46" r="2.2" fill="#f4cf6b" />
      <circle cx="35" cy="-45" r="1.8" fill="#fde39a" />
    </svg>
  );
}

/** Burgundy and champagne silk swatch clipped to a circle. */
export function Satin({ className }: ArtProps) {
  return (
    <svg className={className} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <linearGradient id="satin-cream" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f4ebdf" />
          <stop offset="0.35" stopColor="#d9c6b0" />
          <stop offset="0.55" stopColor="#f7efe4" />
          <stop offset="0.8" stopColor="#cbb59c" />
          <stop offset="1" stopColor="#e9dccb" />
        </linearGradient>
        <linearGradient id="satin-wine" x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0" stopColor="#2a030b" />
          <stop offset="0.3" stopColor="#6d1222" />
          <stop offset="0.5" stopColor="#b1505c" />
          <stop offset="0.62" stopColor="#6a1120" />
          <stop offset="0.85" stopColor="#3a050f" />
          <stop offset="1" stopColor="#5a0c1a" />
        </linearGradient>
        <filter id="satin-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="satin-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <clipPath id="satin-clip">
          <circle cx="100" cy="100" r="100" />
        </clipPath>
      </defs>

      <g clipPath="url(#satin-clip)">
        <rect width="200" height="200" fill="url(#satin-cream)" />
        <path d="M150-10C120 50 175 100 140 210" stroke="#fffaf2" strokeWidth="16" fill="none" filter="url(#satin-blur)" opacity="0.85" />
        <path d="M188-10C160 60 204 120 182 210" stroke="#a88e74" strokeWidth="12" fill="none" filter="url(#satin-blur)" opacity="0.5" />
        <path
          d="M0 0H118C92 48 142 92 104 142 82 170 104 188 98 210H0Z"
          fill="#3b1d14"
          opacity="0.4"
          filter="url(#satin-blur)"
          transform="translate(9 0)"
        />
        <path d="M0 0H112C86 48 136 92 98 142 76 170 98 188 92 210H0Z" fill="url(#satin-wine)" />
        <path d="M20-10C40 60 8 120 30 210" stroke="#1a0106" strokeWidth="14" fill="none" filter="url(#satin-blur)" opacity="0.5" />
        <path d="M46-10C76 40 32 110 64 210" stroke="#d8828d" strokeWidth="12" fill="none" filter="url(#satin-blur)" opacity="0.55" />
        <path d="M86-10C68 50 110 96 78 150" stroke="#f0b3ba" strokeWidth="5" fill="none" filter="url(#satin-soft)" opacity="0.5" />
      </g>
    </svg>
  );
}
