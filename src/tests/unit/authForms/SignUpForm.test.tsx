import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { SignUpForm } from "../../../components/auth/SignUpForm";
import { renderWithProviders } from "../../utils/renderWithProviders";

describe("SignUpForm", () => {
  it("renders all form fields", () => {
    renderWithProviders(<SignUpForm />);
    expect(screen.getByPlaceholderText("yourEmail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("yourPassword")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("confirmPassword")).toBeInTheDocument();
  });

  it("shows error when passwords do not match", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUpForm />);

    await user.type(screen.getByPlaceholderText("yourEmail"), "a@b.com");
    await user.type(
      screen.getByPlaceholderText("yourPassword"),
      "password1234",
    );
    await user.type(
      screen.getByPlaceholderText("confirmPassword"),
      "differentpass",
    );

    await user.click(screen.getByRole("button", { name: /createAccount/i }));

    const matchErrors = await screen.findAllByText("passwordsMustMatch");
    expect(matchErrors.length).toBeGreaterThan(0);
  });

  it("shows error for too short password", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUpForm />);

    await user.type(screen.getByPlaceholderText("yourEmail"), "a@b.com");
    await user.type(screen.getByPlaceholderText("yourPassword"), "short");
    await user.type(screen.getByPlaceholderText("confirmPassword"), "short");

    await user.click(screen.getByRole("button", { name: /createAccount/i }));

    const lenErrors = await screen.findAllByText("passwordMinimumLength");
    expect(lenErrors.length).toBeGreaterThan(0);
  });

  it("submits successfully with valid data", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SignUpForm />);

    await user.type(screen.getByPlaceholderText("yourEmail"), "a@b.com");
    await user.type(
      screen.getByPlaceholderText("yourPassword"),
      "password1234",
    );
    await user.type(
      screen.getByPlaceholderText("confirmPassword"),
      "password1234",
    );

    await user.click(screen.getByRole("button", { name: /createAccount/i }));

    expect(screen.queryByText("emailFieldIsRequired")).not.toBeInTheDocument();
    expect(screen.queryByText("passwordsMustMatch")).not.toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithProviders(<SignUpForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
