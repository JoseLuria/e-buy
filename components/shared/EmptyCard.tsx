import { FC, ReactNode } from "react";
import { Text, Link } from "@/components";

interface Props {
  title: string;
  text: string;
  children?: ReactNode;
  noLink?: boolean;
}

export const EmptyCard: FC<Props> = ({ title, text, children, noLink }) => {
  return (
    <main className="mt-[150px] mx-auto flex flex-col gap-5 items-center text-center w-full max-w-[320px]">
      {children}
      <Text tag="h2">{title}</Text>
      <Text>{text}</Text>
      {!noLink && (
        <Link className="uppercase underline text-sm font-medium" href="/">
          Regresar al inicio
        </Link>
      )}
    </main>
  );
};
