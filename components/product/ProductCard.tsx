import { FC } from "react";
import Image from "next/image";
import { Link } from "@/components";
import { Product } from "@prisma/client";
import { format } from "@/utils";

type ProductCartProps = Pick<
  Product,
  "title" | "price" | "slug" | "images" | "inStock"
>;

interface Props extends ProductCartProps {
  admin?: boolean;
}

export const ProductCard: FC<Props> = ({
  title,
  images,
  price,
  slug,
  inStock,
  admin,
}) => {
  return (
    <Link href={admin ? `/admin/product/${slug}` : `/product/${slug}`}>
      <div className="border-[1px] border-low-gray">
        <span className="w-full flex relative">
          <Image
            width={336}
            height={336}
            src={images[0]}
            alt={title}
            loading="lazy"
          />
          {inStock === 0 && (
            <span className="absolute w-full text-center bg-red uppercase text-white md:text-sm text-xs font-bold p-1 bottom-0 left-0">
              Agotado
            </span>
          )}
        </span>
        <div className="p-3 text-center md:p-4">
          <p className="text-xs font-medium uppercase mb-2 line-clamp-1 md:text-base">
            {title}
          </p>
          <p className="font-bold">{format(price)}</p>
        </div>
      </div>
    </Link>
  );
};
