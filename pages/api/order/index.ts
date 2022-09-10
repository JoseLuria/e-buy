import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { invalidMethod } from "@/utils";
import { ApiMessage, CreateOrderType } from "@/interfaces";
import { yupOrder } from "@/validations";
import { filterProps, addressProps, catchError, AppError } from "@/utils";
import { prisma, prismaProduct } from "@/prisma";
import { Order } from "@prisma/client";

type Data = ApiMessage | Order;

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "POST":
        return await createOrder(req, res);
      default:
        return invalidMethod();
    }
  }
);

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await yupOrder.validate(req.body);
  const session: any = await getToken({ req });

  if (!session) {
    throw new AppError(401, "Error de autenticación");
  }

  const { user, orderItems, grandTotal, address, subTotal } =
    req.body as CreateOrderType;

  if (user !== session.user.id) {
    throw new AppError(401, "Usuario invalidó");
  }

  const dbGrandTotal = await prismaProduct.checkSubTotal(orderItems);

  if (dbGrandTotal !== grandTotal) {
    throw new AppError(400, "Los montos totales no coinciden");
  }

  let orderAddress = address;

  if (!address.addressTwo) {
    orderAddress = filterProps(orderAddress, ...addressProps);
  }

  const order = await prisma.order.create({
    data: {
      ...req.body,
      address: orderAddress,
      isPaid: false,
      subTotal: Math.round(subTotal * 100) / 100,
    },
  });

  res.status(201).json(order);
};
