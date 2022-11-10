import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Header from "../components/Header/Header";

describe("<Header />", () => {
  test("It renders the header component", async () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    const header = await screen.findByRole("navigation");

    expect(header).toBeDefined();
  });

  test("it displays a logo", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const LOGO = "Logo";

    const logoEl = screen.getAllByText(LOGO);

    expect(logoEl).toBeDefined();
    expect(logoEl.length).toBe(1);
  });

  test("it displays two NavLinks. EUR-USD Details and EUR-GBP Details", () => {
    render(<Header />, { wrapper: BrowserRouter });
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
