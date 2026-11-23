interface CoverArtworkProps {
  variant: number;
  label?: string;
  className?: string;
}

const COVER_PALETTES = [
  { bg: 'from-[#123B60] via-[#1769AA] to-[#1E88E5]', accent: '#F36B21' },
  { bg: 'from-[#0F2C47] via-[#123B60] to-[#1769AA]', accent: '#F36B21' },
  { bg: 'from-[#1769AA] via-[#123B60] to-[#0E2439]', accent: '#F36B21' },
  { bg: 'from-[#13426B] via-[#1769AA] to-[#2B86C5]', accent: '#F36B21' },
  { bg: 'from-[#0E2A47] via-[#1769AA] to-[#123B60]', accent: '#F36B21' },
  { bg: 'from-[#123B60] via-[#1B5E96] to-[#1769AA]', accent: '#F36B21' },
];

export function CoverArtwork({ variant, label, className = '' }: CoverArtworkProps) {
  const palette = COVER_PALETTES[(variant - 1) % COVER_PALETTES.length];
  const patternId = `grid-${variant}-${Math.abs(variant * 17)}`;

  return (
    <div
      className={`keep-dark relative w-full h-full bg-gradient-to-br ${palette.bg} overflow-hidden select-none ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <svg
        viewBox="0 0 480 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={patternId} width="32" height="32" patternUnits="userSpaceOnUse">
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="480" height="280" fill={`url(#${patternId})`} />

        {variant % 3 === 1 && (
          <g opacity="0.9">
            <circle cx="340" cy="140" r="95" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
            <circle cx="340" cy="140" r="62" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M80 200 C160 120, 240 200, 340 140" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
            <path d="M90 100 C180 140, 260 80, 340 140" stroke={palette.accent} strokeWidth="2" strokeOpacity="0.85" />
            <circle cx="340" cy="140" r="10" fill={palette.accent} />
            <circle cx="80" cy="200" r="6" fill="#FFFFFF" fillOpacity="0.7" />
            <circle cx="90" cy="100" r="6" fill="#FFFFFF" fillOpacity="0.7" />
          </g>
        )}

        {variant % 3 === 2 && (
          <g opacity="0.9">
            <rect x="64" y="64" width="120" height="72" rx="14" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="rgba(255,255,255,0.04)" />
            <rect x="240" y="128" width="160" height="84" rx="16" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
            <path d="M184 100 H212 V170 H240" stroke={palette.accent} strokeWidth="2.2" />
            <circle cx="184" cy="100" r="4" fill="#FFFFFF" />
            <circle cx="240" cy="170" r="5" fill={palette.accent} />
            <line x1="84" y1="92" x2="152" y2="92" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
            <line x1="84" y1="108" x2="134" y2="108" stroke="rgba(255,255,255,0.2)" strokeWidth="3" strokeLinecap="round" />
            <line x1="264" y1="160" x2="368" y2="160" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeLinecap="round" />
            <line x1="264" y1="178" x2="336" y2="178" stroke="rgba(255,255,255,0.22)" strokeWidth="3" strokeLinecap="round" />
          </g>
        )}

        {variant % 3 === 0 && (
          <g opacity="0.9">
            <polygon points="240,42 350,104 350,196 240,248 130,196 130,104" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="rgba(255,255,255,0.03)" />
            <polygon points="240,78 312,118 312,182 240,216 168,182 168,118" stroke="rgba(255,255,255,0.28)" strokeWidth="1.5" />
            <line x1="130" y1="104" x2="350" y2="196" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
            <line x1="350" y1="104" x2="130" y2="196" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
            <circle cx="240" cy="147" r="14" fill={palette.accent} fillOpacity="0.9" />
            <circle cx="240" cy="147" r="28" stroke={palette.accent} strokeWidth="1.5" strokeOpacity="0.55" />
          </g>
        )}
      </svg>
    </div>
  );
}
