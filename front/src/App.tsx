import "./global.scss";
import styles from "./App.module.scss";
import { CardSet } from "./components/CardSet/CardSet";
import { useEffect } from "react";
import { PeerTileSet } from "./components/PeerTileSet/PeerTileSet";
import { Identity } from "./components/Identity/Identity";
import { Lurk } from "./components/Lurk/Lurk";
import { getIdentity } from "./common/identity";
import { Theme } from "./components/Theme/Theme";
import { Display } from "./components/Display/Display";

function App() {
  useEffect(() => {
    document.documentElement.dataset["theme"] = "light";
  }, []);
  return (
    <>
      <div className={styles.page} data-testid="ScatterBrained">
        <div className={styles.estimation}>
          <div className={styles.controls}>
            <CardSet />
            <div className={styles.controlList}>
              <Display />
              <Identity />
              <Lurk id={getIdentity()} />
              <Theme />
            </div>
          </div>
          <PeerTileSet />
        </div>
      </div>
    </>
  );
}

export default App;
