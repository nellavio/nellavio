import "@testing-library/jest-dom/vitest";

import { cleanup } from "@testing-library/react";
import React from "react";
import { afterEach, expect, vi } from "vitest";
import * as matchers from "vitest-axe/matchers";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

// Mock next-intl
vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "en",
  useMessages: () => ({}),
  useNow: () => new Date(),
  useTimeZone: () => "UTC",
  useFormatter: () => ({
    number: (value: number) => String(value),
    dateTime: (value: Date) => value.toISOString(),
  }),
}));

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "dark",
    setTheme: vi.fn(),
    resolvedTheme: "dark",
    themes: ["light", "dark"],
    systemTheme: "dark",
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock ResizeObserver
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

// Mock IntersectionObserver
class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);

// Mock window.matchMedia
vi.stubGlobal(
  "matchMedia",
  vi.fn((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
);

// Mock next/image
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    ...props
  }: {
    src: string;
    alt: string;
    [key: string]: unknown;
  }) => {
    const imgProps: Record<string, unknown> = { src, alt };
    for (const [key, value] of Object.entries(props)) {
      if (typeof value === "string" || typeof value === "number") {
        imgProps[key] = value;
      }
    }
    return React.createElement("img", imgProps);
  },
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => React.createElement("a", { href, ...props }, children),
}));

// Mock i18n navigation (used by auth forms)
vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => React.createElement("a", { href, ...props }, children),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
}));

// Mock auth services
vi.mock("@/services/auth/auth-client", () => ({
  signIn: { email: vi.fn() },
  signUp: { email: vi.fn() },
  signOut: vi.fn(),
  useSession: () => ({ data: null, isPending: false, error: null }),
}));
