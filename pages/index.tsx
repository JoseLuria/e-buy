import type { NextPage } from "next";
import { Product } from "@prisma/client";
import { useApi } from "@/hooks";
import { Layout, Loader, ProductGrid } from "@/components";

const Home: NextPage = () => {
  const { data, isLoading, error } = useApi<Product[]>("product");

  return (
    <Layout title="Inicio">
      <Loader loading={isLoading} error={error} />
      {data && (
        <main className="pt-6 md:pt-12">
          <ProductGrid products={data} />
        </main>
      )}
    </Layout>
  );
};

export default Home;
