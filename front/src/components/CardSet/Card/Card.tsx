import { type ReactNode } from "react";
import styles from "./Card.module.scss";
import { type CardType } from "./CardType";
import { cardMap } from "../../../common/cardMap";

export function Card(props: CardType): ReactNode {
  return (
    <div
      data-testid="Card"
      className={styles.card}
      onClick={() => props.onClick && props.onClick()}
    >
      <div className={styles.inner}>
        {props.value == null ? "" : cardMap[props.value] || "?"}
      </div>
    </div>
  );
}
