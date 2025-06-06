import { type ReactNode } from "react";
import styles from "./PeerTile.module.scss";
import { type PeerTileType } from "./PeerTileType";

export function PeerTile(props: PeerTileType): ReactNode {
  console.log("my iiiiiiid", { props });
  return <div data-testid="PeerTile" className={styles.peertile}></div>;
}
