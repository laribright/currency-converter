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

  test("it displays a swap button of type button", () => {
    setup();

    const swapButton = screen.getByRole("button", { name: "Swap" });

    expect(swapButton).toBeDefined();
    expect(swapButton).toHaveAttribute("type", "button");
  });

  test("it displays a convert button of type submit", () => {
    setup();

    const convertButton = screen.getByRole("submit", { name: "Convert" });

    expect(convertButton).toBeDefined();
    expect(convertButton).toHaveAttribute("type", "button");
  });
});

// Label should be FROM
// Dropdown that displays a list of currencies from

// Label should be To
// Dropdown that displays a list of currencies To

// Button to convert

// Button to redirect to Currency details page ----- More Details
