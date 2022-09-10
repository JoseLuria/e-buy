import { SVGProps } from "react";

export const SmallMinusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#000"
    {...props}
  >
    <path
      d="M6 12h12"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
