import { FC } from "react";
import { PropsInterface } from "@/interfaces";

interface Props extends PropsInterface {
  tag?: "h1" | "h2" | "h3" | "p";
}

export const Text: FC<Props> = ({ tag = "p", className, style, children }) => {
  switch (tag) {
    case "h1":
      return (
        <h1
          className={`text-2xl leading-9 whitespace-pre-line font-bold md:text-3xl uppercase ${className}`}
          style={style}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`text-[22px] leading-7 whitespace-pre-line font-bold uppercase md:text-2xl ${className}`}
          style={style}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={`text-xl font-bold whitespace-pre-line uppercase ${className}`}
          style={style}
        >
          {children}
        </h3>
      );
    default:
      return (
        <p
          className={`text-sm text-black whitespace-pre-line text-opacity-60 ${className}`}
          style={style}
        >
          {children}
        </p>
      );
  }
};
