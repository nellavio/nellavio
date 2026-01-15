import { SignUpForm } from "./SignUpForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../common/shadcn/dialog";

interface SignUpModalProps {
  closeModal: () => void;
  switchToSignIn: () => void;
}

export const SignUpModal = ({
  closeModal,
  switchToSignIn,
}: SignUpModalProps) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="flex flex-col items-center">
        <DialogTitle className="sr-only">Sign Up</DialogTitle>
        <SignUpForm switchToSignIn={switchToSignIn} />
      </DialogContent>
    </Dialog>
  );
};
