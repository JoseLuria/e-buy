import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMessage, ApiSeach } from "@/interfaces";
import { prisma } from "@/prisma";
import { AppError, catchError, invalidMethod } from "@/utils";

type Data = ApiMessage | ApiSeach;

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "GET":
        return await searchProduct(req, res);
      default:
        return invalidMethod();
    }
  }
);

const searchProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { query } = req.query as { query: string };

  if (!query || query.length === 0) {
    throw new AppError(400, "Debe especificar en query de búsqueda");
  }

  let products = await prisma.product.findMany({
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await prisma.product.findMany();
  }

  res.status(200).json({ products, foundProducts, query });
};
