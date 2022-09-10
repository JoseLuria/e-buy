import { FC } from "react";
import { SmallMinusIcon, SmallPlusIcon } from "@/icons";

interface Props {
  quantity: number;
  changeQuantity: (value: number) => void;
}

export const CartProductQuantity: FC<Props> = ({
  quantity,
  changeQuantity,
}) => {
  return (
    <div className="h-6 flex gap-4 bg-low-gray px-2 items-center">
      <button onClick={() => changeQuantity(-1)} className="flex">
        <SmallMinusIcon />
      </button>
      <p>{quantity}</p>
      <button onClick={() => changeQuantity(1)} className="flex">
        <SmallPlusIcon />
      </button>
    </div>
  );
};
