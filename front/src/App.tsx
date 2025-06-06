import { StateDumper } from "./components/StateDumper/StateDumper";
import styles from "./App.module.scss";
import { CardSet } from "./components/CardSet/CardSet";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.documentElement.dataset["theme"] = "light";
  }, []);
  return (
    <>
      <div className={styles.page} data-testid="ScatterBrained">
        <CardSet />
        <StateDumper />
        <input
          name="themeToggle"
          onClick={(event) => {
            document.documentElement.dataset["theme"] = event.currentTarget
              .checked
              ? "dark"
              : "light";
          }}
          type="checkbox"
          id="themeSwitch"
        />
        <label for="themeToggle">Dark Mode</label>
      </div>
    </>
  );
}

export default App;
