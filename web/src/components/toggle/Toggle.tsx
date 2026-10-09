import styles from "./Toggle.module.css";

export function Toggle({ on, onChange }: { on: boolean, onChange?: (value: boolean) => void }) {
    return (
        <div
            className={`${styles.track} ${on ? styles.on : ""}`}
            onClick={() => onChange?.(!on)}
            role="switch"
            aria-checked={on}
        >
            <div className={styles.thumb} />
        </div>
    );
}