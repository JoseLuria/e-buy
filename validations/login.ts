import { object, string } from "yup";

export const yupLogin = object({
  email: string().required("Campo requerido").email("Formato incorrecto"),
  password: string().required("Campo requerido").min(6, "Mínimo 6 caracteres"),
});
