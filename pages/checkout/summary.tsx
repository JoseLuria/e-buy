import { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Layout,
  MainGrid,
  CartProductList,
  Button,
  OrderAddress,
  OrderProducts,
} from "@/components";
import {
  useSelector,
  useDispatch,
  getAuthState,
  getCartState,
  clearCart,
} from "@/toolkit";
import { filterProps, orderProps } from "@/utils";
import { CreateOrderType } from "@/interfaces";
import { Order } from "@prisma/client";

const title = "Resumen de la orden";

const Summary: NextPage = () => {
  const { cartList, cartProducts, grandTotal, subTotal, tax } =
    useSelector(getCartState);
  const { address, user } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const [fetching, setFetching] = useState(false);
  const router = useRouter();

  const handleCreateOrder = async () => {
    try {
      setFetching(true);
      const orderItems = cartList.map((props) => {
        const product = filterProps(props, ...orderProps);
        return product;
      });
      const orderData: CreateOrderType = {
        user: user!.id,
        orderItems,
        address: address!,
        numberOfItems: cartProducts,
        subTotal,
        tax,
        grandTotal,
        isPaid: false,
      };
      const { data } = await axios.post<Order>("/api/order", orderData);
      setFetching(false);
      dispatch(clearCart());
      router.replace(`/order/${data.id}`);
    } catch (error: any) {
      console.log(error);
      setFetching(false);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!address) {
      router.push("/checkout/address");
    }
  }, [address, router]);

  if (!address) {
    return <></>;
  }

  return (
    <Layout title={title}>
      <MainGrid title={title}>
        <CartProductList cartList={cartList} editable />
        <div className="flex flex-col gap-6">
          <OrderAddress address={address} editable />
          <OrderProducts
            cartProducts={cartProducts}
            grandTotal={grandTotal}
            subTotal={subTotal}
            tax={tax}
            editable
          />
          <Button disabled={fetching} action={handleCreateOrder} full>
            Confirmar orden
          </Button>
        </div>
      </MainGrid>
    </Layout>
  );
};

export default Summary;
