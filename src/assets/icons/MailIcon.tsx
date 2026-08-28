import * as React from "react";

export const MailIcon = ({
  width = "21",
  height = "21",
  ...props
}: React.SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    width={width}
    height={height}
    {...props}
  >
    <rect
      x="48"
      y="96"
      width="416"
      height="320"
      rx="40"
      ry="40"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
      d="M112 160l144 112 144-112"
    />
  </svg>
);
