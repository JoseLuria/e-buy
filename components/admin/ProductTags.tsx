import { FC } from "react";
import { Text } from "@/components";

interface Props {
  action: (tag: string) => void;
  tags: string[];
}

export const ProductTags: FC<Props> = ({ tags, action }) => {
  return (
    <>
      <p className="text-sm font-bold">Presiona [Space] para agregar</p>
      <div className="py-3 flex gap-4 flex-wrap">
        {tags.length > 0 ? (
          tags.map((tag, index) => (
            <p
              onClick={() => action(tag)}
              className="py-1 px-6 uppercase font-bold cursor-pointer bg-gray hover:bg-red hover:text-white"
              key={index}
            >
              {tag}
            </p>
          ))
        ) : (
          <Text className="mx-auto">No hay etiquetas</Text>
        )}
      </div>
    </>
  );
};
