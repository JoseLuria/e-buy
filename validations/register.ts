import { object, string } from "yup";

export const yupRegister = object({
  name: string().required("Campo requerido").min(2, "Mínimo 2 caracteres"),
  email: string().required("Campo requerido").email("Formato incorrecto"),
  password: string().required("Campo requerido").min(6, "Mínimo 6 caracteres"),
});
