import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import axios from "axios";
import { invalidMethod, catchError, AppError } from "@/utils";
import { ApiMessage, PaypalOrderInterface } from "@/interfaces";
import { prisma } from "@/prisma";

type Data = ApiMessage;

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "POST":
        return await payOrder(req, res);
      default:
        return invalidMethod();
    }
  }
);

const getPaypalBarerToken = async (): Promise<string | undefined> => {
  const clientID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!;
  const clientSecret = process.env.PAYPAL_SECRET!;

  const base64Token = Buffer.from(
    `${clientID}:${clientSecret}`,
    "utf-8"
  ).toString("base64");
  const body = new URLSearchParams("grant_type=client_credentials");

  try {
    const { data } = await axios.post(process.env.PAYPAL_OAUTH_URL!, body, {
      headers: {
        Authorization: `Basic ${base64Token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return data.access_token;
  } catch (error) {
    return undefined;
  }
};

const payOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    throw new AppError(401, "Error de autenticación");
  }

  const paypalBarerToken = await getPaypalBarerToken();

  if (!paypalBarerToken) {
    throw new AppError(400, "No se pudo verificar la orden");
  }

  const { transactionId, orderId } = req.body;

  const PAYPAL_URL = `${process.env.PAYPAL_ORDERS_URL}/${transactionId}`;

  const { data } = await axios.get<PaypalOrderInterface>(PAYPAL_URL, {
    headers: {
      Authorization: `Bearer ${paypalBarerToken}`,
    },
  });

  if (data.status !== "COMPLETED") {
    throw new AppError(400, "Orden no reconocida");
  }

  const order = await prisma.order.findFirst({ where: { id: orderId } });

  if (!order) {
    throw new AppError(400, "La orden no existe en la base de datos");
  }

  if (order.grandTotal !== Number(data.purchase_units[0].amount.value)) {
    throw new AppError(400, "Error en los montos de la orden");
  }

  if (order.user !== session.user.id) {
    throw new AppError(401, "La orden pertenece a otro usuario");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { transactionId, isPaid: true },
  });

  res.status(200).json({ message: "Orden pagada" });
};
