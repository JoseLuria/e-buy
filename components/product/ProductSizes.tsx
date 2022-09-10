import { FC, Dispatch, SetStateAction } from "react";
import { ProductSizes as productSizes } from "@prisma/client";

type setSize = Dispatch<SetStateAction<productSizes | undefined>>;

interface Props {
  sizes: productSizes[];
  setSize: setSize;
  actualSize?: productSizes;
}

export const ProductSizes: FC<Props> = ({ sizes, setSize, actualSize }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {sizes.map((size, index) => (
        <button
          onClick={() => setSize(size)}
          className={`py-1 px-6 font-bold ${
            actualSize === size
              ? "bg-black text-white"
              : "bg-low-gray hover:text-white hover:bg-black focus-visible:text-white focus-visible:bg-black"
          }`}
          key={index}
        >
          {size}
        </button>
      ))}
    </div>
  );
};
