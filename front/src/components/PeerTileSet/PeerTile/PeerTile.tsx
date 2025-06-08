import { type ReactNode } from "react";
import styles from "./PeerTile.module.scss";
import { type PeerTileType } from "./PeerTileType";
import {
  useEstimationEvent,
  type EstimationState,
} from "../../../hooks/estimationEvent";
import { Scatter } from "../../Scatter/Scatter";
import { Lurk } from "../../Lurk/Lurk";

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
            <Scatter
              readOnly={true}
              size={40}
              selected={participant?.selected != null ? 0 : 1}
              selections={[
                { selection: <></> },
                { selection: <div className={styles.nullCard} /> },
              ]}
              mapRotation={() => 0}
            />
            {participant?.selected == null ? (
              <div className={styles.lurk}>
                <Lurk id={props.id} />{" "}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className={styles.name}>
          <div>{participant?.name || ""}</div>
        </div>
      </div>
    </div>
  );
}
