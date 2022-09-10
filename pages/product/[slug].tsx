import { useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Product, ProductSizes as productSizes } from "@prisma/client";
import {
  Layout,
  Text,
  Button,
  ProductGallery,
  ProductSizes,
  ProductQuantity,
} from "@/components";
import { prismaProduct } from "@/prisma";
import { format } from "@/utils";
import { useDispatch, addToCart } from "@/toolkit";

interface Props {
  product: Product;
}

const Product: NextPage<Props> = ({ product }) => {
  const [size, setSize] = useState<productSizes>();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    if (!size) return;
    const { id, title, slug, images, price, gender, inStock } = product;
    const newProduct = {
      id,
      title,
      slug,
      image: images[0],
      price,
      gender,
      quantity,
      size,
      inStock,
    };
    dispatch(addToCart(newProduct));
    toast.success("Producto añadido");
    router.push("/cart");
  };

  return (
    <Layout
      title={product.title}
      description={product.description}
      otg={product.images[1]}
    >
      <main className="pt-6 lg:grid lg:grid-cols-2 md:gap-8 md:pt-12 lg:items-start lg:gap-16 xl:items-center">
        <ProductGallery
          gallery={product.images}
          title={product.title}
          inStock={product.inStock}
        />
        <div className="mt-6 flex flex-col gap-6 lg:mt-0">
          <Text tag="h1">{product.title}</Text>
          <Text>{product.description}</Text>
          <ProductSizes
            sizes={product.sizes}
            setSize={setSize}
            actualSize={size}
          />
          <p className="text-2xl font-bold">{format(product.price)}</p>
          <div className="lg:grid lg:grid-cols-2 lg:gap-6">
            <ProductQuantity
              quantity={quantity}
              inStock={product.inStock}
              setQuantity={setQuantity}
            />
            <Button
              action={handleAddProduct}
              className="mt-6 lg:mt-0"
              disabled={!size || product.inStock === 0}
              full
            >
              Agregar al carrito
            </Button>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await prismaProduct.getAllSlugs();

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const product = await prismaProduct.getProductsBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 86400,
  };
};

export default Product;
