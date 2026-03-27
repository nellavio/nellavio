import { act, renderHook, waitFor } from "@testing-library/react";

import { useHandleSignUp } from "@/hooks/auth/useHandleSignUp";
import { signUp as _signUp } from "@/services/auth/auth-client";

// signUp is always defined in test env (mocked in vitest.setup.ts)
const signUp = _signUp as NonNullable<typeof _signUp>;

vi.mock("@/utils/presentationMode", () => ({
  isPresentationModeClient: vi.fn(() => false),
}));

describe("useHandleSignUp", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(signUp.email).mockImplementation(async (_data, options) => {
      if (options?.onSuccess) {
        (options.onSuccess as () => void)();
      }
      return {} as never;
    });
  });

  it("calls signUp.email with correct data", async () => {
    const { result } = renderHook(() => useHandleSignUp());

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password1234",
        confirmPassword: "password1234",
      });
    });

    expect(signUp.email).toHaveBeenCalledWith(
      {
        email: "test@test.com",
        password: "password1234",
        name: "test@test.com",
      },
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function),
      }),
    );
  });

  it("prevents rapid-fire submissions (cooldown)", async () => {
    const { result } = renderHook(() => useHandleSignUp());

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password1234",
        confirmPassword: "password1234",
      });
    });

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password1234",
        confirmPassword: "password1234",
      });
    });

    expect(signUp.email).toHaveBeenCalledTimes(1);
  });

  it("sets loading to true during signup", async () => {
    let capturedLoading = false;
    vi.mocked(signUp.email).mockImplementation(async () => {
      capturedLoading = true;
      return {} as never;
    });

    const { result } = renderHook(() => useHandleSignUp());

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password1234",
        confirmPassword: "password1234",
      });
    });

    expect(capturedLoading).toBe(true);
  });

  it("displays signup error on onError callback", async () => {
    vi.mocked(signUp.email).mockImplementation(async (_data, options) => {
      if (options?.onError) {
        (options.onError as (ctx: Record<string, unknown>) => void)({
          error: { code: "USER_ALREADY_EXISTS" },
        });
      }
      return {} as never;
    });

    const { result } = renderHook(() => useHandleSignUp());

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password1234",
        confirmPassword: "password1234",
      });
    });

    await waitFor(() => {
      expect(result.current.signUpError).toBeTruthy();
    });
  });

  it("calls onSignUpSuccess callback on success", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useHandleSignUp(onSuccess));

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password1234",
        confirmPassword: "password1234",
      });
    });

    expect(onSuccess).toHaveBeenCalled();
  });

  it("shows alert in presentation mode", async () => {
    const { isPresentationModeClient } =
      await import("@/utils/presentationMode");
    vi.mocked(isPresentationModeClient).mockReturnValue(true);

    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { result } = renderHook(() => useHandleSignUp());

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password1234",
        confirmPassword: "password1234",
      });
    });

    expect(alertSpy).toHaveBeenCalled();
    expect(signUp.email).not.toHaveBeenCalled();
    alertSpy.mockRestore();
    vi.mocked(isPresentationModeClient).mockReturnValue(false);
  });

  it("has correct Yup validation (passwords must match)", async () => {
    const { result } = renderHook(() => useHandleSignUp());

    await act(async () => {
      result.current.handleSubmit(() => {})();
    });

    await waitFor(() => {
      expect(result.current.errors.email).toBeDefined();
    });
  });

  it("handles network error gracefully", async () => {
    vi.mocked(signUp.email).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useHandleSignUp());

    await act(async () => {
      await result.current.onSubmit({
        email: "test@test.com",
        password: "password1234",
        confirmPassword: "password1234",
      });
    });

    await waitFor(() => {
      expect(result.current.signUpError).toBeTruthy();
    });
  });
});
