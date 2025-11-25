/**
 * Presentation Mode Detection Utilities
 * Automatically detects if backend/auth is available and enables presentation mode
 */

/**
 * Check if backend GraphQL URL is configured and valid
 */
export const hasValidBackendUrl = (): boolean => {
  const url = process.env.GRAPHQL_URL;
  return !!url && (url.startsWith("http://") || url.startsWith("https://"));
};

/**
 * Check if Better Auth is configured and valid
 * Note: Only checks NEXT_PUBLIC_AUTH_URL (available in middleware/edge runtime)
 */
export const hasValidAuthUrl = (): boolean => {
  const url = process.env.NEXT_PUBLIC_AUTH_URL;
  return !!url && (url.startsWith("http://") || url.startsWith("https://"));
};

/**
 * Check if app is running in presentation mode (no backend)
 * Server-side detection
 */
export const isPresentationMode = (): boolean => {
  return !hasValidBackendUrl();
};

/**
 * Check if auth is available
 * Safe for middleware/edge runtime (doesn't check BETTER_AUTH_SECRET)
 */
export const isAuthAvailable = (): boolean => {
  return hasValidAuthUrl();
};

/**
 * Client-side presentation mode detection
 * Use this in React components (client-side only)
 */
export const isPresentationModeClient = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
  return !authUrl || !(authUrl.startsWith("http://") || authUrl.startsWith("https://"));
};
