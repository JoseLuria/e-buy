import { FC } from "react";
import NextHead from "next/head";
import { HeadInterface } from "@/interfaces";

export const Head: FC<HeadInterface> = ({
  title,
  description = "E-Buy es tu tienda online para ropa de moda. Ofrecemos calidad al mejor precio y de forma sustentable.",
  otg = "/others/otg.jpg",
}) => {
  return (
    <NextHead>
      <title>{`${title} - E-Buy`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} - E-Buy`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={otg} />
    </NextHead>
  );
};
