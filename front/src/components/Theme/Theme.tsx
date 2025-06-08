import { type ReactNode } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

const useThemeSwitcher = () => {
  const returnable: [undefined, (arg: boolean) => void] = [
    undefined,
    (checked: boolean) => {
      document.documentElement.dataset["theme"] = checked ? "dark" : "light";
    },
  ];
  return returnable;
};

export function Theme(): ReactNode {
  return (
    <Checkbox id="themeSwitcher" useStateTracker={useThemeSwitcher}>
      Dark Mode
    </Checkbox>
  );
}
