import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline" | "text" | "icon";
};

export function Button({ variant = "primary", className, ...rest }: ButtonProps) {
    return <button className={`${styles.button} ${styles[variant]} ${className ?? ""}`} {...rest} />;
}
