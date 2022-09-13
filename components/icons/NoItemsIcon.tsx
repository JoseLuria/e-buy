import { SVGProps } from "react";

export const NoItemsIcons = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#141414"
    {...props}
  >
    <path
      d="M6 5v2m4-2v6m8-6v1M6 10v6m0 2.5v.5m4-.5v.5m0-5v2m4-3v2m0-10v5m4-1v4m-1.879 8.364 2.122-2.121m0 0 2.121-2.122m-2.121 2.122L16.12 17.12m2.122 2.122 2.121 2.121"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
