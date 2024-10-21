/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../routes/Login";
import { DateProvider } from "../context/datecontext";

describe("Login component", () => {
  test("renders login form", () => {
    const login = {
      login: () => {},
    };
    render(
      <BrowserRouter>
        <DateProvider value={login}>
          <Login />
        </DateProvider>
      </BrowserRouter>
    );

    // Check if the login form is rendered
    expect(screen.getByText("Iniciar sesión")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Email del usuario")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Entrar" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Registrar" })
    ).toBeInTheDocument();
  });

  test("handles login form submission", () => {
    const login = {
      login: () => {},
    };
    render(
      <BrowserRouter>
        <DateProvider value={login}>
          <Login />
        </DateProvider>
      </BrowserRouter>
    );

    // Fill in the email and password fields
    fireEvent.change(screen.getByPlaceholderText("Email del usuario"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "password123" },
    });

    // Submit the login form
    fireEvent.click(screen.getByRole("button", { name: "Entrar" }));

    // Check if the login function is called with the correct email and password
    // You can use a mock function for the login function to check if it is called
    // with the correct arguments
    // For example:
    // expect(loginMock).toHaveBeenCalledWith("test@example.com", "password123");
  });
});
