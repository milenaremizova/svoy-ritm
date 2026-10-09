import type { CartItem } from "../../api/mock";
import { MilkThumb, BreadThumb, CheeseThumb } from "../product-thumbs";
import styles from "./ProductItem.module.css"

const thumbs = { milk: MilkThumb, bread: BreadThumb, cheese: CheeseThumb };

export function ProductItem({ item, qty = 1 }: { item: CartItem; qty?: number }) {
  const Thumb = thumbs[item.thumb];
  return (
    <div className={styles.row}>
      <Thumb />
      <div className={styles.info}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.priceRow}>
          <span className={styles.price}>{item.price} ₽</span>
          <span className={styles.weight}>{item.weightLabel}</span>
        </div>
      </div>
      <div className={styles.stepper}>
        <button aria-label="Меньше">−</button>
        <span>{qty}</span>
        <button aria-label="Больше">+</button>
      </div>
    </div>
  );
}