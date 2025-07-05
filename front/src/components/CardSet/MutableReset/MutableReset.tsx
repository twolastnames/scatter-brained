import { type ReactNode } from "react";
import styles from "./MutableReset.module.scss";
import { useEstimationEvent } from "../../../hooks/estimationEvent";
import { Reset } from "../../Reset/Reset";

export function MutableReset(props: { children: ReactNode }): ReactNode {
  const displayed = useEstimationEvent((current) => !!current.displayed);

  return (
    <>
      <div className={displayed ? styles.mutablereset : styles.hidden}>
        <Reset />
      </div>
      <div className={displayed ? styles.hidden : styles.mutablereset}>
        {props.children || ""}
      </div>
    </>
  );
}
