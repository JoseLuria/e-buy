import { NextPage, GetServerSideProps } from "next";
import { Layout, EmptyCard } from "@/components";
import { CartIcon } from "@/icons";

const CartEmpty: NextPage = () => {
  return (
    <Layout title="Carrito de compras">
      <EmptyCard
        title="Carrito vacío"
        text="Su carrito de compras se encuentra vacío. Agregue algunos productos y regrese a esta página."
      >
        <CartIcon width={80} height={80} />
      </EmptyCard>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { cartProducts } = req.cookies;

  if (Number(cartProducts) > 0) {
    return {
      redirect: {
        destination: "/cart",
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
};

export default CartEmpty;
