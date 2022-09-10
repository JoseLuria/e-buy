import { NextPage, GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import { Layout, OrderItem, Text } from "@/components";
import { Order } from "@prisma/client";
import { prisma } from "@/prisma";

interface Props {
  orders: Order[];
}

const Orders: NextPage<Props> = ({ orders }) => {
  return (
    <Layout title="Historial de ordenes">
      <main className="pt-6 md:pt-12">
        <Text className="mb-6 md:mb-12" tag="h1">
          Historial de ordenes
        </Text>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
          {orders.map(({ id, isPaid, address }) => (
            <OrderItem
              key={id}
              id={id!}
              isPaid={isPaid}
              userName={address.name}
            />
          ))}
        </div>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const user = session.user.id;

  const orders = await prisma.order.findMany({ where: { user } });

  if (orders.length === 0) {
    return {
      redirect: {
        destination: "/user/order/empty",
        permanent: false,
      },
    };
  }

  return {
    props: {
      orders,
    },
  };
};

export default Orders;
