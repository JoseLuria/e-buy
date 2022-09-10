import type { NextApiRequest, NextApiResponse } from "next";
import { ApiMessage } from "@/interfaces";
import { users, products } from "@/data";
import { invalidMethod, AppError, catchError } from "@/utils";
import { prisma } from "@/prisma";

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<ApiMessage>) => {
    switch (req.method) {
      case "POST":
        return await createData(res);
      default:
        return invalidMethod();
    }
  }
);

const createData = async (res: NextApiResponse<ApiMessage>) => {
  if (process.env.NODE_ENV === "production") {
    throw new AppError(400, "No se puede acceder desde producción");
  }

  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.createMany({ data: users });
  await prisma.product.createMany({ data: products });

  res.status(200).json({ message: "Datos agregados" });
};
