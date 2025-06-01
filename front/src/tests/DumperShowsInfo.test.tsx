import App from "../App";

import { render, screen } from "@testing-library/react";

test("can alter application state", () => {
  render(<App />);
  const application = screen.getByTestId("ScatterBrained");

  expect(application).toMatchSnapshot();
});
