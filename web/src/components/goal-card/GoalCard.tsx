import { Coin } from "../coin/Coin";
import styles from "./GoalCard.module.css";

type GoalCardProps = {
  goal: { links: number; dateLabel: string; reward: number };
  selected?: boolean;
  onSelect?: () => void;
};

// 1 заказ, 3 заказа, 8 заказов
function ordersWord(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "заказ";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "заказа";
  return "заказов";
}

export function GoalCard({ goal, selected = false, onSelect }: GoalCardProps) {
  return (
    <button
      type="button"
      className={`${styles.card} ${selected ? styles.selected : ""}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className={styles.links}>
        {goal.links} {ordersWord(goal.links)}
      </span>
      <span className={styles.date}>{goal.dateLabel}</span>
      <span className={styles.reward}>
        +{goal.reward} <Coin size={16} />
      </span>
    </button>
  );
}