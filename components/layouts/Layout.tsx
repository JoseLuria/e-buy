import { ReactNode, FC } from "react";
import { HeadInterface } from "@/interfaces";
import { Head, NavBar } from "@/components";

interface Props extends HeadInterface {
  children?: ReactNode;
}

export const Layout: FC<Props> = ({ title, description, otg, children }) => {
  return (
    <>
      <Head title={title} description={description} otg={otg} />
      <div className="mt-[90px] w-full mb-12 px-6 md:px-12">
        <NavBar />
        <div className="w-full max-w-container mx-auto">{children}</div>
      </div>
    </>
  );
};
