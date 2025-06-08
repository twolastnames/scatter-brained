import { type ReactNode } from "react";
import styles from "./Checkbox.module.scss";
import { type CheckboxType } from "./CheckboxType";

export function Checkbox(props: CheckboxType): ReactNode {
  return (
    <div data-testid="Checkbox" className={styles.checkbox}>
      <input
        onClick={(event) => {
          props.onClick(event.currentTarget.checked);
        }}
        type="checkbox"
        id={props.id}
      />
      <label for={props.id}>{props.children}</label>
    </div>
  );
}
