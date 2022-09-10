import { FC } from "react";
import { UseFormRegister, FieldError } from "react-hook-form";
import { ProductGender, ProductTypes, ProductSizes } from "@prisma/client";

interface Props {
  title: string;
  name: string;
  register: UseFormRegister<any>;
  elements: ProductGender[] | ProductTypes[] | ProductSizes[];
  error?: FieldError | any;
}

export const InputRadio: FC<Props> = ({
  title,
  name,
  register,
  elements,
  error,
}) => {
  return (
    <div>
      <label
        className={`mb-2 flex justify-between text-sm font-bold ${
          error && "text-red"
        }`}
        htmlFor={name}
      >
        {title}
        <span className="font-medium">{error && error.message}</span>
      </label>
      <div className="flex gap-4 flex-wrap">
        {elements.map((value, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              {...register(name)}
              className="w-5 h-5 rounded-full appearance-none border-[1px] border-gray flex checked:before:w-[0.625rem] checked:before:h-[0.625rem] checked:before:bg-black checked:before:rounded-full checked:before:m-auto"
              type="radio"
              id={name}
              value={value}
            />
            <p className="uppercase font-bold text-sm">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
