import { type ReactNode } from "react";
import styles from "./Result.module.scss";
import { type ResultType } from "./ResultType";
import { useEstimationEvent } from "../../../../hooks/estimationEvent";
import { cardMap } from "../../../../common/cardMap";
import { Scatter } from "../../../Scatter/Scatter";

export function Result(props: ResultType): ReactNode {
  const selected = useEstimationEvent(
    (current) => current?.participants?.[props.id].selected,
    { isEqual: () => false },
  );
  const displayed = useEstimationEvent((current) => current?.displayed);
  return selected == null || !!displayed == false ? (
    <Scatter
      readOnly={true}
      size={40}
      selected={selected != null ? 0 : 1}
      selections={[
        { selection: <></> },
        { selection: <div className={styles.nullCard} /> },
      ]}
      mapRotation={() => 0}
    />
  ) : (
    <div data-testid="Result" className={styles.result}>
      {cardMap[selected]}
    </div>
  );
}
