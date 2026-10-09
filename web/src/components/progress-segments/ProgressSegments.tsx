import styles from "./ProgressSegments.module.css";

export function ProgressSegments({ done, total }: { done: number; total: number }) {
  return (
    <div className={styles.row}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`${styles.segment} ${
            i < done ? styles.done : i === done ? styles.current : ""
          }`}
        />
      ))}
    </div>
  );
}