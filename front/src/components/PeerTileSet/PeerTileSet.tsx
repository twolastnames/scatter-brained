import { type ReactNode } from "react";
import styles from "./PeerTileSet.module.scss";
import { Scatter } from "../Scatter/Scatter";
import { useEstimationEvent } from "../../hooks/estimationEvent";
import { PeerTile } from "./PeerTile/PeerTile";

export function PeerTileSet(): ReactNode {
  const participants = useEstimationEvent((current) => current?.participants, {
    isEqual: (current, previous) => {
      const now = Object.keys(current || []).filter(
        (key) => current?.[key].lurker === false,
      );
      const before = Object.keys(previous || []).filter(
        (key) => previous?.[key].lurker === false,
      );
      now.sort();
      before.sort();
      return JSON.stringify(now) === JSON.stringify(before);
    },
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
      Brained
    </Scatter>
  );
}
