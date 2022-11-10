import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import App from "../../App";

describe("<App />", () => {
  const setup = () => render(<App />, { wrapper: BrowserRouter });

  it("renders the heading component", async () => {
    setup();

    const header = await screen.findByTestId("header");

    expect(header).toBeDefined();
  });

  it("renders the home page", async () => {
    setup();

    const homePage = await screen.findByTestId("home-page");

    expect(homePage).toBeDefined();
  });
});
