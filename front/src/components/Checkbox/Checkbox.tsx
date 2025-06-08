import { type ReactNode } from "react";
import styles from "./Checkbox.module.scss";
import { type CheckboxType } from "./CheckboxType";

export function Checkbox(props: CheckboxType): ReactNode {
  const [checked, setChecked] = props.useStateTracker();
  return (
    <div data-testid="Checkbox" className={styles.checkbox}>
      <input
        onClick={(event) => {
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
