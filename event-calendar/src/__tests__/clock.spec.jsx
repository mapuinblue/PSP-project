/* globals describe, expect, it */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Clock from "../components/Clock";
import { format } from "date-fns";
import es from "date-fns/locale/es";

describe("Clock component tests", () => {
  it("should contains the heading", () => {
    const locale = es;
    const date = new Date();
    const formattedDate = format(date, "EEEE, d MMMM yyyy", { locale });

    render(
      <MemoryRouter>
        <Clock />
      </MemoryRouter>
    );

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
