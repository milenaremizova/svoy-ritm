export function Battery({
  size = 1,
  color = "#009050",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={38 * size}
      height={18 * size}
      viewBox="0 0 38 18"
      aria-hidden="true"
    >
      <rect
        x="0"
        y="0"
        width="34"
        height="18"
        rx="5"
        fill="#FFFFFF"
        stroke="#21201F"
        strokeWidth="2.5"
      />
      <rect x="34" y="5.5" width="4" height="7" rx="1.5" fill="#21201F" />
      <rect x="4" y="4" width="26" height="10" rx="2.5" fill={color} />
      <path d="M19 5 L13 10 H17 L15 14 L21 8.5 H17 Z" fill="#FFFFFF" />
    </svg>
  );
}
