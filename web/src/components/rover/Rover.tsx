type RoverState = "default" | "moving" | "charging" | "garage" | "celebrate";
type RoverProps = {
  state?: RoverState;
  panelColor?: string;
  flagColor?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export function Rover({
  state = "default",
  panelColor,
  flagColor = "#EF4A2F",
  size = 120,
  className,
  style,
}: RoverProps) {
  const dark = state === "garage" ? "#C9C7C3" : "#1C1C1C";
  const panel =
    panelColor ??
    (state === "charging"
      ? "#5B8DC9"
      : state === "garage"
        ? "#D2D0CC"
        : "#00ADFF");
  const flag = state === "garage" ? "#D2D0CC" : flagColor;

  return (
    <svg
      className={className}
      style={style}
      width={size}
      height={(size * 830) / 600}
      viewBox="220 80 600 830"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* тень */}
      <ellipse
        cx="520"
        cy="886"
        rx="280"
        ry="12"
        fill="#21201F"
        opacity="0.12"
      />

      {/* шасси */}
      <path d="M285 712 H770 L742 792 H318 Z" fill="#222222" />

      {/* белый грузовой отсек */}
      <path
        d="M250 520 H600 V722 H284 Q250 722 250 688 Z"
        fill="#FFFFFF"
        stroke="#D2D0CC"
        strokeWidth="6"
      />
      <path
        d="M250 520 V510 Q250 470 292 470 H600 V520 Z"
        fill="#ECECEC"
        stroke="#D2D0CC"
        strokeWidth="6"
      />
      <line
        x1="252"
        y1="522"
        x2="598"
        y2="522"
        stroke="#8FB6DE"
        strokeWidth="5"
      />
      <rect x="300" y="560" width="250" height="124" rx="18" fill={panel} />

      {/* антенна с флажком */}
      <rect x="330" y="150" width="8" height="320" rx="4" fill="#3A3A3A" />
      <rect
        x="310"
        y="104"
        width="34"
        height="96"
        rx="15"
        fill={flag}
        transform="rotate(-8 327 152)"
      />
      <circle cx="333" cy="482" r="18" fill={dark} />

      {/* чёрный передний блок с фарой */}
      <path
        d="M560 466 H712 Q792 466 792 546 V700 Q792 762 730 762 H560 Z"
        fill={dark}
      />
      <rect x="738" y="516" width="46" height="172" rx="20" fill="#2C2C2C" />
      <rect
        x="757"
        y="546"
        width="13"
        height="112"
        rx="6.5"
        fill="#EAF6FF"
        stroke="#7CC8FF"
        strokeWidth="3"
      />

      {/* голова с лидаром */}
      <path d="M598 470 Q598 420 630 412 H668 Q700 420 700 470 Z" fill={dark} />
      <circle
        cx="606"
        cy="446"
        r="16"
        fill={dark}
        stroke="#3A3A3A"
        strokeWidth="3"
      />
      <rect x="626" y="378" width="44" height="36" rx="8" fill={dark} />
      <rect x="630" y="386" width="36" height="12" rx="4" fill="#2F7DD8" />

      {/* колёса */}
      <g fill="#111111">
        <circle cx="345" cy="822" r="66" />
        <circle cx="520" cy="822" r="66" />
        <circle cx="695" cy="822" r="66" />
      </g>
      <g fill="#3A3A3A">
        <circle cx="345" cy="822" r="30" />
        <circle cx="520" cy="822" r="30" />
        <circle cx="695" cy="822" r="30" />
      </g>
    </svg>
  );
}
