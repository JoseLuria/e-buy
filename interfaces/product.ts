import { Product } from "@prisma/client";

export type CreateProductType = Omit<Product, "id">;
