import { SVGProps } from "react";

export const DbErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={80}
    height={80}
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#141414"
    {...props}
  >
    <path
      d="m17.121 21.364 2.122-2.121m2.121-2.122-2.121 2.122m0 0L17.12 17.12m2.122 2.122 2.121 2.121M4 6v6s0 3 7 3 7-3 7-3V6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 3c7 0 7 3 7 3s0 3-7 3-7-3-7-3 0-3 7-3zm0 18c-7 0-7-3-7-3v-6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
