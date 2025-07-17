import { useEffect, useState, type ReactNode } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

type Themes = "dark" | "light";

const localStorageKey = "theme";

const getStored: () => Themes = () =>
  localStorage.getItem(localStorageKey) as Themes;

const setStored = (value: string) =>
  localStorage.setItem(localStorageKey, value);

if (!getStored()) {
  setStored("light");
}

const initial = getStored() || "light";

const getOpposite = (theme: Themes) => (theme == "dark" ? "light" : "dark");

const useThemeSwitcher = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const returnable: [boolean, (arg: boolean) => void] = [
    checked,
    (checked: boolean) => {
      setChecked(checked);
      const theme = checked ? getOpposite(initial) : initial;
      setStored(theme);
      document.documentElement.dataset["theme"] = theme;
    },
  ];
  return returnable;
};

export function Theme(): ReactNode {
  useEffect(() => {
    setTimeout(() => {
      document.documentElement.dataset["theme"] = initial || "light";
    }, 0);
  }, []);
  return (
    <Checkbox id="themeSwitcher" useStateTracker={useThemeSwitcher}>
      {initial === "light" ? "Dark Mode" : "Light Mode"}
    </Checkbox>
  );
}
