import "@testing-library/jest-dom";
import { act } from "@testing-library/react";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const estimationEvent = require("../estimation/Event");

const createEstimationEvent = estimationEvent.__get__("patchEstimationState");

export const webSocket = {
  send: jest.fn(),
  readyState: 1,
  recieve: (value: string) => {
    act(() => {
      createEstimationEvent(value);
    });
  },
};
estimationEvent.__set__("socket", webSocket);

beforeEach(() => {
  webSocket.send.mockClear();
});
