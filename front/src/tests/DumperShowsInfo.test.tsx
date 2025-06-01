import { screen } from "@testing-library/react";
import { testInitialized } from "./shared";

testInitialized("can be initialized", () => {
  const application = screen.getByTestId("ScatterBrained");
  expect(application).toMatchSnapshot();
});
