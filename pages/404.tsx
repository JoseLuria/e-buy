import { NextPage } from "next";
import { Layout, EmptyCard } from "@/components";

const NotFound: NextPage = () => {
  return (
    <Layout title="No encontrado">
      <EmptyCard
        title="Ups! Página no encontrada"
        text="Esta página no existe o ha sido eliminada. Le sugerimos regresar a la página de inicio."
      >
        <h1 className="text-8xl font-bold md:text-9xl">404</h1>
      </EmptyCard>
    </Layout>
  );
};

export default NotFound;
