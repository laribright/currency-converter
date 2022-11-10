import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "../App";

describe("<App />", () => {
  it("renders the heading component", async () => {
    render(<App />, {wrapper: BrowserRouter});

    const header = await screen.findByRole("navigation");

    expect(header).toBeDefined();
  });
});
