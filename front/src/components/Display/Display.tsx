import { type ReactNode } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import styles from "./Display.module.scss";
import {
  changeEstimationState,
  useEstimationEvent,
  type EstimationState,
  type Participant,
} from "../../hooks/estimationEvent";

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

const setValue = (change: boolean) => {
  changeEstimationState((current) => ({
    ...current,
    displayed: change,
  }));
};

export function Display(): ReactNode {
  const show = useEstimationEvent(showWatchFunctor);
  const useTracker = () => {
    const displayed = useEstimationEvent((current) => !!current?.displayed);
    const returnable: [boolean, (arg: boolean) => void] = [
      !!displayed,
      setValue,
    ];
    return returnable;
  };

  return (
    <div className={show ? styles.show : styles.hide}>
      <Checkbox id={`display`} useStateTracker={useTracker}>
        Show Estimates
      </Checkbox>
    </div>
  );
}
