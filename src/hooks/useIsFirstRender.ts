import { useEffect, useState } from "react";

/**
 * Detects if component is rendering for the first time.
 * Useful for skipping effects on initial render.
 *
 * @returns {boolean} True on first render, false afterwards
 */
export const useIsFirstRender = () => {
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);
  return isFirstRender;
};
