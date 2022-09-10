import { CartStateInterface } from "@/toolkit";

export const updateCartState = (state: CartStateInterface) => {
  state.subTotal = state.cartList.reduce(
    (prev, current) => prev + current.quantity * current.price,
    0
  );
  state.cartProducts = state.cartList.reduce(
    (prev, current) => prev + current.quantity,
    0
  );
  state.tax = state.subTotal * Number(process.env.NEXT_PUBLIC_TAX);
  state.grandTotal = state.subTotal + state.tax;
};
