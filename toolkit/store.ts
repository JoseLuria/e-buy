import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "@/utils";
import { cartSlice, authSlice } from "./slices";

const reducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
});

export const store = configureStore({ reducer });

store.subscribe(() =>
  saveToLocalStorage(store.getState().cart, store.getState().auth)
);
