import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import { renderWithProviders } from "@/tests/utils/renderWithProviders";

describe("ForgotPasswordForm", () => {
  it("renders the email field", () => {
    renderWithProviders(<ForgotPasswordForm />);
    expect(screen.getByPlaceholderText("yourEmail")).toBeInTheDocument();
  });

  it("shows validation error for invalid email", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ForgotPasswordForm />);

    await user.type(screen.getByPlaceholderText("yourEmail"), "notanemail");
    await user.click(screen.getByRole("button", { name: /sendResetLink/i }));

    const errors = await screen.findAllByText("pleaseEnterAValidEmail");
    expect(errors.length).toBeGreaterThan(0);
  });

  it("submits with valid email and shows success state", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const user = userEvent.setup({
      advanceTimers: vi.advanceTimersByTime,
    });
    renderWithProviders(<ForgotPasswordForm />);

    await user.type(screen.getByPlaceholderText("yourEmail"), "test@test.com");
    await user.click(screen.getByRole("button", { name: /sendResetLink/i }));

    expect(await screen.findByText("checkYourEmail")).toBeInTheDocument();

    vi.useRealTimers();
  });

  it("has no accessibility violations", async () => {
    const { container } = renderWithProviders(<ForgotPasswordForm />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
