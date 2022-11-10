import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";

import Home from "../../pages/Home";

// @Todo Move to it's own file
const server = setupServer(
  rest.get("/", (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        symbols: {
          AED: "United Arab Emirates Dirham",
        },
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

    const convertButton = screen.getByRole("button", { name: "Convert" });

    expect(convertButton).toBeDefined();
    expect(convertButton).toHaveAttribute("type", "submit");
  });

  test("it displays a select dropdown with the From Label and a default value of EUR", () => {
    setup();

    const selectDropdown = screen.getByTestId("from") as HTMLSelectElement;
    const selectDropdownLabel = screen.getAllByLabelText("From");

    expect(selectDropdown.value).toEqual("EUR");
    expect(selectDropdownLabel).toBeDefined();
  });
  
  test("it displays a select dropdown with the To Label and a default value of USD", () => {
    setup();

    const selectDropdown = screen.getByTestId("to") as HTMLSelectElement;
    const selectDropdownLabel = screen.getAllByLabelText("To");

    expect(selectDropdown.value).toEqual("USD");
    expect(selectDropdownLabel).toBeDefined();
  });
});

// Button to redirect to Currency details page ----- More Details
