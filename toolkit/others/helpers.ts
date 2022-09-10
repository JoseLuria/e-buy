import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
import { CartStateInterface, AuthStateInterface, store } from "@/toolkit";

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const getCartState = (state: { cart: CartStateInterface }) => state.cart;
export const getAuthState = (state: { auth: AuthStateInterface }) => state.auth;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
