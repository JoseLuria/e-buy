import { object, string, array } from "yup";

export const yupCreateProduct = object({
  title: string().required("Campo requerido").min(4, "Mínimo 4 caracteres"),
  slug: string().required("Campo requerido").min(4, "Mínimo 4 caracteres"),
  description: string()
    .required("Campo requerido")
    .min(10, "Mínimo 10 caracteres"),
  inStock: string()
    .required("Campo requerido")
    .matches(/^[0-9]+$/, "Solo se permiten números"),
  price: string()
    .required("Campo requerido")
    .matches(/^[0-9]+$/, "Solo se permiten números"),
  type: string().required("Campo requerido"),
  gender: string().required("Campo requerido"),
  sizes: array()
    .of(string())
    .required("Campo requerido")
    .min(1, "No puede estar vacio"),
  tags: array()
    .of(string())
    .required("Campo requerido")
    .min(1, "No puede estar vacio"),
  images: array()
    .of(string())
    .required("Campo requerido")
    .min(2, "Es necesario 2 imágenes"),
});
