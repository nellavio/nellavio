import { ReactNode } from "react";

interface CenteredPageWrapperProps {
  children: ReactNode;
}

/**
 * Page wrapper component that centers content vertically and horizontally.
 * Creates a card-like container with responsive padding and rounded corners.
 * Commonly used for authentication and standalone pages.
 *
 * @component
 * @param {ReactNode} children - Page content to be centered
 *
 * @example
 * ```tsx
 * <CenteredPageWrapper>
 *   <LoginForm />
 * </CenteredPageWrapper>
 * ```
 */
export const CenteredPageWrapper = ({ children }: CenteredPageWrapperProps) => {
  return (
    <main
      className="flex pb-0 flex-col h-dvh w-full pt-0 md:pt-8 lg:pt-12 xl:pt-24 1xl:pt-26 3xl:pt-28 xl:pb-8 items-center px-0 md:px-0 1xl:px-0 2xl:px-0 bg-secondaryBg"
      role="main"
    >
      <div className="flex h-full xl:h-auto justify-center items-center flex-col w-full md:p-10 md:pt-12 3xl:pt-0 bg-primaryBg xl:rounded-xl shadow-lg xl:border border-mainBorder min-h-[80vh] 3xl:min-h-[80vh] xl:min-h-unset border">
        <div className="-mt-12 xsm:-mt-4 1xl:mt-0 w-10/12 md:w-4/5 mb-4">
          {children}
        </div>
      </div>
    </main>
  );
};
