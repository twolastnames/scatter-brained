import { type ReactNode } from "react";
import styles from "./CardSet.module.scss";
import { Scatter } from "../Scatter/Scatter";
import { Card } from "./Card/Card";
import { cardMap } from "../../common/cardMap";
import {
  changeParticipant,
  useEstimationEvent,
} from "../../hooks/estimationEvent";
import { getIdentity } from "../../common/identity";

export function CardSet(): ReactNode {
  const selected = useEstimationEvent(
    (current) => current?.participants?.[getIdentity()].selected,
    { isEqual: () => false },
  );
  const availableCards = cardMap
    .reduce(
      (current: Array<number | null>, _, index) => [...current, index],
      [null],
    )
    .map((value) => ({
      selection: (
        <Card
          value={value}
          onClick={() => {
            changeParticipant(getIdentity(), (current) => ({
              ...current,
              selected: value == null ? undefined : value,
            }));
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
        selected={selected == null ? 0 : selected + 1}
        selections={availableCards}
      >
        Scatter
      </Scatter>
    </div>
  );
}
