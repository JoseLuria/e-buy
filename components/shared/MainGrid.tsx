import { FC, ReactNode } from "react";
import { Text } from "@/components";

interface Props {
  title?: string;
  children?: ReactNode;
}

export const MainGrid: FC<Props> = ({ title, children }) => {
  return (
    <main className="pt-6 md:pt-12">
      {title && (
        <Text className="mb-6 w-full line-clamp-2 md:mb-12" tag="h1">
          {title}
        </Text>
      )}
      <div className="flex flex-col gap-6 md:gap-12 lg:grid lg:grid-cols-2 lg:gap-16">
        {children}
      </div>
    </main>
  );
};
