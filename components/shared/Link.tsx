import { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { PropsInterface } from "@/interfaces";

interface Props extends PropsInterface {
  href: string;
  newTab?: boolean;
  action?: () => void;
}

export const Link: FC<Props> = ({
  children,
  style,
  className,
  href,
  newTab,
  action,
}) => {
  const { asPath, reload } = useRouter();

  const reloadPage = () => {
    !newTab && asPath === href && reload();
    action && action();
  };

  return (
    <NextLink href={href} passHref>
      <a
        className={className}
        style={style}
        target={newTab ? "_blank" : "_self"}
        onClick={reloadPage}
      >
        {children}
      </a>
    </NextLink>
  );
};
