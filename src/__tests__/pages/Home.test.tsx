import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Home from "../../pages/Home";

describe("<Home />", () => {
  const setup = () => render(<Home />, { wrapper: BrowserRouter });

  test("it renders the Home component", async () => {
    setup();
    const HomePage = await screen.findByTestId("home-page");

    expect(HomePage).toBeDefined();
  });

  test("it displays an input field with type number", () => {
    setup();

    const input = screen.getAllByLabelText("Amount", { selector: "input" });

    expect(input).toBeDefined();
    expect(input.length).toBe(1);
    expect(input[0]).toHaveAttribute("type", "number");
  });
});

// Label should be FROM
// Dropdown that displays a list of currencies from

// Label should be To
// Dropdown that displays a list of currencies To

// Button to swap from and to values

// Button to convert

// Button to redirect to Currency details page ----- More Details
