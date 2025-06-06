import { useState, type ReactNode } from "react";
import styles from "./CardSet.module.scss";
import { Scatter } from "../Scatter/Scatter";
import { Card } from "./Card/Card";

export function CardSet(): ReactNode {
  const [selected, setSelected] = useState<number>(0);
  const availableCards = [null, 0, 1, 2, 3, 4, 5].map((value, index) => ({
    selection: (
      <Card
        value={value}
        onClick={() => {
          setSelected(index);
        }}
      />
    ),
    className: value == null ? styles.nullCard : undefined,
  }));
  return (
    <div data-testid="CardSet" className={styles.cardset}>
      <Scatter size={400} selected={selected} selections={availableCards}>
        Hello World
      </Scatter>
    </div>
  );
}
