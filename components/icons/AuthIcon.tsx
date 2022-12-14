import { SVGProps } from "react";

export const AuthIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="#141414"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 12h1.4a.6.6 0 0 1 .6.6v6.8a.6.6 0 0 1-.6.6H6.6a.6.6 0 0 1-.6-.6v-6.8a.6.6 0 0 1 .6-.6H8m8 0V8c0-1.333-.8-4-4-4S8 6.667 8 8v4m8 0H8"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
