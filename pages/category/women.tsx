import type { NextPage } from "next";
import { Product } from "@prisma/client";
import { useApi } from "@/hooks";
import { Layout, Loader, ProductGrid, Text } from "@/components";

const title = "Mujeres";

const WomenProducts: NextPage = () => {
  const { data, isLoading, error } = useApi<Product[]>("product?gender=women");

  return (
    <Layout title={title}>
      <Loader loading={isLoading} error={error} />
      {data && (
        <main className="pt-6 md:pt-12">
          <div className="mb-6">
            <Text tag="h1" className="mb-2 md:mb-4">
              {title}
            </Text>
            <Text className="uppercase">Productos para mujeres.</Text>
          </div>
          <ProductGrid products={data} />
        </main>
      )}
    </Layout>
  );
};

export default WomenProducts;
