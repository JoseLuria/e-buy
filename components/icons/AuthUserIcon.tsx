import { SVGProps } from "react";

export const AuthUserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#141414"
    {...props}
  >
    <path
      d="m22 12.5-.833 2.5m0 0L20 18.5h-4.5l-1-3.5h6.667ZM16.5 20.51l.01-.011M19.5 20.51l.01-.011M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 18a7 7 0 0 1 11.33-5.5"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
