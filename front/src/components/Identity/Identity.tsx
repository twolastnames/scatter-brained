import { useEffect, useState, type ReactNode } from "react";
import styles from "./Identity.module.scss";
import { getIdentity, getName, setName } from "../../common/identity";
import { changeParticipant } from "../../hooks/estimationEvent";
import { debounce } from "lodash";

const debouncedChangeParticipant = debounce(changeParticipant, 1000);

export function Identity(): ReactNode {
  const [value, setValue] = useState<string>(getName());
  useEffect(() => {
    setName(value);
    setTimeout(() => {
      debouncedChangeParticipant(getIdentity(), (participant) => ({
        ...participant,
        name: getName(),
      }));
    }, 0);
  }, [value]);
  return (
    <div>
      <label htmlFor="identity">Name</label>
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
