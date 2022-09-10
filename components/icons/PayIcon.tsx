import { SVGProps } from "react";

export const PayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#2E7D32"
    {...props}
  >
    <path
      d="M7 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      fill="#2E7D32"
      stroke="#2E7D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 9V5.6a.6.6 0 0 1 .6-.6h18.8a.6.6 0 0 1 .6.6V9M2 9v9.4a.6.6 0 0 0 .6.6h18.8a.6.6 0 0 0 .6-.6V9M2 9h20"
      stroke="#2E7D32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
