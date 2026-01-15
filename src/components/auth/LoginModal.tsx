import { LoginForm } from "./LoginForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../common/shadcn/dialog";

interface LoginModalProps {
  closeModal: () => void;
  switchToSignUp: () => void;
}

export const LoginModal = ({ closeModal, switchToSignUp }: LoginModalProps) => {
  return (
    <Dialog open={true} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="flex flex-col items-center">
        <DialogTitle className="sr-only">Login</DialogTitle>
        <LoginForm switchToSignUp={switchToSignUp} />
      </DialogContent>
    </Dialog>
  );
};
