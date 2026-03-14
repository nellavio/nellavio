import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { LoginForm } from "../../../components/auth/LoginForm";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("LoginForm", () => {
  it("renders email and password fields", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByPlaceholderText("yourEmail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("yourPassword")).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByRole("button", { name: /signIn/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /signIn/i });
    await user.click(submitButton);

    const errors = await screen.findAllByText("emailFieldIsRequired");
    expect(errors.length).toBeGreaterThan(0);
  });

  it("shows error for invalid email format", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    const emailInput = screen.getByPlaceholderText("yourEmail");
    await user.type(emailInput, "notanemail");

    const submitButton = screen.getByRole("button", { name: /signIn/i });
    await user.click(submitButton);

    const errors = await screen.findAllByText("pleaseEnterAValidEmail");
    expect(errors.length).toBeGreaterThan(0);
  });

  it("submits with valid data without showing validation errors", async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginForm />);

    await user.type(screen.getByPlaceholderText("yourEmail"), "test@test.com");
    await user.type(
      screen.getByPlaceholderText("yourPassword"),
      "password1234",
    );

    const submitButton = screen.getByRole("button", { name: /signIn/i });
    await user.click(submitButton);

    expect(screen.queryByText("emailFieldIsRequired")).not.toBeInTheDocument();
    expect(
      screen.queryByText("passwordFieldIsRequired"),
    ).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithProviders(<LoginForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
