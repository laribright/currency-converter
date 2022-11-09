import { render, screen } from "@testing-library/react";

import App from "../App";

describe("<App />", () => {
  it("renders the heading component", async () => {
    render(<App />);

    const header = await screen.findByRole("navigation");

    expect(header).toBeDefined();
  });
});
