import { FC } from "react";

interface Props {
  error?: boolean;
  title: string;
  tag?: "p" | "label";
  htmlFor?: string;
  errorMessage?: string;
}

export const Label: FC<Props> = ({
  error,
  title,
  tag = "label",
  htmlFor,
  errorMessage,
}) => {
  switch (tag) {
    case "p":
      return (
        <p
          className={`mb-2 flex justify-between text-sm font-bold ${
            error && "text-red"
          }`}
        >
          {title}
          {error && (
            <span className="font-medium">
              {errorMessage ? errorMessage : "No puede estar vacío"}
            </span>
          )}
        </p>
      );
    default:
      return (
        <label
          className={`mb-2 flex justify-between text-sm font-bold ${
            error && "text-red"
          }`}
          htmlFor={htmlFor}
        >
          {title}
          <span className="font-medium">{error && "No puede estar vacío"}</span>
        </label>
      );
  }
};
