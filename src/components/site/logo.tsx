export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 48"
      role="img"
      aria-label="CAD | BRASIL"
      className={className}
      focusable="false"
    >
      <rect width="48" height="48" rx="13" fill="var(--navy)" />
      <path
        d="M14 26.5 21 33 34 16"
        fill="none"
        stroke="var(--success)"
        strokeWidth="4.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="58"
        y="32"
        fontFamily="var(--font-display, inherit)"
        fontSize="22"
        fontWeight="800"
        letterSpacing="0.5"
        fill="currentColor"
      >
        CAD
      </text>
      <rect x="107" y="13" width="3" height="22" rx="1.5" fill="var(--gold)" />
      <text
        x="118"
        y="32"
        fontFamily="var(--font-display, inherit)"
        fontSize="22"
        fontWeight="600"
        letterSpacing="0.5"
        fill="currentColor"
      >
        BRASIL
      </text>
    </svg>
  );
}
