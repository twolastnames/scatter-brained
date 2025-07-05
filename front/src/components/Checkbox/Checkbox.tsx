import { type ReactNode } from "react";
import styles from "./Checkbox.module.scss";
import { type CheckboxType } from "./CheckboxType";

export function Checkbox(props: CheckboxType): ReactNode {
  const [checked, setChecked] = props.useStateTracker();
  return (
    <div className={styles.box}>
      <div
        data-testid="Checkbox"
        key={(!checked).toString()}
        className={styles.shell}
        onClick={() => {
          setChecked(!checked);
        }}
      >
        <div className={checked ? styles.checked : styles.hidden} />
      </div>
      <div>{props.children}</div>
    </div>
  );
}
