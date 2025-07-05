import { type ReactNode } from "react";
import styles from "./MutableDisplay.module.scss";
import {
  useEstimationEvent,
  type EstimationState,
  type Participant,
} from "../../../hooks/estimationEvent";
import { Display } from "../../Display/Display";

const showWatchFunctor = (current: EstimationState) => {
  const participants: { [arg: string]: Participant } =
    current?.participants || {};
  const { count, done } = Object.values(participants).reduce(
    (current, participant: Participant) => ({
      done:
        current.done && (participant.lurker || participant.selected != null),
      count: current.count + 1,
    }),
    { done: true, count: 0 },
  );
  return count > 1 && done;
};

export function MutableDisplay(props: { children: ReactNode }): ReactNode {
  const show = useEstimationEvent(showWatchFunctor);
  return (
    <>
      <div className={show ? styles.mutabledisplay : styles.hidden}>
        <Display />
      </div>
      <div className={show ? styles.hidden : styles.mutabledisplay}>
        {props.children || ""}
      </div>
    </>
  );
}
