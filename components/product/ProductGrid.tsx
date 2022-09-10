import { FC } from "react";
import dynamic from "next/dynamic";
import { Product } from "@prisma/client";

const ProductCard = dynamic<any>(
  import("./ProductCard").then(({ ProductCard }) => ProductCard)
);

interface Props {
  products: Product[];
  admin?: boolean;
}

export const ProductGrid: FC<Props> = ({ products, admin }) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:gap-12">
      {products.map(({ slug, images, price, title, inStock }) => (
        <ProductCard
          key={slug}
          slug={slug}
          title={title}
          price={price}
          images={images}
          inStock={inStock}
          admin={admin}
        />
      ))}
    </div>
  );
};
