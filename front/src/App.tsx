import { StateDumper } from "./components/StateDumper/StateDumper";
import styles from "./App.module.scss";
import { CardSet } from "./components/CardSet/CardSet";
import { useEffect } from "react";
import { PeerTileSet } from "./components/PeerTileSet/PeerTileSet";
import { Identity } from "./components/Identity/Identity";

function App() {
  useEffect(() => {
    document.documentElement.dataset["theme"] = "light";
  }, []);
  return (
    <>
      <div className={styles.page} data-testid="ScatterBrained">
        <div className={styles.estimation}>
          <CardSet />
          <div className={styles.controls}>
            <Identity />
            <div>
              <input
                name="themeToggle"
                onClick={(event) => {
                  document.documentElement.dataset["theme"] = event
                    .currentTarget.checked
                    ? "dark"
                    : "light";
                }}
                type="checkbox"
                id="themeSwitch"
              />
              <label for="themeToggle">Dark Mode</label>
            </div>
          </div>
          <PeerTileSet />
        </div>
        <StateDumper />
      </div>
    </>
  );
}

export default App;
