import { SVGProps } from "react";

export const WomenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#141414"
    {...props}
  >
    <path
      d="M12 15v4m0 2v-2m0 0h-2m2 0h2m-2-4a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
