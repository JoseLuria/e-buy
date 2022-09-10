import { FC, Dispatch, SetStateAction } from "react";
import { PlusIcon, MinusIcon } from "@/icons";

type setQuantity = Dispatch<SetStateAction<number>>;

interface Props {
  quantity: number;
  setQuantity: setQuantity;
  inStock: number;
}

export const ProductQuantity: FC<Props> = ({
  quantity,
  setQuantity,
  inStock,
}) => {
  const handleQuantityChange = (value: number) => {
    const newValue = Math.max(quantity + value, 1);
    if (newValue > inStock) return;
    setQuantity(newValue);
  };

  return (
    <div className="w-full bg-low-gray flex items-center h-12 px-6">
      <button onClick={() => handleQuantityChange(-1)} className="flex">
        <MinusIcon />
      </button>
      <p className="mx-auto text-sm font-bold">{quantity}</p>
      <button onClick={() => handleQuantityChange(+1)} className="flex">
        <PlusIcon />
      </button>
    </div>
  );
};
