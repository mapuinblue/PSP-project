/* globals describe, expect, it */
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Calendars from "../components/Calendars";
import { DateProvider } from "../context/datecontext";

describe("Calen component tests", () => {
  it("should list", () => {
    const todos = [
      {
        id: "1",
        text: "todo 1",
        time: "10:00",
      },
      {
        id: "2",
        text: "todo 2",
        time: "11:00",
      },
    ];

    render(
      <MemoryRouter>
        <DateProvider value={todos}>
          <Calendars />
        </DateProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Eventos")).toBeInTheDocument();
  });
});
