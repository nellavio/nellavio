import { RefObject, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../common/shadcn/dialog";
import { SignUpForm } from "./SignUpForm";

interface SignUpModalProps {
  closeModal: () => void;
  switchToSignIn: () => void;
  returnFocusRef?: RefObject<HTMLButtonElement | null>;
}

export const SignUpModal = ({
  closeModal,
  switchToSignIn,
  returnFocusRef,
}: SignUpModalProps) => {
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
        <DialogTitle className="sr-only">Sign Up</DialogTitle>
        <DialogDescription className="sr-only">Sign Up</DialogDescription>
        <div
          ref={contentRef}
          tabIndex={-1}
          className="flex flex-col items-center w-full focus:outline-none"
        >
          <SignUpForm
            switchToSignIn={switchToSignIn}
            onSignUpSuccess={closeModal}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
