import type { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod, catchError } from "@/utils";
import { ApiMessage, ApiAdmin } from "@/interfaces";
import { prisma } from "@/prisma";

type Data = ApiMessage | ApiAdmin;

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "GET":
        return await getAdminData(res);
      default:
        return invalidMethod();
    }
  }
);

const getAdminData = async (res: NextApiResponse<Data>) => {
  const [
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { isPaid: true } }),
    prisma.order.count({ where: { isPaid: false } }),
    prisma.user.count({ where: { role: "client" } }),
    prisma.product.count(),
    prisma.product.count({ where: { inStock: 0 } }),
    prisma.product.count({ where: { inStock: { lte: 10 } } }),
  ]);

  const admin = {
    numberOfOrders,
    paidOrders,
    notPaidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventory,
    lowInventory,
  };

  res.status(200).json(admin);
};
