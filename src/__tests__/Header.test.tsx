import { render, screen } from "@testing-library/react";

import Header from "../components/Header/Header";

describe("<Header />", () => {
  test("It renders the header component", async () => {
    render(<Header />);

    const header = await screen.findByRole("heading");

    expect(header).toBeDefined();
  });
});
