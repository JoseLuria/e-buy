import { SVGProps } from "react";

export const SmallPlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={12}
    height={12}
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#141414"
    {...props}
  >
    <path
      d="M6 12h6m6 0h-6m0 0V6m0 6v6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
