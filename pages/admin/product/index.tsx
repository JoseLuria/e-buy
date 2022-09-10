import { NextPage } from "next";
import { useRouter } from "next/router";
import { Layout, Text, Button, Loader, ProductGrid } from "@/components";
import { useApi } from "@/hooks";
import { Product } from "@prisma/client";

const AdminProducts: NextPage = () => {
  const { data, isLoading, error } = useApi<Product[]>("admin/product");
  const router = useRouter();

  return (
    <Layout title="Mantenimiento de productos">
      <Loader loading={isLoading} error={error} />
      {data && (
        <main className="pt-6 md:pt-12">
          <Text className="mb-6 md:mb-12" tag="h1">
            Mantenimiento de productos
          </Text>
          <div className="mb-6 flex justify-between flex-wrap gap-6 items-center">
            <Text tag="h2">Total: {data.length}</Text>
            <Button action={() => router.push("/admin/product/new")}>
              Producto nuevo
            </Button>
          </div>
          <ProductGrid products={data} admin />
        </main>
      )}
    </Layout>
  );
};

export default AdminProducts;
