import { FC } from "react";
import { CartProduct } from "@/components";
import { CartProductInterface } from "@/interfaces";

interface Props {
  cartList: CartProductInterface[];
  editable?: boolean;
}

export const CartProductList: FC<Props> = ({ cartList, editable }) => {
  return (
    <div className="flex flex-col gap-4">
      {cartList.map((props, index) => (
        <CartProduct key={index} {...props} editable={editable} />
      ))}
    </div>
  );
};
