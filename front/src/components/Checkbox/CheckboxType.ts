import type { PropsWithChildren } from "react";

export interface CheckboxType extends PropsWithChildren {
  id: string;
  useStateTracker: () => [
    value: boolean | undefined,
    setValue: (value: boolean) => void,
  ];
}
