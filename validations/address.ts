import { object, string } from "yup";
import "yup-phone";

export const yupAddress = object().shape(
  {
    name: string().required("Campo requerido").min(2, "Mínimo 2 caracteres"),
    address: string().required("Campo requerido").min(4, "Mínimo 4 caracteres"),
    addressTwo: string()
      .nullable()
      .notRequired()
      .when("addressTwo", {
        is: (value: any) => value?.length,
        then: (rule: any) => rule.min(4, "Mínimo 4 caracteres"),
      }),
    zip: string()
      .required("Campo requerido")
      .matches(/^[0-9]+$/, "Solo se permiten números")
      .length(5, "Deben ser 5 caracteres"),
    phone: string().required("Campo requerido").phone("Formato incorrecto"),
    country: string(),
    city: string().required("Campo requerido").min(2, "Mínimo 2 caracteres"),
  },
  [["addressTwo", "addressTwo"]]
);
