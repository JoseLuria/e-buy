import * as React from "react";
import { SVGProps } from "react";

export const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
