import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { SignUpData } from "../../components/auth/SignUpForm";
import { useRouter } from "../../i18n/navigation";
import { signUp } from "../../services/auth/auth-client";
import { isPresentationModeClient } from "../../utils/presentationMode";
import { useAuthErrorMessage } from "./useAuthErrorMessage";

const SUBMIT_COOLDOWN_MS = 2000;

/**
 * Sign-up form management with Better Auth integration.
 * Handles validation (Yup), error display, and i18n error mapping.
 * Includes protection against rapid-fire submissions (e.g., holding Enter key)
 * with a 2-second cooldown between submit attempts.
 *
 * @returns {Object} Form handlers, validation, and state
 * @returns {Function} handleSignUp - Async sign-up handler
 * @returns {Function} onSubmit - Form submit handler (debounced)
 * @returns {Object} control - React Hook Form control
 * @returns {Object} errors - Form validation errors
 * @returns {boolean} loading - Loading state
 * @returns {string} signUpError - Authentication error message
 */
export const useHandleSignUp = (onSignUpSuccess?: () => void) => {
  const [loading, setLoading] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const router = useRouter();
  const { getErrorMessage, t } = useAuthErrorMessage("signUpDefaultError");

  /** Refs for preventing rapid-fire form submissions (e.g., holding Enter key) */
  const isSubmittingRef = useRef(false);
  const lastSubmitTimeRef = useRef(0);

  const handleSignUp = useCallback(
    async (data: SignUpData) => {
      /** Check if running in presentation mode (no backend) */
      if (isPresentationModeClient()) {
        alert(
          "Authentication is disabled in the presentation mode. Check README.md to find information on how to connect the backend to make it work.\n\nIf you already configured .env, please remember that npm run build must be run before npm start for changes to take effect. This is not needed when using npm run dev.",
        );
        return;
      }

      if (!signUp) return;

      setLoading(true);
      setSignUpError("");

      try {
        const { email, password } = data;
        await signUp.email(
          {
            email,
            password,
            name: email,
          },
          {
            onSuccess: () => {
              if (onSignUpSuccess) {
                onSignUpSuccess();
              }
              router.push("/");
            },
            onError: (ctx) => {
              setLoading(false);
              const translatedError = getErrorMessage(
                ctx.error.code || "UNKNOWN_ERROR",
              );
              setSignUpError(translatedError);
            },
          },
        );
      } catch (error: unknown) {
        setLoading(false);
        console.error("Sign up error:", error);
        setSignUpError(t("authErrors.networkError"));
      }
    },
    [getErrorMessage, onSignUpSuccess, router, t],
  );

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .required(t("emailFieldIsRequired"))
          .email(t("pleaseEnterAValidEmail")),
        password: Yup.string()
          .required(t("passwordFieldIsRequired"))
          .min(10, t("passwordMinimumLength")),
        confirmPassword: Yup.string()
          .required(t("confirmPasswordRequired"))
          .oneOf([Yup.ref("password")], t("passwordsMustMatch")),
      }),
    [t],
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpData>({
    resolver: yupResolver(validationSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = useCallback(
    async (data: SignUpData) => {
      const now = Date.now();

      /** Prevent rapid-fire submissions (e.g., user holding Enter key) */
      if (isSubmittingRef.current) {
        return;
      }

      /** Enforce cooldown between submissions to prevent spam */
      if (now - lastSubmitTimeRef.current < SUBMIT_COOLDOWN_MS) {
        return;
      }

      isSubmittingRef.current = true;
      lastSubmitTimeRef.current = now;

      try {
        await handleSignUp(data);
      } finally {
        isSubmittingRef.current = false;
      }
    },
    [handleSignUp],
  );

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      /** This "error-hide" logic fixes bug that forces double clicking on login button on mobile when errors are visible */
      const target = event.target as HTMLElement;
      if (target.closest(".ignore-error-hide")) {
        return;
      }
      setShowEmailError(false);
      setShowPasswordError(false);
      setShowConfirmPasswordError(false);
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  /** Effects necessary to not show both error messages at the same time if not needed */
  useEffect(() => {
    if (errors.email) {
      setShowEmailError(true);
    }
  }, [errors.email]);

  useEffect(() => {
    if (errors.password) {
      setShowPasswordError(true);
    }
  }, [errors.password]);

  useEffect(() => {
    if (errors.confirmPassword) {
      setShowConfirmPasswordError(true);
    }
  }, [errors.confirmPassword]);

  return {
    handleSignUp,
    loading,
    setLoading,
    showEmailError,
    setShowEmailError,
    showPasswordError,
    setShowPasswordError,
    showConfirmPasswordError,
    setShowConfirmPasswordError,
    signUpError,
    handleSubmit,
    onSubmit,
    control,
    errors,
  };
};
