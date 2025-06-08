import { type ReactNode } from "react";
import { type LurkType } from "./LurkType";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  changeParticipant,
  useInitialEstimationState,
} from "../../hooks/estimationEvent";
import { getIdentity } from "../../common/identity";

export function Lurk(props: LurkType): ReactNode {
  const startValue =
    useInitialEstimationState()?.participants?.[getIdentity()].lurker;
  if (startValue == null) {
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
      startValue={startValue}
    >
      Lurk
    </Checkbox>
  );
}
