import * as React from "react";

/**
 * COLLECTION: Lucide
 * LICENSE: ISC License (portions derived from Feather, MIT License)
 * SOURCE: https://lucide.dev/icons/
 */
export const Loader2Icon = ({
  width = 24,
  height = 24,
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={width}
    height={height}
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
