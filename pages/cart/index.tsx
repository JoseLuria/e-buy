import { NextPage } from "next";
import {
  Layout,
  CartProductList,
  MainGrid,
  CartCheckout,
  EmptyCard,
} from "@/components";
import { CartIcon } from "@/icons";
import { useSelector, getCartState } from "@/toolkit";

const Cart: NextPage = () => {
  const { cartProducts, cartList } = useSelector(getCartState);

  return (
    <Layout title="Carrito de compras">
      {cartProducts > 0 ? (
        <MainGrid>
          <CartProductList cartList={cartList} />
          <CartCheckout />
        </MainGrid>
      ) : (
        <EmptyCard
          title="Carrito vacío"
          text="Su carrito de compras se encuentra vacío. Agregue algunos productos y regrese a esta página."
        >
          <CartIcon width={80} height={80} />
        </EmptyCard>
      )}
    </Layout>
  );
};

export default Cart;
