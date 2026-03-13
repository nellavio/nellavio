import { RefObject, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../common/shadcn/dialog";
import { LoginForm } from "./LoginForm";

interface LoginModalProps {
  closeModal: () => void;
  switchToSignUp: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export const LoginModal = ({
  closeModal,
  switchToSignUp,
  returnFocusRef,
}: LoginModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent
        className="flex flex-col items-center"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
          contentRef.current?.focus();
        }}
        onCloseAutoFocus={(e) => {
          if (returnFocusRef?.current) {
            e.preventDefault();
            returnFocusRef.current.focus();
          }
        }}
      >
        <DialogTitle className="sr-only">Login</DialogTitle>
        <DialogDescription className="sr-only">Login</DialogDescription>
        <div
          ref={contentRef}
          tabIndex={-1}
          className="flex flex-col items-center w-full focus:outline-none"
        >
          <LoginForm
            switchToSignUp={switchToSignUp}
            onLoginSuccess={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
