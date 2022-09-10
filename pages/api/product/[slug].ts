import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";
import { prisma } from "@/prisma";
import { ApiMessage } from "@/interfaces";
import { invalidMethod, catchError, AppError } from "@/utils";

type Data = ApiMessage | Product;

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "GET":
        return await getProductBySlug(req, res);
      default:
        return invalidMethod();
    }
  }
);

const getProductBySlug = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { slug } = req.query;

  const product = await prisma.product.findFirst({
    where: { slug: `${slug}` },
  });

  if (!product) {
    throw new AppError(400, "Producto no encontrado");
  }

  res.status(200).json(product);
};
