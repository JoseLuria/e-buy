import { prisma } from "@/prisma";
import { Product, OrderItem } from "@prisma/client";

type pathType = {
  params: {
    slug: string;
  };
};

export const getProductsBySlug = async (
  slug: string
): Promise<Product | undefined> => {
  const product = await prisma.product.findFirst({ where: { slug } });

  if (!product) {
    return undefined;
  }

  return product;
};

export const getAllSlugs = async (): Promise<pathType[]> => {
  const products = await prisma.product.findMany({});
  const slugs = products.map(({ slug }) => ({ params: { slug } }));
  return slugs;
};

export const checkSubTotal = async (
  orderItems: OrderItem[]
): Promise<number> => {
  const productsIds = orderItems.map(({ id }) => id);

  const products = await prisma.product.findMany({
    where: {
      id: { in: productsIds },
    },
  });

  const subTotal = orderItems.reduce((prev, current) => {
    const currentProduct = products.find(({ id }) => id === current.id);

    if (!currentProduct) {
      return 0;
    }

    return current.quantity * currentProduct.price + prev;
  }, 0);

  const tax = subTotal * Number(process.env.NEXT_PUBLIC_TAX);
  const grandTotal = subTotal + tax;

  return grandTotal;
};
