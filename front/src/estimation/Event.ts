import { applyPatch, compare } from "fast-json-patch";
import { initialEstimationState, type EstimationState } from "./State";
import { useEffect, useState } from "react";

export type InterestGrabber<TYPE> = (
  current: EstimationState,
  previous?: EstimationState,
) => TYPE | void;
export type InterestComparable<TYPE> = (
  current: TYPE | undefined,
  next: TYPE | undefined,
) => boolean;
export type Changer = (current: EstimationState) => EstimationState;

const listeners = new Set<
  (current: EstimationState, previous?: EstimationState) => void
>();

const socketLocation = `ws://localhost:3000`;

const socket = new WebSocket(socketLocation);

export const waitForInitialization = new Promise((resolve) => {
  const tryAgain = () => {
    if (socket.readyState === 1) {
      resolve(socket);
      return;
    }
    setTimeout(tryAgain, 50);
  };
  setTimeout(tryAgain, 0);
});

let currentState: EstimationState = {};

export const stateInitialization = new Promise((resolve) => {
  waitForInitialization.then(() => {
    const tryAgain = () => {
      if (JSON.stringify(currentState) !== "{}") {
        resolve(socket);
        return;
      }
      socket.send(
        `{"$patch":${JSON.stringify(compare({}, initialEstimationState))}}`,
      );
      setTimeout(tryAgain, 50);
    };
    setTimeout(tryAgain, 0);
  });
});

function patchEstimationState(data: string) {
  const patch = JSON.parse(data)?.["$patch"];
  if (patch) {
    const previous = JSON.parse(JSON.stringify(currentState));
    try {
      currentState = applyPatch(currentState, patch).newDocument;
    } catch (error) {
      console.error("error applying patch: ", error);
      return;
    }
    for (const listener of listeners) {
      listener(currentState, previous);
    }
  }
  if (JSON.stringify(currentState) === "{}") {
    changeEstimationState((current) => ({ dipslayed: true, ...current }));
  }
}

socket.onmessage = (event) => {
  patchEstimationState(event.data);
};

export async function changeEstimationState(getChange: Changer) {
  await stateInitialization;
  const comingState = getChange(currentState);
  const difference = compare(currentState, comingState);
  if (difference && difference.length > 0) {
    socket.send(JSON.stringify({ $patch: difference }));
  }
}

type EstimationEventOptions<RESULT> = {
  isEqual?: InterestComparable<RESULT | undefined>;
};

export function useEstimationEvent<RESULT>(
  getRerendableValue: InterestGrabber<RESULT | undefined>,
  options?: EstimationEventOptions<RESULT>,
) {
  const [value, setValue] = useState<RESULT | undefined>(undefined);
  const listener = (current: EstimationState, previous?: EstimationState) => {
    const result = getRerendableValue(current, previous);
    if (result === undefined) {
      return;
    }
    if (options?.isEqual) {
      if (!options.isEqual(value, result)) {
        setValue(result);
      }
      return;
    }
    if (value !== result) {
      setValue(result);
    }
  };
  useEffect(() => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
    // eslint-disable-next-line   react-hooks/exhaustive-deps
  }, []);
  return value;
}
