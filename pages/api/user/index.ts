import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";
import { ApiMessage, ApiCreateUser, ApiUser } from "@/interfaces";
import { invalidMethod, getSession, catchError, AppError } from "@/utils";
import { yupRegister, yupUser } from "@/validations";
import { prisma } from "@/prisma";

type Data = ApiMessage | ApiCreateUser | ApiUser;

export default catchError(
  async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    switch (req.method) {
      case "GET":
        return await getUser(req, res);
      case "POST":
        return await createUser(req, res);
      case "PUT":
        return await updateUser(req, res);
      default:
        return invalidMethod();
    }
  }
);

const getUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    throw new AppError(401, "Error de autenticación");
  }

  const user = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      description: true,
      role: true,
      type: true,
    },
  });

  const orders = await prisma.order.count({
    where: { user: session.user.id },
  });

  if (!user) {
    return res.status(400).json({ message: "Usuario no encontrado" });
  }

  return res.status(200).json({ user, orders });
};

const createUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await yupRegister.validate(req.body);
  const { name, email, password } = req.body;

  const user = await prisma.user.findFirst({ where: { email } });

  if (user) {
    throw new AppError(400, "Ese correo ya está en uso");
  }

  const hashedPassword = bcrypt.hashSync(password);

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "client",
      type: "credentials",
    },
  });

  res.status(201).json({
    id: newUser.id,
    name,
    email,
  });
};

const updateUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const session: any = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    throw new AppError(401, "Error de autenticación");
  }

  await yupUser.validate(req.body);

  const { description, password } = req.body;

  let toUpdate: any = { description };

  if (password) {
    toUpdate = { ...toUpdate, password: bcrypt.hashSync(password) };
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { ...toUpdate },
  });

  return res.status(200).json({ message: "Usuario Actualizado" });
};
