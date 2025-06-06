import { Scatter } from "./components/Scatter/Scatter";
import { StateDumper } from "./components/StateDumper/StateDumper";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";

function App() {
  const [selected, setSelected] = useState<number>(0);
  useEffect(() => {
    setInterval(() => {
      setSelected((previous) => previous + 1);
    }, 2000);
  }, []);
  return (
    <div
      className={[styles.darkTheme, styles.page].join(" ")}
      data-testid="ScatterBrained"
    >
      <Scatter selected={selected} size={300} selections={["hello", "world"]} />
      <Scatter
        selected={selected}
        size={200}
        selections={["hello", "world", "again"]}
      />
      <Scatter
        selected={selected}
        size={100}
        selections={["hello", "world", "again", "more"]}
      />
      <Scatter
        selected={selected}
        size={500}
        selections={["hello", "world", "again", "more", "moore"]}
      />
      <StateDumper />
    </div>
  );
}

export default App;
