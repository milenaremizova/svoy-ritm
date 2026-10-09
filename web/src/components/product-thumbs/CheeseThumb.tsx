export function CheeseThumb() {
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
      <rect width="60" height="60" rx="16" fill="var(--color-surface)" />
      {/* верхняя грань */}
      <path d="M13 30 L47 30 L47 17 Z"
            fill="#FFE45C" stroke="var(--color-coin-deep)" strokeWidth="2" strokeLinejoin="round" />
      {/* передняя грань */}
      <rect x="13" y="30" width="34" height="14" rx="2"
            fill="var(--color-coin)" stroke="var(--color-coin-deep)" strokeWidth="2" />
      {/* дырки */}
      <circle cx="21" cy="37" r="3" fill="var(--color-coin-deep)" />
      <circle cx="35" cy="39" r="2.5" fill="var(--color-coin-deep)" />
      <circle cx="41" cy="26" r="2" fill="var(--color-coin-deep)" />
    </svg>
  );
}