import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "@prisma/client";
import { ApiMessage } from "@/interfaces";
import { getSession, AppError, catchError, invalidMethod } from "@/utils";
import { prisma } from "@/prisma";

type Data = ApiMessage | User[];

const validRoles = ["admin", "client"];

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "GET":
        return await getUsers(req, res);
      case "PUT":
        return await updateUser(req, res);
      default:
        return invalidMethod();
    }
  }
);

const getUsers = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session = await getSession(req);

  const id = session.user.id;

  const users = await prisma.user.findMany({ where: { id: { not: id } } });

  res.status(200).json(users);
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { userId, role } = req.body;

  if (!userId) {
    throw new AppError(400, "Él, userId proporcionando en inválido");
  }

  if (!validRoles.includes(role)) {
    throw new AppError(400, "Él, rol proporcionando en inválido");
  }
  await prisma.user.update({ where: { id: userId }, data: { role } });

  res.status(200).json({ message: "Usuario actualizado" });
};
