import React from "react";

import { ContainedButton } from "../common/ContainedButton";
import { OutlinedButton } from "../common/OutlinedButton";
import { Modal } from "../common/Modal";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { ConfirmIcon } from "../../assets/icons/ConfirmIcon";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";

interface ConfirmModalProps {
  closeModal: () => void;
  onConfirm: () => void;
  loading: boolean;
  title: string;
  subtitle: string;
  confirmButtonText: string;
  cancelButtonText: string;
  IconComponent?: React.ElementType;
  type?: "delete" | "default";
}

/**
 * Confirmation modal dialog for critical user actions.
 * Displays icon, title, subtitle, and action buttons.
 * Supports loading state and delete/default variants.
 *
 * @component
 * @param {Function} closeModal - Function to close modal
 * @param {Function} onConfirm - Callback when user confirms
 * @param {boolean} loading - Shows spinner when true
 * @param {string} title - Main heading text
 * @param {string} subtitle - Supporting description
 * @param {string} confirmButtonText - Confirm button label
 * @param {string} cancelButtonText - Cancel button label
 * @param {('delete'|'default')} [type='default'] - Visual variant
 *
 * @example
 * ```tsx
 * <ConfirmModal
 *   closeModal={() => setOpen(false)}
 *   onConfirm={handleDelete}
 *   loading={isDeleting}
 *   title="Delete Item?"
 *   subtitle="This action cannot be undone"
 *   confirmButtonText="Delete"
 *   cancelButtonText="Cancel"
 *   type="delete"
 * />
 * ```
 */
export const ConfirmModal = ({
  closeModal,
  onConfirm,
  loading,
  title,
  subtitle,
  confirmButtonText,
  cancelButtonText,
  type = "default",
}: ConfirmModalProps) => {
  return (
    <div>
      <Modal onClose={closeModal}>
        <div className="flex items-center justify-center w-full flex-col gap-2 -mt-2">
          <div className="text-grayIcon rounded-full border border-mainBorder p-4 pl-4 w-16 h-16 flex justify-center items-center mr-[0rem]">
            {type === "delete" ? <DeleteIcon /> : <ConfirmIcon />}
          </div>
          <h2 className="text-primaryText text-3xl w-full text-center mt-2">
            {title}
          </h2>
        </div>
        <h2 className="text-primaryText text-base w-full text-secondaryText mt-4 max-w-[24rem] text-center">
          {subtitle}
        </h2>
        <div className="flex w-full justify-center mt-12 gap-4">
          <div className="w-[6rem] h-[2.5rem]">
            <OutlinedButton
              text={cancelButtonText}
              handleClick={closeModal}
              ariaLabel={cancelButtonText}
            />
          </div>
          <div className="w-[6.5rem] h-[2.5rem] pb-0">
            <ContainedButton
              handleClick={onConfirm}
              disabled={loading}
              ariaLabel={confirmButtonText}
            >
              {loading ? (
                <div className="pt-[0.3rem]">
                  <SpinnerIcon width={45} height={45} />
                </div>
              ) : (
                confirmButtonText
              )}
            </ContainedButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};
