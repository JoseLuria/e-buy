import { NextPage, GetServerSideProps } from "next";
import { Layout, EmptyCard } from "@/components";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/prisma";
import { DbErrorIcon } from "@/icons";

const OrdersEmpty: NextPage = () => {
  return (
    <Layout title="Historial de ordenes">
      <EmptyCard
        title="No hay órdenes de compra"
        text="Al parecer todavía no has realizado ninguna orden de compra."
      >
        <DbErrorIcon />
      </EmptyCard>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const user = session.user.id;

  const orders = await prisma.order.count({ where: { user } });

  if (orders > 0) {
    return {
      redirect: {
        destination: "/user/order",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default OrdersEmpty;
