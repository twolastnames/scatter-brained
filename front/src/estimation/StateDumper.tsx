import { type ReactNode } from "react";
import { useEstimationEvent } from "./Event";

export function StateDumper(): ReactNode {
  const state = useEstimationEvent((current) => current || {}, {});
  const text = JSON.stringify(state, null, 2);
  console.log("textttttt", { text });
  return <span>{text}</span>;
}
