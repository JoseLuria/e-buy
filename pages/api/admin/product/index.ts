import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMessage, CreateProductType } from "@/interfaces";
import { invalidMethod, AppError, catchError } from "@/utils";
import { yupCreateProduct } from "@/validations";
import { Product } from "@prisma/client";
import { prisma } from "@/prisma";

type Data = ApiMessage | Product | Product[];

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "GET":
        return await getAllProducts(res);
      case "POST":
        return await createProduct(req, res);
      default:
        return invalidMethod();
    }
  }
);

const getAllProducts = async (res: NextApiResponse<Data>) => {
  const products = await prisma.product.findMany();

  res.status(200).json(products);
};

const createProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  await yupCreateProduct.validate(req.body);

  const { slug } = req.body as CreateProductType;

  const newProduct = {
    ...req.body,
    inStock: Number(req.body.inStock),
    price: Number(req.body.price),
  };

  const productExist = await prisma.product.findFirst({ where: { slug } });

  if (productExist) {
    throw new AppError(400, "Ya hay un producto con ese slug");
  }

  const product = await prisma.product.create({ data: { ...newProduct } });

  res.status(200).json(product);
};
