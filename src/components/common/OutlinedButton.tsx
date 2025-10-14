import { ReactElement, Ref, forwardRef } from "react";

interface OutlinedButtonProps {
  text?: string;
  icon?: ReactElement;
  handleClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  ref?: Ref<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  ariaPressed?: boolean;
}

export const OutlinedButton = forwardRef<
  HTMLButtonElement,
  OutlinedButtonProps
>(
  (
    {
      text,
      icon,
      handleClick,
      className,
      children,
      type = "button",
      ariaLabel,
      ariaPressed,
    },
    ref
  ) => {
    const buttonClassName = `text-xs xsm:text-sm 3xl:text-base flex rounded-md justify-center items-center gap-2 w-full h-full p-2 px-4 !outline-0 border border-outlinedButtonBorder bg-outlinedButtonBg hover:bg-outlinedButtonBgHover text-primaryText stroke-grayIcon fill-grayIcon  ${className}`;

    return (
      <button
        onClick={handleClick}
        className={buttonClassName}
        ref={ref}
        type={type}
        aria-label={ariaLabel || text}
        aria-pressed={ariaPressed}
      >
        {children || (
          <>
            {icon} {text}
          </>
        )}
      </button>
    );
  }
);
