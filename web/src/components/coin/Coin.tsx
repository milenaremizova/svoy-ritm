export function Coin({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true">
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="#FCD300"
        stroke="#E8B000"
        strokeWidth="2"
      />
      <circle
        cx="10"
        cy="10"
        r="5"
        fill="none"
        stroke="#E8B000"
        strokeWidth="1.6"
      />
    </svg>
  );
}
