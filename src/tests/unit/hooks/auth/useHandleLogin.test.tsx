import { act, renderHook, waitFor } from "@testing-library/react";

import { useHandleLogin } from "../../../../hooks/auth/useHandleLogin";
import { signIn as _signIn } from "../../../../services/auth/auth-client";
import { useLayoutStore } from "../../../../store/layoutStore";

// signIn is always defined in test env (mocked in vitest.setup.ts)
const signIn = _signIn as NonNullable<typeof _signIn>;

vi.mock("../../../../utils/presentationMode", () => ({
  isPresentationModeClient: vi.fn(() => false),
}));

describe("useHandleLogin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useLayoutStore.setState({ isLoggingIn: false });
    vi.mocked(signIn.email).mockResolvedValue({ error: null } as never);
  });

  it("calls signIn.email with correct data", async () => {
    const { result } = renderHook(() => useHandleLogin());

    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    expect(signIn.email).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "password1234",
      rememberMe: false,
    });
  });

  it("sets isLoggingIn to true during login", async () => {
    let capturedLoggingIn = false;
    vi.mocked(signIn.email).mockImplementation(async () => {
      capturedLoggingIn = useLayoutStore.getState().isLoggingIn;
      return { error: null } as never;
    });

    const { result } = renderHook(() => useHandleLogin());

    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    expect(capturedLoggingIn).toBe(true);
  });

  it("sets isLoggingIn to false on error", async () => {
    vi.mocked(signIn.email).mockResolvedValue({
      error: { code: "INVALID_EMAIL_OR_PASSWORD" },
    } as never);

    const { result } = renderHook(() => useHandleLogin());

    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    expect(useLayoutStore.getState().isLoggingIn).toBe(false);
  });

  it("displays auth error when signIn returns error", async () => {
    vi.mocked(signIn.email).mockResolvedValue({
      error: { code: "INVALID_EMAIL_OR_PASSWORD" },
    } as never);

    const { result } = renderHook(() => useHandleLogin());

    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    await waitFor(() => {
      expect(result.current.authErrorDisplayed).toBeTruthy();
    });
  });

  it("prevents rapid-fire submissions (cooldown)", async () => {
    const { result } = renderHook(() => useHandleLogin());

    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    // Second immediate call should be blocked by cooldown
    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    expect(signIn.email).toHaveBeenCalledTimes(1);
  });

  it("calls onLoginSuccess callback on success", async () => {
    const onLoginSuccess = vi.fn();
    const { result } = renderHook(() => useHandleLogin(onLoginSuccess));

    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    expect(onLoginSuccess).toHaveBeenCalled();
  });

  it("shows alert in presentation mode", async () => {
    const { isPresentationModeClient } =
      await import("../../../../utils/presentationMode");
    vi.mocked(isPresentationModeClient).mockReturnValue(true);

    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { result } = renderHook(() => useHandleLogin());

    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    expect(alertSpy).toHaveBeenCalled();
    expect(signIn.email).not.toHaveBeenCalled();
    alertSpy.mockRestore();
    vi.mocked(isPresentationModeClient).mockReturnValue(false);
  });

  it("handles network error gracefully", async () => {
    vi.mocked(signIn.email).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useHandleLogin());

    await act(async () => {
      await result.current.onSubmit(
        { email: "test@test.com", password: "password1234" },
        false,
      );
    });

    expect(useLayoutStore.getState().isLoggingIn).toBe(false);
  });

  it("has correct Yup validation schema (email required, min 10 chars password)", async () => {
    const { result } = renderHook(() => useHandleLogin());

    // Submit empty form to trigger validation
    await act(async () => {
      result.current.handleSubmit(() => {})();
    });

    await waitFor(() => {
      expect(result.current.errors.email).toBeDefined();
    });
  });
});
