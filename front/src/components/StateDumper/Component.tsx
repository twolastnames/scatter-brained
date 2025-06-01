import { type ReactNode } from "react";
import { useEstimationEvent } from "../../hooks/estimationEvent";
import styles from "./Styles.module.scss";

export function StateDumper(): ReactNode {
  const state = useEstimationEvent((current) => current || {}, {});
  const text = JSON.stringify(state, null, 2);
  return <span className={styles.border}>{text}</span>;
}
