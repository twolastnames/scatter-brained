import { useEffect, useState, type ReactNode } from "react";
import styles from "./Identity.module.scss";
import { getIdentity, getName, setName } from "../../common/identity";
import { changeParticipant } from "../../hooks/estimationEvent";

export function Identity(): ReactNode {
  const [value, setValue] = useState<string>(getName());
  useEffect(() => {
    setName(value);
    setTimeout(() => {
      changeParticipant(getIdentity(), (participant) => ({
        ...participant,
        name: getName(),
      }));
    }, 0);
  }, [value]);
  return (
    <div>
      <label for="identity">Name</label>
      <input
        type="text"
        data-testid="Identity"
        name="identity"
        className={styles.identity}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        value={value}
      />
    </div>
  );
}
