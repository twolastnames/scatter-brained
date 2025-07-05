import { type ReactNode } from "react";
import styles from "./Reset.module.scss";
import {
  changeEstimationState,
  type Participant,
} from "../../hooks/estimationEvent";

export function Reset(): ReactNode {
  return (
    <button
      id="reset"
      data-testid="Reset"
      className={styles.reset}
      onClick={() => {
        changeEstimationState((current) => ({
          displayed: false,
          participants: Object.entries(current.participants || {}).reduce(
            (
              current,
              [id, partipant]: [id: string, participant: Participant],
            ) => ({
              ...current,
              [id]: {
                ...partipant,
                selected: undefined,
              },
            }),
            {},
          ),
        }));
      }}
      name="Reset"
    >
      Reset
    </button>
  );
}
