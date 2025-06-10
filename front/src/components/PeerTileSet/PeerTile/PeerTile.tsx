import { type ReactNode } from "react";
import styles from "./PeerTile.module.scss";
import { type PeerTileType } from "./PeerTileType";
import {
  useEstimationEvent,
  type EstimationState,
} from "../../../hooks/estimationEvent";
import { Result } from "./Result/Result";

export function PeerTile(props: PeerTileType): ReactNode {
  const getParticipant = (state: EstimationState) =>
    state?.participants?.[props.id];
  const participant = useEstimationEvent((current) => getParticipant(current), {
    isEqual: (current, previous) =>
      JSON.stringify(current) === JSON.stringify(previous),
  });
  return (
    <div data-testid="PeerTile" className={styles.peertile}>
      <div className={styles.contents}>
        <div className={styles.controls}>
          <div className={styles.scatter}>
            <Result id={props.id} />
            <div
              className={
                participant?.selected == null ? styles.lurk : styles.hide
              }
            >
              {props.children}
            </div>
          </div>
        </div>
        <div className={styles.name}>
          <div>{participant?.name || ""}</div>
        </div>
      </div>
    </div>
  );
}
