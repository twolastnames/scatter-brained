import App from "../App";

import { render } from "@testing-library/react";
import { webSocket } from "./setup";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function testInitialized(description: string, testable: any) {
  test(description, () => {
    const payload = JSON.stringify({
      $patch: [
        { op: "add", path: "/displayed", value: false },
        { op: "add", path: "/participants", value: {} },
      ],
    });
    render(<App />);
    webSocket.recieve(payload);
    return testable();
  });
}
/* eslint-enable @typescript-eslint/no-explicit-any */
