import React, { memo } from "react";

/**
 * Full-screen loading overlay with animated spinner.
 * Displays three animated circles in a fixed overlay covering entire viewport.
 * Memoized to prevent unnecessary re-renders. Includes ARIA attributes for accessibility.
 *
 * @component
 *
 * @example
 * ```tsx
 * {isLoading && <FullScreenLoader />}
 * ```
 */
export const FullScreenLoader = memo(() => (
  <div
    className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-50 bg-loaderBg"
    role="alert"
    aria-live="assertive"
    aria-busy="true"
  >
    <div className="flex justify-center">
      <span className="circle animate-loader"></span>
      <span className="circle animate-loader animation-delay-200"></span>
      <span className="circle animate-loader animation-delay-400"></span>
    </div>
  </div>
));

FullScreenLoader.displayName = "FullScreenLoader";
