import { FC, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  localStorageCartExist,
  getLocalStorageCart,
  saveToLocalStorage,
} from "@/utils";
import { useDispatch, setCart, login, setAddress } from "@/toolkit";
import { User } from "@prisma/client";

interface AppWrapperInterface {
  children: ReactNode;
}

export const AppWrapper: FC<AppWrapperInterface> = ({ children }) => {
  const dispatch = useDispatch();
  const { data, status } = useSession();

  const initialCart = {
    cartList: [],
    subTotal: 0,
    cartProducts: 0,
    tax: 0,
    grandTotal: 0,
  };

  useEffect(() => {
    if (localStorageCartExist()) {
      const cart = getLocalStorageCart();
      dispatch(setCart(cart));
    } else {
      saveToLocalStorage(initialCart);
    }
  });

  useEffect(() => {
    if (status === "authenticated") {
      dispatch(login(data.user as User));
    }
  }, [data, status, dispatch]);

  useEffect(() => {
    if (localStorage.address) {
      const adress = JSON.parse(localStorage.address);
      dispatch(setAddress(adress));
    }
  }, [dispatch]);

  return (
    <>
      {children}
      <ToastContainer
        icon
        theme="colored"
        pauseOnHover={false}
        autoClose={1500}
      />
    </>
  );
};
