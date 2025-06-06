import { type ReactNode } from "react";
import styles from "./PeerTileSet.module.scss";
import { type PeerTileSetType } from "./PeerTileSetType";
import { Scatter } from "../Scatter/Scatter";

export function PeerTileSet(props: PeerTileSetType): ReactNode {
  console.log("my iddddd", { props });
  return (
    <Scatter
      mapRotation={() => 0}
      size={400}
      selected={0}
      selections={[
        { selection: <div>hello</div>, className: styles.scatteredTile },
        { selection: <div>world</div>, className: styles.scatteredTile },
        { selection: <div>hello</div>, className: styles.scatteredTile },
      ]}
      readOnly={true}
    >
      {" "}
      <div data-testid="PeerTileSet" className={styles.peertileset}></div>{" "}
    </Scatter>
  );
}
