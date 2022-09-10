import { object, string } from "yup";

export const yupUser = object().shape(
  {
    description: string()
      .min(10, "Mínimo 10 caracteres")
      .max(180, "Máximo 180 caracteres"),
    password: string()
      .nullable()
      .notRequired()
      .when("password", {
        is: (value: any) => value?.length,
        then: (rule: any) => rule.min(6, "Mínimo 6 caracteres"),
      }),
  },
  [["password", "password"]]
);
