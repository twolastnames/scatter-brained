import { useState, type ReactNode } from "react";
import styles from "./CardSet.module.scss";
import { Scatter } from "../Scatter/Scatter";
import { Card } from "./Card/Card";
import { cardMap } from "../../common/cardMap";
import { changeParticipant } from "../../hooks/estimationEvent";
import { getIdentity } from "../../common/identity";

export function CardSet(): ReactNode {
  const [selected, setSelected] = useState<number>(0);
  const availableCards = cardMap
    .reduce(
      (current: Array<number | null>, _, index) => [...current, index],
      [null],
    )
    .map((value, index) => ({
      selection: (
        <Card
          value={value}
          onClick={() => {
            changeParticipant(getIdentity(), (current) => ({
              ...current,
              selection: value,
            }));
            setSelected(index);
          }}
        />
      ),
      className: value == null ? styles.nullCard : undefined,
    }));
  return (
    <div data-testid="CardSet" className={styles.cardset}>
      <Scatter
        mapRotation={(angle) => angle}
        readOnly={false}
        size={400}
        selected={selected}
        selections={availableCards}
      >
        Scatter
      </Scatter>
    </div>
  );
}
