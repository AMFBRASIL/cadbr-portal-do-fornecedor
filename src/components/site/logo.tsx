export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      role="img"
      aria-label="Licita Certa"
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
      <path
        d="M13 15h11"
        stroke="var(--gold)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
