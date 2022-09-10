import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMessage } from "@/interfaces";
import { invalidMethod, AppError, catchError } from "@/utils";
import { yupCreateProduct } from "@/validations";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "@prisma/client";
import { prisma } from "@/prisma";

cloudinary.config(process.env.CLOUDINARY_URL!);

type Data = ApiMessage | Product;

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "PUT":
        return await updateProduct(req, res);
      default:
        return invalidMethod();
    }
  }
);

const updateProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await yupCreateProduct.validate(req.body);

  const { id } = req.query as { id: string };

  const toUpdate = {
    ...req.body,
    inStock: Number(req.body.inStock),
    price: Number(req.body.price),
  };

  const product = await prisma.product.update({
    where: { id },
    data: { ...toUpdate },
  });

  if (!product) {
    throw new AppError(400, "Producto no encontrado");
  }

  res.status(200).json(product);
};
