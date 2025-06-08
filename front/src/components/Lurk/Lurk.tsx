import { type ReactNode } from "react";
import { type LurkType } from "./LurkType";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  changeParticipant,
  useEstimationEvent,
} from "../../hooks/estimationEvent";

const getStateTracker: (
  id: string,
) => () => [boolean | undefined, (value: boolean) => void] = (id: string) => {
  const useStateTracker: () => [
    boolean | undefined,
    (value: boolean) => void,
  ] = () => {
    const value = useEstimationEvent(
      (current) => current?.participants?.[id].lurker,
    );
    const setValue = (checked: boolean) => {
      changeParticipant(id, (participant) => ({
        ...participant,
        lurker: checked,
      }));
    };
    const returnable: [boolean | undefined, (value: boolean) => void] = [
      value,
      setValue,
    ];
    return returnable;
  };
  return useStateTracker;
};

export function Lurk(props: LurkType): ReactNode {
  return (
    <Checkbox
      id={`lurk-${props.id}`}
      useStateTracker={getStateTracker(props.id)}
    >
      Lurk
    </Checkbox>
  );
}
