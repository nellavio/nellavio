import { useEffect, RefObject } from "react";

/**
 * Triggers callback when clicking outside referenced element.
 *
 * @template T - HTML element type
 * @param {RefObject<T>} ref - Element ref to monitor
 * @param {Function} onClickOutside - Callback fired on outside click
 */
export const useClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  onClickOutside: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
