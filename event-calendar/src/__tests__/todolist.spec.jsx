/* globals describe, expect, it */
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import List from "../components/List";

describe("Clock component tests", () => {
  it("should contains the heading", () => {
    const todos = [
      {
        id: "1",
        text: "todo 1",
        completed: false,
        date: "2023-12-04",
        hour: "2023-12-04T10:00:00.000Z",
      },
      {
        id: "2",
        text: "todo 2",
        completed: false,
        date: "2023-12-04",
        hour: "2023-12-04T10:00:00.000Z",
      },
    ];

    const s = render(
      <MemoryRouter>
        <List todos={todos} />
      </MemoryRouter>
    );

    expect(s.getByText("todo 1")).toBeInTheDocument();
  });
});
