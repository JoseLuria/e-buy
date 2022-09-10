import { ProductGender, ProductSizes, ProductTypes } from "@prisma/client";

export const validTypes: ProductTypes[] = [
  "shirts",
  "pants",
  "hoodies",
  "hats",
];
export const validGenders: ProductGender[] = ["unisex", "men", "women", "kid"];
export const validSizes: ProductSizes[] = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "XXXL",
];

export const categoryTexts = [
  {
    id: "men",
    title: "Hombres",
    text: "Productos para hombres",
  },
  {
    id: "women",
    title: "Mujeres",
    text: "Productos para mujeres",
  },
  {
    id: "kid",
    title: "Niños",
    text: "Productos para niños",
  },
];
