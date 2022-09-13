import { SVGProps } from "react";

export const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    stroke="#141414"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m6 9 6 6 6-6"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
