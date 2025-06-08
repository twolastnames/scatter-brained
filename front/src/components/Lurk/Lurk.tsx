import { type ReactNode } from "react";
import { type LurkType } from "./LurkType";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  changeParticipant,
  useEstimationEvent,
} from "../../hooks/estimationEvent";

export function Lurk(props: LurkType): ReactNode {
  const value = useEstimationEvent(
    (current) => current?.participants?.[props.id].lurker,
  );
  if (value == null) {
    return <></>;
  }
  return (
    <Checkbox
      id={`lurk-${props.id}`}
      onClick={(checked) => {
        changeParticipant(props.id, (participant) => ({
          ...participant,
          lurker: checked,
        }));
      }}
      startValue={value}
    >
      Lurk
    </Checkbox>
  );
}
