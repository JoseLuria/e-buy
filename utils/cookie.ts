import Cookie from "js-cookie";
import { CartStateInterface, AuthStateInterface } from "@/toolkit";

export const localStorageCartExist = () => {
  const cartList = localStorage.cartList;
  const subTotal = localStorage.subTotal;
  const cartProducts = localStorage.cartProducts;
  const tax = localStorage.tax;
  const grandTotal = localStorage.grandTotal;

  if (cartList && subTotal && cartProducts && tax && grandTotal) {
    return true;
  } else {
    return false;
  }
};

export const getLocalStorageCart = (): CartStateInterface => {
  const cartList = JSON.parse(localStorage.cartList);
  const subTotal = JSON.parse(localStorage.subTotal);
  const cartProducts = JSON.parse(localStorage.cartProducts);
  const tax = JSON.parse(localStorage.tax);
  const grandTotal = JSON.parse(localStorage.grandTotal);

  return {
    cartList,
    subTotal,
    cartProducts,
    tax,
    grandTotal,
  };
};

export const saveToLocalStorage = (
  cartState: CartStateInterface,
  authState?: AuthStateInterface
) => {
  const cartList = JSON.stringify(cartState.cartList);
  const subTotal = JSON.stringify(cartState.subTotal);
  const cartProducts = JSON.stringify(cartState.cartProducts);
  const tax = JSON.stringify(cartState.tax);
  const grandTotal = JSON.stringify(cartState.grandTotal);

  localStorage.setItem("cartList", cartList);
  localStorage.setItem("subTotal", subTotal);
  localStorage.setItem("cartProducts", cartProducts);
  localStorage.setItem("tax", tax);
  localStorage.setItem("grandTotal", grandTotal);

  Cookie.set("cartList", cartList);
  Cookie.set("subTotal", subTotal);
  Cookie.set("cartProducts", cartProducts);
  Cookie.set("tax", tax);
  Cookie.set("grandTotal", grandTotal);

  if (authState && authState.address) {
    const address = JSON.stringify(authState.address);

    localStorage.setItem("address", address);
    Cookie.set("address", address);
  }
};
