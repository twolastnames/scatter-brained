import { type ReactNode } from "react";
import styles from "./PeerTileSet.module.scss";
import { Scatter } from "../Scatter/Scatter";
import { useEstimationEvent } from "../../hooks/estimationEvent";
import { PeerTile } from "./PeerTile/PeerTile";
import { type Participant } from "../../hooks/estimationEvent";
import { Lurk } from "../Lurk/Lurk";

function getNumberFromComparision<TYPE>(a: TYPE, b: TYPE): -1 | 0 | 1 {
  return a == b ? 0 : a > b ? -1 : 1;
}

const findRandomishSelection = (values: Array<boolean>) => {
  const indexes: Array<number> = values.reduce(
    (current: Array<number>, value, index: number) =>
      value ? [...current, index] : current,
    [],
  );
  if (indexes.length == 0) {
    return Math.floor(Math.random()) / values.length;
  }
  const found = Math.floor(Math.random()) / indexes.length;
  return indexes[found];
};

export function PeerTileSet(): ReactNode {
  const participants: { [arg: string]: Participant } =
    useEstimationEvent(
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
    ) || {};

  const participantArray = Object.entries(participants).map(
    ([id, value]: [string, Participant]) => ({ id, ...value }),
  );
  participantArray.sort((a, b) => getNumberFromComparision(b.name, a.name));

  const selection = findRandomishSelection(
    participantArray.map(({ selected }) => !selected),
  );
  const selections = participantArray.map(
    (participant: Participant & { id: string }, index: number) => ({
      selection: (
        <PeerTile
          key={`participant-${participant.id}-${index}`}
          id={participant.id}
        >
          {index == selection && participant.selected == null ? (
            <Lurk id={participant.id} />
          ) : (
            <></>
          )}
        </PeerTile>
      ),
      className: styles.scatteredTile,
    }),
  );
  return (
    <Scatter
      mapRotation={() => 0}
      size={600}
      selected={selection}
      selections={selections.length < 2 ? [] : selections}
      readOnly={true}
    >
      Brained
    </Scatter>
  );
}
