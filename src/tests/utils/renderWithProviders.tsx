import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";

import { TooltipProvider } from "../../components/common/shadcn/tooltip";

/**
 * Wraps component with minimal providers needed for testing.
 * ThemeProvider and next-intl are mocked globally in vitest.setup.ts,
 * so they don't need real providers here.
 *
 * TooltipProvider (Radix) is included because many components use tooltips.
 */
const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return <TooltipProvider delayDuration={0}>{children}</TooltipProvider>;
};

export const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => {
  return render(ui, { wrapper: AllProviders, ...options });
};
