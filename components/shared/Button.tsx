import { FC } from "react";
import { Link } from "@/components";
import { PropsInterface } from "@/interfaces";

interface Props extends PropsInterface {
  full?: boolean;
  action?: () => void;
  link?: boolean;
  href?: string;
  newTab?: boolean;
  disabled?: boolean;
}

export const Button: FC<Props> = ({
  children,
  className,
  style,
  full,
  action,
  link,
  href = "/",
  newTab,
  disabled,
}) => {
  const btnStyles = `h-12 px-6 flex text-sm font-bold items-center text-center bg-black text-white uppercase duration-200 hover:bg-opacity-70 focus-visible:bg-opacity-70 ${
    full ? "w-full justify-center" : "w-fit"
  } disabled:bg-opacity-70 disabled:cursor-not-allowed ${className}`;

  if (link) {
    return (
      <Link
        style={style}
        className={btnStyles}
        action={action}
        href={href}
        newTab={newTab}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      disabled={disabled}
      onClick={action}
      style={style}
      className={btnStyles}
    >
      {children}
    </button>
  );
};
