import type { NextApiRequest, NextApiResponse } from "next";
import { Product, ProductGender } from "@prisma/client";
import { prisma } from "@/prisma";
import { ApiMessage } from "@/interfaces";
import { invalidMethod, catchError, AppError } from "@/utils";
import { validGenders } from "@/data";

type Data = ApiMessage | Product[];

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "GET":
        return await getAllProducts(req, res);
      default:
        return invalidMethod();
    }
  }
);

const getAllProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { gender } = req.query as { gender: ProductGender | undefined };

  if (gender && !validGenders.includes(`${gender}`)) {
    throw new AppError(400, "El género ingresado no es válido");
  }

  if (!gender) {
    const products = await prisma.product.findMany({});
    return res.status(200).json(products);
  }

  const products = await prisma.product.findMany({ where: { gender } });
  res.status(200).json(products);
};
