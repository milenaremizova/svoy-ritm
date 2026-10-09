import styles from "./Confetti.module.css";

type Piece = {
  x: number;
  y: number;
  size: number;
  color: string;
  rotate: number;
  shape: "square" | "circle" | "strip";
};

const PIECES: Piece[] = [
  { x: 150, y: 10,  size: 14, color: "#EF4A2F", rotate: 20,  shape: "square" },
  { x: 60,  y: 60,  size: 12, color: "#FCD300", rotate: 0,   shape: "circle" },
  { x: 30,  y: 120, size: 10, color: "#00ADFF", rotate: 45,  shape: "square" },
  { x: 250, y: 30,  size: 12, color: "#FCD300", rotate: -15, shape: "strip" },
  { x: 270, y: 115, size: 16, color: "#FE9939", rotate: -30, shape: "strip" },
  { x: 230, y: 75,  size: 9,  color: "#009050", rotate: 0,   shape: "circle" },
  { x: 85,  y: 20,  size: 16, color: "#00ADFF", rotate: 60,  shape: "strip" },
];

function PieceShape({ p }: { p: Piece }) {
  const transform = `rotate(${p.rotate} ${p.x} ${p.y})`;
  if (p.shape === "circle") {
    return <circle cx={p.x} cy={p.y} r={p.size / 2} fill={p.color} />;
  }
  const w = p.size;
  const h = p.shape === "strip" ? p.size / 3 : p.size;
  return (
    <rect x={p.x - w / 2} y={p.y - h / 2} width={w} height={h} rx={2}
          fill={p.color} transform={transform} />
  );
}

export function Confetti() {
  return (
    <svg className={styles.confetti} width="300" height="200" viewBox="0 0 300 200" aria-hidden="true">
      {PIECES.map((p, i) => (
        <PieceShape key={i} p={p} />
      ))}
    </svg>
  );
}