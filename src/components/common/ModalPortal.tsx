"use client";

import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

/**
 * Portal component for rendering modals outside the React component tree.
 * Renders children into document.body using React portals.
 * Waits for component mount before rendering to avoid SSR hydration issues.
 *
 * @component
 * @param {ModalPortalProps} props - Component props
 * @param {ReactNode} props.children - Elements to portal to document body
 *
 * @example
 * ```tsx
 * <ModalPortal>
 *   <div className="modal-overlay">
 *     <ModalContent />
 *   </div>
 * </ModalPortal>
 * ```
 */
export const ModalPortal = ({ children }: ModalPortalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};
