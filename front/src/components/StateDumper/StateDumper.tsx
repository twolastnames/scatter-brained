import { useState, type ReactNode } from "react";
import { useEstimationEvent } from "../../hooks/estimationEvent";
import styles from "./StateDumper.module.scss";
import { Checkbox } from "../Checkbox/Checkbox";

export function StateDumper(): ReactNode {
  const [checked, setChecked] = useState<boolean>(false);
  const state = useEstimationEvent((current) => current || {}, {
    isEqual: () => false,
  });
  return (
    <>
      <Checkbox
        id="developermode"
        useStateTracker={() => [checked, setChecked]}
      >
        Development Mode
      </Checkbox>
      {checked && (
        <span key={JSON.stringify(state)} className={styles.border}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </span>
      )}
    </>
  );
}
