import { SVGProps } from "react";

export const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M12 6v6h6" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
