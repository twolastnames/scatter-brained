import { applyPatch, compare } from "fast-json-patch";
import { useEffect, useState } from "react";

export type Participant = {
  selected?: number;
  lurker: boolean;
  name: string;
};

export type EstimationState = {
  participants?: {
    [id: string]: Participant;
  };
  displayed?: boolean;
};

export const initialEstimationState: EstimationState = {
  participants: {},
  displayed: false,
};

export type InterestGrabber<TYPE> = (
  current: EstimationState,
  previous?: EstimationState,
) => TYPE;
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

export function useInitialEstimationState(): EstimationState {
  const [value, setValue] = useState<EstimationState>(currentState);
  useEffect(() => {
    const wait = () => {
      if (!currentState || JSON.stringify(currentState) === "{}") {
        setTimeout(wait, 200);
        return;
      }
      setValue(JSON.parse(JSON.stringify(currentState)));
    };
    wait();
  }, []);
  return value;
}

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
      listener(
        JSON.parse(JSON.stringify(currentState)),
        JSON.parse(JSON.stringify(previous)),
      );
    }
  }
  if (JSON.stringify(currentState) === "{}") {
    changeEstimationState((current) => ({
      ...current,
      ...initialEstimationState,
    }));
  }
}

socket.onmessage = (event) => {
  patchEstimationState(event.data);
};

export async function changeEstimationState(getChange: Changer) {
  await stateInitialization;
  const comingState = getChange(JSON.parse(JSON.stringify(currentState)));
  const difference = compare(currentState, comingState);
  if (difference && difference.length > 0) {
    socket.send(JSON.stringify({ $patch: difference }));
  }
}

export async function changeParticipant(
  id: string,
  alterParticipant: (participant: Participant) => Participant,
) {
  await changeEstimationState((current) => {
    if (!current.participants) {
      current.participants = {};
    }
    if (!current.participants?.[id]) {
      current.participants[id] = {
        lurker: false,
        name: id,
      };
    }
    current.participants[id] = alterParticipant(current.participants[id]);
    return current;
  });
}

type EstimationEventOptions<RESULT> = {
  isEqual?: InterestComparable<RESULT | undefined>;
};

export function useEstimationEvent<RESULT>(
  getRerendableValue: InterestGrabber<RESULT | undefined>,
  options?: EstimationEventOptions<RESULT>,
) {
  const [value, setValue] = useState<RESULT | undefined>(
    getRerendableValue(currentState, undefined),
  );
  const listener = (current: EstimationState, previous?: EstimationState) => {
    const result = getRerendableValue(current, previous);
    if (options?.isEqual) {
      if (!options.isEqual(result, value)) {
        setValue(result);
      }
      return;
    }
    setValue(result);
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
