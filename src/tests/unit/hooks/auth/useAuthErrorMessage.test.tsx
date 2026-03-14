import { renderHook } from "@testing-library/react";

import { useAuthErrorMessage } from "../../../../hooks/auth/useAuthErrorMessage";

describe("useAuthErrorMessage", () => {
  it("maps INVALID_EMAIL_OR_PASSWORD to correct i18n key", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signInDefaultError"),
    );
    const message = result.current.getErrorMessage("INVALID_EMAIL_OR_PASSWORD");
    expect(message).toBe("authErrors.INVALID_EMAIL_OR_PASSWORD");
  });

  it("maps USER_NOT_FOUND to same key as INVALID_EMAIL_OR_PASSWORD (prevents user enumeration)", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signInDefaultError"),
    );
    const userNotFound = result.current.getErrorMessage("USER_NOT_FOUND");
    const invalidCreds = result.current.getErrorMessage(
      "INVALID_EMAIL_OR_PASSWORD",
    );
    expect(userNotFound).toBe(invalidCreds);
  });

  it("maps CREDENTIAL_ACCOUNT_NOT_FOUND to same key as INVALID_EMAIL_OR_PASSWORD", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signInDefaultError"),
    );
    const credNotFound = result.current.getErrorMessage(
      "CREDENTIAL_ACCOUNT_NOT_FOUND",
    );
    const invalidCreds = result.current.getErrorMessage(
      "INVALID_EMAIL_OR_PASSWORD",
    );
    expect(credNotFound).toBe(invalidCreds);
  });

  it("maps USER_ALREADY_EXISTS to correct key", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signUpDefaultError"),
    );
    const message = result.current.getErrorMessage("USER_ALREADY_EXISTS");
    expect(message).toBe("authErrors.USER_ALREADY_EXISTS");
  });

  it("maps PASSWORD_TOO_SHORT to correct key", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signUpDefaultError"),
    );
    const message = result.current.getErrorMessage("PASSWORD_TOO_SHORT");
    expect(message).toBe("authErrors.PASSWORD_TOO_SHORT");
  });

  it("maps SESSION_EXPIRED and SESSION_NOT_FRESH to same key", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signInDefaultError"),
    );
    const expired = result.current.getErrorMessage("SESSION_EXPIRED");
    const notFresh = result.current.getErrorMessage("SESSION_NOT_FRESH");
    expect(expired).toBe(notFresh);
  });

  it("returns fallback key for unknown error codes", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signInDefaultError"),
    );
    const message = result.current.getErrorMessage("COMPLETELY_UNKNOWN_CODE");
    expect(message).toBe("authErrors.signInDefaultError");
  });

  it("uses signUpDefaultError as fallback when configured for signup", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signUpDefaultError"),
    );
    const message = result.current.getErrorMessage("UNKNOWN_CODE");
    expect(message).toBe("authErrors.signUpDefaultError");
  });

  it("maps security-related codes to SECURITY_ERROR", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signInDefaultError"),
    );
    const codes = [
      "CROSS_SITE_NAVIGATION_LOGIN_BLOCKED",
      "INVALID_ORIGIN",
      "MISSING_OR_NULL_ORIGIN",
    ];
    const messages = codes.map((code) => result.current.getErrorMessage(code));
    expect(messages.every((m) => m === "authErrors.SECURITY_ERROR")).toBe(true);
  });

  it("maps social/OAuth codes to PROVIDER_ERROR", () => {
    const { result } = renderHook(() =>
      useAuthErrorMessage("signInDefaultError"),
    );
    const codes = [
      "PROVIDER_NOT_FOUND",
      "ID_TOKEN_NOT_SUPPORTED",
      "FAILED_TO_GET_USER_INFO",
    ];
    const messages = codes.map((code) => result.current.getErrorMessage(code));
    expect(messages.every((m) => m === "authErrors.PROVIDER_ERROR")).toBe(true);
  });
});
