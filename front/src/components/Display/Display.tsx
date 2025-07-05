import { type ReactNode } from "react";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  changeEstimationState,
  useEstimationEvent,
} from "../../hooks/estimationEvent";

const setValue = (change: boolean) => {
  changeEstimationState((current) => ({
    ...current,
    displayed: change,
  }));
};

export function Display(): ReactNode {
  const useTracker = () => {
    const displayed = useEstimationEvent((current) => !!current?.displayed);
    const returnable: [boolean, (arg: boolean) => void] = [
      !!displayed,
      setValue,
    ];
    return returnable;
  };

  return (
    <Checkbox id={`display`} useStateTracker={useTracker}>
      Show Estimates
    </Checkbox>
  );
}
