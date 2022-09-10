import { hashSync } from "bcryptjs";
import { User } from "@prisma/client";

type UserSeed = Omit<User, "id" | "image" | "description">;

export const users: UserSeed[] = [
  {
    name: "John Doe",
    email: "john@gmail.com",
    password: hashSync("123456"),
    role: "admin",
    type: "credentials",
  },
  {
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: hashSync("123456"),
    role: "client",
    type: "credentials",
  },
];
