import { SVGProps } from "react";

export const CartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#000"
    {...props}
  >
    <path
      d="M19.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"
      fill="#000"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 4h17l-2 11H7L5 4zm0 0c-.167-.667-1-2-3-2m18 13H5.23c-1.784 0-2.73.781-2.73 2 0 1.219.946 2 2.73 2H19.5"
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
