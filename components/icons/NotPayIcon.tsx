import { SVGProps } from "react";

export const NotPayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#CD2C2C"
    {...props}
  >
    <path d="m3 3 18 18" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M7 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 19H2.6a.6.6 0 0 1-.6-.6V9h6.5M2 9V5.6a.6.6 0 0 1 .6-.6h1.9M14 9h8v8m0-8V5.6a.6.6 0 0 0-.6-.6H10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
