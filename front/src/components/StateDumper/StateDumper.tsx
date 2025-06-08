import { useState, type ReactNode } from "react";
import { useEstimationEvent } from "../../hooks/estimationEvent";
import styles from "./StateDumper.module.scss";
import { Checkbox } from "../Checkbox/Checkbox";

export function StateDumper(): ReactNode {
  const [components, setComponents] = useState<ReactNode>(<></>);
  const state = useEstimationEvent((current) => current || {}, {
    isEqual: () => false,
  });
  return (
    <>
      <Checkbox
        id="developermode"
        startValue={false}
        onClick={(checked) => {
          setComponents(
            checked ? (
              <span className={styles.border}>
                <pre>{JSON.stringify(state, null, 2)}</pre>
              </span>
            ) : (
              <></>
            ),
          );
        }}
      >
        Development Mode
      </Checkbox>
      {components}
    </>
  );
}
