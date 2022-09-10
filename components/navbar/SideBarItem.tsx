import { FC } from "react";
import { SideBarInterface } from "@/interfaces";

type sideBarItemProps = Omit<SideBarInterface, "href">;

export const SideBarItem: FC<sideBarItemProps> = ({ title, icon: Icon }) => {
  return (
    <li className="flex gap-2">
      <Icon width={24} height={24} />
      <p>{title}</p>
    </li>
  );
};
