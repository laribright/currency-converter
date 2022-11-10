import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Header from "../../components/Header/Header";

describe("<Header />", () => {
  const setup = () => render(<Header />, { wrapper: BrowserRouter });

  test("It renders the header component", async () => {
    setup();

    const header = screen.getByTestId("header");

    expect(header).toBeDefined();
  });

  test("it displays a logo", () => {
    setup();
    const LOGO = "Logo";

    const logoEl = screen.getAllByText(LOGO);

    expect(logoEl).toBeDefined();
    expect(logoEl.length).toBe(1);
  });

  test("it displays two NavLinks. EUR-USD Details and EUR-GBP Details", () => {
    setup();

    const navLinks = screen.getAllByRole("link");
    const eurUsdLinkEl = screen.getByRole("link", { name: "EUR-USD Details" });
    const eurGbpLinkEl = screen.getByRole("link", { name: "EUR-GBP Details" });

    expect(eurUsdLinkEl).toBeInTheDocument();
    expect(eurUsdLinkEl).toHaveAttribute("href", "/eur-usd");

    expect(eurGbpLinkEl).toBeInTheDocument();
    expect(eurGbpLinkEl).toHaveAttribute("href", "/eur-gbp");

    expect(navLinks.length).toBe(2);
  });
});
