import type { ReactNode } from "react";

export interface ScatterType {
  size: number;
  selections: Array<ReactNode | null>;
  selected: number;
}
