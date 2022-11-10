import { render, screen } from "@testing-library/react";

import Header from "../components/Header/Header";

describe("<Header />", () => {
  test("It renders the header component", async () => {
    render(<Header />);

    const header = await screen.findByRole("navigation");

    expect(header).toBeDefined();
  });

  test("it displays a logo", () => {
    render(<Header />);
    const LOGO = "Logo";

    const logoEl = screen.getAllByText(LOGO);

    expect(logoEl).toBeDefined();
    expect(logoEl.length).toBe(1);
  });
});
