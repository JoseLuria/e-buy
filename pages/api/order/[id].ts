import type { NextApiRequest, NextApiResponse } from "next";
import { invalidMethod, getSession, catchError, AppError } from "@/utils";
import { ApiMessage } from "@/interfaces";
import { prisma } from "@/prisma";

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<ApiMessage>) => {
    switch (req.method) {
      case "DELETE":
        return await deleteOrder(req, res);
      default:
        return invalidMethod();
    }
  }
);

const deleteOrder = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiMessage>
) => {
  const { id } = req.query as { id: string };

  const session = await getSession(req);

  if (!session) {
    throw new AppError(401, "Error de autenticación");
  }

  const order = await prisma.order.findFirst({
    where: {
      id,
      isPaid: false,
      user: session.user.id,
    },
  });

  if (!order) {
    throw new AppError(400, "Orden no encontrada");
  }

  await prisma.order.delete({
    where: {
      id,
    },
  });

  res.status(200).json({ message: "Orden eliminada" });
};
