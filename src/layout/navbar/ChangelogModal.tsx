import { useRef, useEffect } from "react";

import { CloseIcon } from "../../assets/icons/CloseIcon";
import { useCloseModal } from "../../hooks/useCloseModal";
import { SpinnerIcon } from "../../assets/icons/SpinnerIcon";
import { useChangelogModal } from "./hooks/useChangelogModal";
import { ChangelogModalProps } from "./types";

export const ChangelogModal = ({ closeModal }: ChangelogModalProps) => {
  const { changelogContent, isLoading, error, formatMarkdown } =
    useChangelogModal();
  const modalRef = useRef<HTMLDivElement>(null);

  useCloseModal(modalRef, closeModal);

  // Block body scroll when modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="alternativeScrollbar">
      <div className="fixed w-screen h-screen bg-[rgb(0,0,0,0.3)] top-0 left-0 backdrop-blur-md z-40" />
      <div className="fixed w-screen h-full flex justify-center items-center top-0 left-0 z-50">
        <div
          ref={modalRef}
          className="w-screen h-full md:w-auto md:h-auto bg-loginModalBg shadow-xl px-[0vw] md:px-10 pt-0 md:pt-[3rem] md:pb-12 flex flex-col items-center justify-start md:rounded-2xl relative"
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-xl fill-secondaryText stroke-secondaryText hover:stroke-secondaryTextHover hover:fill-secondaryTextHover"
          >
            <CloseIcon />
          </button>
          <div className="md:max-h-[60vh] md:min-h-[60vh] h-full w-full py-12 md:py-0 md:h-[60vh] -mr-4 overflow-auto pr-4 max-w-full md:max-w-[50vw] min-w-[32.7vw]">
            <div className="text-primaryText text-base w-full h-full -mt-4 text-left px-8 md:px-0">
              {isLoading ? (
                <div className="flex justify-center items-center py-10 w-full h-full">
                  <SpinnerIcon className="contentSpinner" />
                </div>
              ) : error ? (
                <div className="text-red-500 text-center py-5">{error}</div>
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdown(changelogContent),
                  }}
                  className="pb-6 md:pb-0"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
