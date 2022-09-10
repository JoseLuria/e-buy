import { FC } from "react";
import { CartProduct } from "@/components";
import { OrderItem } from "@prisma/client";

interface Props {
  orderItems: OrderItem[];
}

export const OrderProductList: FC<Props> = ({ orderItems }) => {
  return (
    <div className="flex flex-col gap-4">
      {orderItems.map((props, index) => (
        <CartProduct key={index} {...props} />
      ))}
    </div>
  );
};
