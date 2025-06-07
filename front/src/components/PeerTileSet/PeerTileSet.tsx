import { type ReactNode } from "react";
import styles from "./PeerTileSet.module.scss";
import { Scatter } from "../Scatter/Scatter";
import { useEstimationEvent } from "../../hooks/estimationEvent";
import { PeerTile } from "./PeerTile/PeerTile";

export function PeerTileSet(): ReactNode {
  const participants = useEstimationEvent((current) => current?.participants, {
    isEqual: (current, previous) =>
      Object.keys(current || []).length === Object.keys(previous || []).length,
  });
  return (
    <Scatter
      mapRotation={() => 0}
      size={400}
      selected={0}
      selections={Object.keys(participants || {}).map((id: string) => ({
        selection: <PeerTile id={id} />,
        className: styles.scatteredTile,
      }))}
      readOnly={true}
    >
      {" "}
      <div data-testid="PeerTileSet" className={styles.peertileset}></div>{" "}
    </Scatter>
  );
}
