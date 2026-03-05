/**
 * Breakpoint values in pixels - must stay in sync with globals.css @theme.
 *
 * Tailwind v4 defaults (built-in):
 *   sm=640  md=768  lg=1024  xl=1280  2xl=1536
 *
 * Custom (defined in globals.css @theme):
 *   xsm=480  1xl=1400  3xl=1750  5xl=2000
 */
export const BREAKPOINTS = {
  xsm: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "1xl": 1400,
  "2xl": 1536,
  "3xl": 1750,
  "5xl": 2000,
} as const;
