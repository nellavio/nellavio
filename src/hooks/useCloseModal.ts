import { RefObject, useEffect } from "react";

/**
 * Closes modal when clicking outside. Similar to useClickOutside but with stricter Node type checking.
 *
 * @param {RefObject<HTMLElement>} ref - Modal element ref
 * @param {Function} onClose - Close callback
 */
export const useCloseModal = (
  ref: RefObject<HTMLElement | null>,
  onClose: () => void
) => {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      ) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, onClose]);
};
