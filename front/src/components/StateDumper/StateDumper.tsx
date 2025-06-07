import { type ReactNode } from "react";
import { useEstimationEvent } from "../../hooks/estimationEvent";
import styles from "./StateDumper.module.scss";

export function StateDumper(): ReactNode {
  const state = useEstimationEvent((current) => current || {}, {
    isEqual: () => false,
  });
  const text = JSON.stringify(state, null, 2);
  console.log("statedumperrrrr", { text });
  return (
    <span key={text} className={styles.border}>
      {text}
    </span>
  );
}
