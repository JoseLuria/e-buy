import { prisma } from "@/prisma";
import { compareSync } from "bcryptjs";

export const checkUserData = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return null;
  }

  if (!compareSync(password, user.password!)) {
    return null;
  }

  const { id, name, role, image, description, type } = user;

  return {
    id,
    name,
    email,
    role,
    image,
    description,
    type,
  };
};

export const oAuthUser = async (
  email: string,
  name: string,
  image?: string
) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (user) {
    const { id, name, image, role } = user;
    return { id, name, email, image, role };
  }

  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: "@",
      image,
      role: "client",
      type: "oauth",
    },
  });

  const { id, role, description } = newUser;

  return {
    id,
    name,
    email,
    image,
    role,
    description,
  };
};
