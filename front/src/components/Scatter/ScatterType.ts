import type { PropsWithChildren, ReactNode } from "react";

export type Selection = {
  selection: ReactNode | null;
  className?: string;
};

export interface ScatterType extends PropsWithChildren {
  readOnly: boolean;
  size: number;
  selections: Array<Selection>;
  selected: number;
}
