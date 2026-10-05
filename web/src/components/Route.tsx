import { Rover } from "./Rover";
import styles from "./Route.module.css";

const ROW_H = 56;
const WIDTH = 240;

type Point = { x: number; y: number };

function stopXY(index: number, total: number, width: number): Point {
  const height = (total + 1) * ROW_H;
  const y = height - (index + 0.5) * ROW_H; // чем больше индекс, тем выше
  const x = index % 2 === 0 ? 28 : width - 28;
  return { x, y };
}

function toPath(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`).join(" ");
}

export function Route({ done, total }: { done: number; total: number }) {
  const height = (total + 1) * ROW_H;
  // остановки 0..total-1, на позиции total — флажок цели
  const points = Array.from({ length: total + 1 }, (_, i) => stopXY(i, total, WIDTH));
  const current = Math.min(done, total); // следующая остановка
  const next = points[current];
  const flag = points[total];

  return (
    <div className={styles.wrap} style={{ width: WIDTH, height }}>
      <svg width={WIDTH} height={height} aria-hidden="true">
        {/* сначала пунктир, потом сплошная поверх */}
        <path className={styles.futureLine} d={toPath(points.slice(current))} />
        {current > 0 && (
          <path className={styles.pastLine} d={toPath(points.slice(0, current + 1))} />
        )}

        {points.slice(0, total).map((p, i) =>
          i < done ? (
            <g key={i}>
              <circle className={styles.doneStop} cx={p.x} cy={p.y} r={14} />
              <path className={styles.check} d={`M${p.x - 6} ${p.y} l4 4 l8 -8`} />
            </g>
          ) : i === done ? (
            <g key={i}>
              <circle className={styles.halo} cx={p.x} cy={p.y} r={22} />
              <circle className={styles.nextStop} cx={p.x} cy={p.y} r={14} />
            </g>
          ) : (
            <circle key={i} className={styles.futureStop} cx={p.x} cy={p.y} r={12} />
          )
        )}

        <rect className={styles.pole} x={flag.x - 1.5} y={flag.y - 20} width={3} height={28} rx={1.5} />
        <path className={styles.flag} d={`M${flag.x + 1.5} ${flag.y - 20} h18 l-5 7 l5 7 h-18 Z`} />
      </svg>

      <Rover size={32} style={{ position: "absolute", left: next.x - 16, top: next.y - 58 }} />
    </div>
  );
}