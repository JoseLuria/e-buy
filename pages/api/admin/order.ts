import type { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod, getSession, catchError, AppError } from "@/utils";
import { ApiMessage } from "@/interfaces";
import { prisma } from "@/prisma";
import { Order } from "@prisma/client";

type Data = ApiMessage | Order[];

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "GET":
        return await getOrders(req, res);
      default:
        return invalidMethod();
    }
  }
);

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession(req);

  const id = session.user.id;

  const orders = await prisma.order.findMany({ where: { user: { not: id } } });

  res.status(200).json(orders);
};
