import { NextPage } from "next";
import { Layout, ProductGrid, Text, Loader } from "@/components";
import { Product } from "@prisma/client";
import { useApi } from "@/hooks";
import { ApiSeach } from "@/interfaces";
import { useRouter } from "next/router";

interface Props {
  products: Product[];
  foundProducts: boolean;
  query: string;
}

const Search: NextPage<Props> = () => {
  const { query } = useRouter();
  const { data, error, isLoading } = useApi<ApiSeach>(`search/${query.query}`);

  return (
    <Layout title="Inicio">
      <Loader loading={isLoading} error={error} />
      {data && (
        <div className="flex flex-col gap-6 pt-6 md:pt-12">
          <Text tag="h1">Resultados</Text>
          <Text>
            {data.foundProducts
              ? `Termino buscado: ${data.query}`
              : `No se encontraron productos relacionados con el término: ${data.query}`}
          </Text>
          <ProductGrid products={data.products} />
        </div>
      )}
    </Layout>
  );
};

export default Search;
