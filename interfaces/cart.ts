import { Product } from "@prisma/client";

type CartProductType = Pick<
  Product,
  "id" | "title" | "slug" | "price" | "gender" | "inStock"
>;

export interface CartProductInterface extends CartProductType {
  image: string;
  size: string;
  quantity: number;
}
