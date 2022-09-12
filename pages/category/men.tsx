import type { NextPage } from "next";
import { Product } from "@prisma/client";
import { useApi } from "@/hooks";
import { Layout, Loader, ProductGrid, Text } from "@/components";

const title = "Hombres";

const MenProducts: NextPage = () => {
  const { data, isLoading, error } = useApi<Product[]>("product?gender=men");

  return (
    <Layout title={title}>
      <Loader loading={isLoading} error={error} />
      {data && (
        <main className="pt-6 md:pt-12">
          <div className="mb-6">
            <Text tag="h1" className="mb-2 md:mb-4">
              {title}
            </Text>
            <Text className="uppercase">Productos para hombres.</Text>
          </div>
          <ProductGrid products={data} />
        </main>
      )}
    </Layout>
  );
};

export default MenProducts;
