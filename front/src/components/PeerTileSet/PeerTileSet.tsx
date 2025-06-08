import { type ReactNode } from "react";
import styles from "./PeerTileSet.module.scss";
import { Scatter } from "../Scatter/Scatter";
import { useEstimationEvent } from "../../hooks/estimationEvent";
import { PeerTile } from "./PeerTile/PeerTile";

export function PeerTileSet(): ReactNode {
  const participants = useEstimationEvent(
    (current) =>
      Object.entries(current?.participants || {}).reduce(
        (current, [key, value]) => ({
          ...current,
          ...(value?.lurker === false ? { [key]: value } : {}),
        }),
        {},
      ),
    {
      isEqual: (current, previous) => {
        const now = Object.keys(current || []);
        const before = Object.keys(previous || []);
        now.sort();
        before.sort();
        return JSON.stringify(now) === JSON.stringify(before);
      },
    },
  );

  const selections = Object.keys(participants || {}).map((id: string) => ({
    selection: <PeerTile id={id} />,
    className: styles.scatteredTile,
  }));
  return (
    <Scatter
      mapRotation={() => 0}
      size={400}
      selected={0}
      selections={selections.length < 2 ? [] : selections}
      readOnly={true}
    >
      Brained
    </Scatter>
  );
}
