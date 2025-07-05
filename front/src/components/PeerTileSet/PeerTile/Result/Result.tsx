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
  const show = selected == null || !!displayed == false;
  return (
    <>
      <div className={show ? styles.show : styles.hidden}>
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
      </div>
      <div
        data-testid="Result"
        className={show ? styles.hidden : styles.result}
      >
        <div className={styles.inner}>
          {selected == null ? "?" : cardMap[selected]}
        </div>
      </div>
    </>
  );
}
