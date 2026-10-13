import { Rover } from "../rover/Rover";
import { Battery } from "../battery/Battery";
import { Button } from "../button/Button";
import styles from "./DeadlineCard.module.css";

export type DeadlineCardStatus =
  | "active" | "atRisk" | "frozen" | "broken" | "levelUp";

type DeadlineCardProps = {
  status: DeadlineCardStatus;
  label: string;     // мелкая строка сверху
  big: string;       // крупная строка
  small: string;     // пояснение снизу
  progress?: string; // «4 из 8» справа сверху
  onRestart?: () => void; // только для broken
};

export function DeadlineCard({ status, label, big, small, progress, onRestart }: DeadlineCardProps) {
  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        {progress && <span className={styles.progress}>{progress}</span>}
      </div>
      <div className={styles.big}>{big}</div>
      <div className={styles.small}>{small}</div>

      <Corner status={status} />

      {status === "broken" && onRestart && (
        <div className={styles.restart}>
          <Button variant="outline" onClick={onRestart}>Начать заново</Button>
        </div>
      )}
    </div>
  );
}

// Картинка в углу. Не экспортируется — нужна только этой карточке.
function Corner({ status }: { status: DeadlineCardStatus }) {
  if (status === "active") return null;
  if (status === "frozen") {
    return (
      <div className={styles.corner}>
        <Rover state="charging" size={56} />
        <Battery />
      </div>
    );
  }
  if (status === "broken") {
    return (
      <div className={styles.corner}>
        <Rover state="garage" size={56} />
      </div>
    );
  }
  return (
    <div className={styles.corner}>
      <Rover size={56} />
    </div>
  );
}