import { useState } from "react";

import { signOut } from "@/services/auth/auth-client";
import { useLayoutStore } from "@/store/layoutStore";
import { isPresentationModeClient } from "@/utils/presentationMode";

/**
 * Handles user logout via Better Auth. Shows alert in presentation mode.
 * Reloads page on success to clear session state.
 *
 * @returns {Object} Logout handler and state
 * @returns {Function} handleLogout - Async logout function
 * @returns {boolean} loading - Loading state
 * @returns {string} error - Error message if logout fails
 */
export const useHandleLogout = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setIsLoggingOut = useLayoutStore((state) => state.setIsLoggingOut);

  const handleLogout = async () => {
    /** Check if running in presentation mode (no backend) */
    if (isPresentationModeClient()) {
      alert(
        "Authentication is disabled in the presentation mode. Check README.md to find information on how to connect the backend to make it work.\n\nIf you already configured .env, please remember that npm run build must be run before npm start for changes to take effect. This is not needed when using npm run dev.",
      );
      return;
    }

    if (!signOut) return;

    setLoading(true);
    setIsLoggingOut(true);

    try {
      await signOut();

      window.location.reload();
    } catch (err: unknown) {
      console.error("Logout error:", err);
      if (err instanceof Error) {
        setError(`Logout error: ${err.message}`);
      } else {
        setError("Logout failed due to an unknown error");
      }
      setIsLoggingOut(false);
      setLoading(false);
    }
  };

  return { handleLogout, loading, error };
};
