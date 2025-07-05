import { useEffect, useState, type ReactNode } from "react";
import { Checkbox } from "../Checkbox/Checkbox";

enum Themes {
  dark = "dark",
  light = "light",
}

const localStorageKey = "theme";

const getStored = () => localStorage.getItem(localStorageKey);

const setStored = (value: string) =>
  localStorage.setItem(localStorageKey, value);

if (!getStored()) {
  setStored(Themes.light);
}

const initial = getStored() || Themes.light;

const getOpposite = (theme: string) =>
  theme == Themes.dark ? Themes.light : Themes.dark;

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
      {initial === Themes.light ? "Dark Mode" : "Light Mode"}
    </Checkbox>
  );
}
