import { StateDumper } from "./components/StateDumper/StateDumper";
import styles from "./App.module.scss";
import { CardSet } from "./components/CardSet/CardSet";
import { useEffect } from "react";
import { PeerTileSet } from "./components/PeerTileSet/PeerTileSet";
import { Identity } from "./components/Identity/Identity";
import { Checkbox } from "./components/Checkbox/Checkbox";
import { Lurk } from "./components/Lurk/Lurk";
import { getIdentity } from "./common/identity";

function App() {
  useEffect(() => {
    document.documentElement.dataset["theme"] = "light";
  }, []);
  return (
    <>
      <div className={styles.page} data-testid="ScatterBrained">
        <div className={styles.estimation}>
          <CardSet />
          <PeerTileSet />
        </div>
        <div className={styles.controls}>
          <Identity />
          <Checkbox
            id="themeSwitch"
            onClick={(checked) => {
              document.documentElement.dataset["theme"] = checked
                ? "dark"
                : "light";
            }}
          >
            Dark Mode
          </Checkbox>
          <Lurk id={getIdentity()} />
        </div>
        <StateDumper />
      </div>
    </>
  );
}

export default App;
