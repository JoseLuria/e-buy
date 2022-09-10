import type { NextPage, GetServerSideProps } from "next";
import { Product, ProductGender } from "@prisma/client";
import { useApi } from "@/hooks";
import { Layout, Loader, ProductGrid, Text } from "@/components";
import { validGenders, categoryTexts } from "@/data";

interface Props {
  gender: ProductGender;
  title: string;
  text: string;
}

const ProductCategory: NextPage<Props> = ({ gender, title, text }) => {
  const { data, isLoading, error } = useApi<Product[]>(
    `product?gender=${gender}`
  );

  return (
    <Layout title={title}>
      <Loader loading={isLoading} error={error} />
      {data && (
        <main className="pt-6 md:pt-12">
          <div className="mb-6">
            <Text tag="h1" className="mb-2 md:mb-4">
              {title}
            </Text>
            <Text className="uppercase">{text}</Text>
          </div>
          <ProductGrid products={data} />
        </main>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { gender } = query as { gender: ProductGender };

  if (!validGenders.includes(gender)) {
    return {
      notFound: true,
    };
  }

  const categoryText = categoryTexts.find(({ id }) => id === gender);

  if (!categoryText) {
    return {
      notFound: true,
    };
  }

  const { text, title } = categoryText;

  return {
    props: {
      gender,
      title,
      text,
    },
  };
};

export default ProductCategory;
