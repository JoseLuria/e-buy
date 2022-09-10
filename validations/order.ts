import { object, number, string, boolean, array } from "yup";
import { yupAddress } from "@/validations";

const yupOrderItems = object({
  id: string().required(),
  slug: string().required(),
  title: string().required(),
  size: string().required(),
  quantity: number().required(),
  image: string().required(),
  price: number().required(),
  gender: string().required(),
});

export const yupOrder = object({
  user: string().required(),
  orderItems: array().of(yupOrderItems).required().min(1),
  address: yupAddress.required(),
  numberOfItems: number().required(),
  subTotal: number().required(),
  tax: number().required(),
  grandTotal: number().required(),
  isPaid: boolean().required(),
});
