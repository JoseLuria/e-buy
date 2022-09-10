import { FC, ReactNode } from "react";
import { SideBarItem, Link } from "@/components";
import { SideBarInterface } from "@/interfaces";

interface Props {
  list: SideBarInterface[];
  separator?: boolean;
  children?: ReactNode;
  action?: () => void;
}

export const SideBartList: FC<Props> = ({
  list,
  children,
  separator,
  action,
}) => {
  return (
    <>
      <ul className="flex flex-col gap-4">
        {list.map(({ href, title, icon }, index) => (
          <Link href={href} action={action} key={index}>
            <SideBarItem title={title} icon={icon} />
          </Link>
        ))}
        {children}
      </ul>
      {separator && <hr className="mt-6 mb-6 border-low-gray" />}
    </>
  );
};
