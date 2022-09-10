import { FC } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  title: string;
  name: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

export const TextArea: FC<Props> = ({
  title,
  name,
  placeholder,
  register,
  error,
}) => {
  return (
    <span className="flex flex-col">
      <label
        className={`mb-2 flex justify-between text-sm font-bold ${
          error && "text-red"
        }`}
        htmlFor={name}
      >
        {title}
        <span className="font-medium">{error && error.message}</span>
      </label>
      <textarea
        {...register(name)}
        className={`border-2 p-4 h-[160px] resize-none ${
          error
            ? "border-red focus:border-red"
            : "border-low-gray focus:border-black"
        }`}
        id={name}
        placeholder={placeholder}
      ></textarea>
    </span>
  );
};
