import type { PropsWithChildren } from "react";

export interface CheckboxType extends PropsWithChildren {
  onClick: (value: boolean) => void;
  id: string;
}
