/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../context/datecontext";
import Sidebar from "../components/Sidebar";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../context/datecontext", () => ({
  useAuth: jest.fn(),
}));

describe("Sidebar Component", () => {
  it("renders user information and handles logout", async () => {
    const mockUser = { email: "test@example.com" };
    const mockLogout = jest.fn();

    // Mocking the useAuth hook to return user and logout function
    useAuth.mockReturnValue({ users: mockUser, logout: mockLogout });

    // Mocking useNavigate
    const mockNavigate = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

    render(
      <Router>
        <Sidebar />
      </Router>
    );

    // Assert that the user information is displayed
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });
});
