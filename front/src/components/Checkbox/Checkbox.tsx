import { useState, type ReactNode } from "react";
import styles from "./Checkbox.module.scss";
import { type CheckboxType } from "./CheckboxType";

export function Checkbox(props: CheckboxType): ReactNode {
  const [checked, setChecked] = useState<boolean>(!!props.startValue);
  return (
    <div data-testid="Checkbox" className={styles.checkbox}>
      <input
        onClick={(event) => {
          props.onClick(event.currentTarget.checked);
          setChecked(event.currentTarget.checked);
        }}
        checked={checked}
        type="checkbox"
        id={props.id}
      />
      <label for={props.id}>{props.children}</label>
    </div>
  );
}
