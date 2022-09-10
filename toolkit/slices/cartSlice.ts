import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductInterface } from "@/interfaces";
import { updateCartState } from "@/utils";

export interface CartStateInterface {
  cartList: CartProductInterface[];
  subTotal: number;
  cartProducts: number;
  tax: number;
  grandTotal: number;
}

type removeCartElement = Pick<CartProductInterface, "slug" | "size">;
type updateCartElement = Pick<
  CartProductInterface,
  "slug" | "size" | "quantity"
>;

const initialState: CartStateInterface = {
  cartList: [],
  subTotal: 0,
  cartProducts: 0,
  tax: 0,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state: CartStateInterface,
      action: PayloadAction<CartProductInterface>
    ) => {
      const product = state.cartList.find(
        ({ slug, size }) =>
          slug === action.payload.slug && size === action.payload.size
      );

      if (product) {
        product.quantity += action.payload.quantity;
      } else {
        state.cartList = [...state.cartList, action.payload];
      }

      updateCartState(state);
    },
    removeFromCart: (
      state: CartStateInterface,
      action: PayloadAction<removeCartElement>
    ) => {
      const productToRemove = state.cartList.find(
        ({ slug, size }) =>
          slug === action.payload.slug && size === action.payload.size
      );

      if (!productToRemove) return;

      const newCartList = state.cartList.filter(
        (product) => product !== productToRemove
      );

      state.cartList = newCartList;
      updateCartState(state);
    },
    changeQuantity: (
      state: CartStateInterface,
      action: PayloadAction<updateCartElement>
    ) => {
      const productToUpdate = state.cartList.find(
        ({ slug, size }) =>
          slug === action.payload.slug && size === action.payload.size
      );

      if (!productToUpdate) return;

      productToUpdate.quantity = action.payload.quantity;
      updateCartState(state);
    },
    setCart: (
      state: CartStateInterface,
      action: PayloadAction<CartStateInterface>
    ) => {
      state.cartList = action.payload.cartList;
      updateCartState(state);
    },
    clearCart: (state: CartStateInterface) => {
      state.cartList = [];
      state.subTotal = 0;
      state.cartProducts = 0;
      state.tax = 0;
      state.grandTotal = 0;
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, setCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
