import { FC, HTMLInputTypeAttribute, KeyboardEvent } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface Props {
  title: string;
  name: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  register?: UseFormRegister<any>;
  error?: FieldError | any;
  optional?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({
  title,
  name,
  placeholder,
  type,
  register,
  error,
  onKeyDown,
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
      {register ? (
        <input
          onKeyDown={onKeyDown}
          {...register(name)}
          className={`border-2 p-4 ${
            error
              ? "border-red focus:border-red"
              : "border-low-gray focus:border-black"
          }`}
          id={name}
          type={type}
          placeholder={placeholder}
        />
      ) : (
        <input
          onKeyDown={onKeyDown}
          className={`border-2 p-4 ${
            error
              ? "border-red focus:border-red"
              : "border-low-gray focus:border-black"
          }`}
          id={name}
          type={type}
          placeholder={placeholder}
        />
      )}
    </span>
  );
};
