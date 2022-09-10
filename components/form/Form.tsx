import { FC, ReactNode, FormEvent } from "react";
import { Text } from "@/components";

interface Props {
  title?: string;
  children?: ReactNode;
  submit?: (e: FormEvent<HTMLFormElement>) => void;
  className?: string;
  big?: boolean;
  noMargin?: boolean;
}

export const Form: FC<Props> = ({
  title,
  children,
  submit,
  className,
  big,
  noMargin,
}) => {
  return (
    <div
      className={`${!noMargin && "pt-12 md:pt-16"} w-full ${
        big ? "max-w-[700px]" : "max-w-[500px]"
      } mx-auto  ${className}`}
    >
      {title && (
        <Text className="mb-6" tag="h1">
          {title}
        </Text>
      )}
      <form onSubmit={submit} className="flex flex-col gap-4">
        {children}
      </form>
    </div>
  );
};
