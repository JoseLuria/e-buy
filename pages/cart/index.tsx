import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout, CartProductList, MainGrid, CartCheckout } from "@/components";
import { useSelector, getCartState } from "@/toolkit";

const Cart: NextPage = () => {
  const { cartProducts, cartList } = useSelector(getCartState);
  const router = useRouter();

  useEffect(() => {
    if (cartProducts === 0) {
      router.replace("/cart/empty");
    }
  }, [cartProducts, router]);

  return (
    <Layout title="Carrito de compras">
      <MainGrid>
        {cartProducts > 0 && (
          <>
            <CartProductList cartList={cartList} />
            <CartCheckout />
          </>
        )}
      </MainGrid>
    </Layout>
  );
};

export default Cart;
