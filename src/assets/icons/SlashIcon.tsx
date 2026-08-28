import * as React from "react";

/**
 * COLLECTION: Lucide
 * LICENSE: ISC License (portions derived from Feather, MIT License)
 * SOURCE: https://lucide.dev/icons/
 */
export const SlashIcon = ({
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
    <line x1="22" x2="2" y1="2" y2="22" />
  </svg>
);
