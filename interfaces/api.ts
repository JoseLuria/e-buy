import { User, Product } from "@prisma/client";

export interface ApiMessage {
  message: string;
}

export type ApiCreateUser = Pick<User, "id" | "name" | "email">;

export interface ApiUser {
  user: Omit<User, "password">;
  orders: number;
}

export interface ApiSeach {
  products: Product[];
  foundProducts: boolean;
  query: string;
}

export interface ApiAdmin {
  numberOfOrders: number;
  paidOrders: number;
  notPaidOrders: number;
  numberOfClients: number;
  numberOfProducts: number;
  productsWithNoInventory: number;
  lowInventory: number;
}
