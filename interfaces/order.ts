import { Order } from "@prisma/client";

export type CreateOrderType = Omit<Order, "id" | "paidAt" | "transactionId">;
