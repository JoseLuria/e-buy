import { useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { useRouter } from "next/router";
import axios from "axios";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { prisma } from "@/prisma";
import { Order } from "@prisma/client";
import {
  Layout,
  MainGrid,
  OrderStatus,
  OrderAddress,
  OrderProducts,
  OrderProductList,
} from "@/components";
import { PaypalOrderResponseBody } from "@/interfaces";

interface Props {
  order: Order;
  admin: boolean;
}

const Order: NextPage<Props> = ({ order, admin }) => {
  const [checkOrder, setCheckOrder] = useState(false);
  const title = `Orden: ${order.id}`;
  const router = useRouter();

  const onOrderCompleted = async (detail: PaypalOrderResponseBody) => {
    setCheckOrder(true);
    if (detail.status !== "COMPLETED") {
      toast.error("No hay pago en paypal");
      return;
    }
    try {
      await axios.post("/api/order/pay", {
        transactionId: detail.id,
        orderId: order.id,
      });
      router.reload();
    } catch (error: any) {
      setCheckOrder(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Layout title={title}>
      <MainGrid title={title}>
        <OrderProductList orderItems={order.orderItems} />
        <div className="flex flex-col gap-6">
          <OrderAddress address={order.address} />
          <OrderProducts
            cartProducts={order.numberOfItems}
            grandTotal={order.grandTotal}
            subTotal={order.subTotal}
            tax={order.tax}
          />
          <OrderStatus status={order.isPaid} />
          {!admin && (
            <>
              {!order.isPaid && !checkOrder && (
                <div className="z-[2]">
                  <PayPalButtons
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: `${order.grandTotal}`,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details) => {
                        onOrderCompleted(details);
                      });
                    }}
                  />
                </div>
              )}
              {checkOrder && (
                <div className="bg-black p-4 text-white uppercase justify-center flex gap-4 font-bold text-center">
                  Procesando pago
                </div>
              )}
            </>
          )}
        </div>
      </MainGrid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const { id } = params as { id: string };

  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return {
      redirect: {
        destination: `/auth/login?page=/order/${id}`,
        permanent: false,
      },
    };
  }

  const order = await prisma.order.findFirst({ where: { id } });

  if (!order) {
    return {
      notFound: true,
    };
  }

  if (session.user.role !== "admin" && order.user !== session.user.id) {
    return {
      redirect: {
        destination: "/user/order",
        permanent: false,
      },
    };
  }

  const admin = session.user.role === "admin" && order.user !== session.user.id;

  return {
    props: {
      order,
      admin,
    },
  };
};

export default Order;
