import { ChangeEvent, FC } from "react";
import { FieldError } from "react-hook-form";

interface Props {
  error?: FieldError | any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
export const InputImage: FC<Props> = ({ error, onChange }) => {
  return (
    <>
      <div>
        <p
          className={`mb-2 flex justify-between text-sm font-bold ${
            error && "text-red"
          }`}
        >
          Imágenes
          <span className="font-medium">{error && error.message}</span>
        </p>
        <span className="flex flex-wrap border-2 min-h-[60px] items-center p-4 gap-4 border-low-gray">
          <label
            className="cursor-pointer bg-black font-bold text-white uppercase text-sm px-4 py-2 duration-200 hover:bg-opacity-70 focus-visible:bg-opacity-70"
            htmlFor="images"
          >
            Elegir un archivo
          </label>
          <p className="text-[#9FA6B1]">Subir una imagen</p>
        </span>
      </div>
      <input
        className="hidden"
        id="images"
        type="file"
        // multiple
        accept="image/png, image/gif, image/jpeg"
        onChange={onChange}
      />
    </>
  );
};
