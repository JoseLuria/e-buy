import { FC } from "react";
import Image from "next/image";
import { Text } from "@/components";

interface Props {
  images: string[];
  onDelete: (image: string) => void;
}

export const ProductImages: FC<Props> = ({ images, onDelete }) => {
  return (
    <div className="flex gap-4 flex-wrap items-center">
      {images.length === 0 && <Text className="mx-auto">No hay imagenes</Text>}
      {images.map((image, index) => (
        <div className="flex flex-col border-2 border-low-gray" key={index}>
          <span className="flex">
            <Image width={150} height={150} src={image} alt="Product Image" />
          </span>
          <span
            onClick={() => onDelete(image)}
            className="w-full bg-red p-2 text-center cursor-pointer text-xs text-white font-bold uppercase"
          >
            Eliminar
          </span>
        </div>
      ))}
    </div>
  );
};
