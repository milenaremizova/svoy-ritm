import { Rover } from "../rover/Rover";
import styles from "./Chip.module.css";

type ChipStatus = "default" | "atRisk" | "inTransit" | "broken";

type ChipProps = {
  status: ChipStatus;
  label: string;
  onClick?: () => void;
};

const roverStateByStatus: Record<ChipStatus, "default" | "moving" | "garage"> = {
  default: "default",
  atRisk: "default",
  inTransit: "moving",
  broken: "garage",
};

export function Chip({ status, label, onClick }: ChipProps) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag className={`${styles.chip} ${styles[status]}`} onClick={onClick}>
      <Rover state={roverStateByStatus[status]} size={26} />
      {label}
    </Tag>
  );
}