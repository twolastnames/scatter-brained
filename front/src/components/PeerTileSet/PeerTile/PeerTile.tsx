import { type ReactNode } from "react";
import styles from "./PeerTile.module.scss";
import { type PeerTileType } from "./PeerTileType";
import {
  useEstimationEvent,
  type EstimationState,
} from "../../../hooks/estimationEvent";
import { Scatter } from "../../Scatter/Scatter";

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
        <div className={styles.scatter}>
          <Scatter
            readOnly={true}
            size={40}
            selected={participant?.selected !== null ? 1 : 0}
            selections={[{ selection: <></> }, { selection: <div /> }]}
            mapRotation={() => 0}
          />
        </div>
        <div className={styles.name}>{participant?.name || ""}</div>
      </div>
    </div>
  );
}
