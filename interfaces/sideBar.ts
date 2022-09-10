import { SVGProps } from "react";

export interface SideBarInterface {
  title: string;
  href: string;
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
}
