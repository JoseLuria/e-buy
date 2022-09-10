import { FC } from "react";
import { DbErrorIcon } from "@/icons";
import { Text } from "@/components";

interface Props {
  loading: boolean;
  error?: any;
}

export const Loader: FC<Props> = ({ loading, error }) => {
  return (
    <>
      {(loading || error) && (
        <main className="mt-[150px] mx-auto flex flex-col gap-5 items-center text-center w-full max-w-[320px]">
          {error ? (
            <DbErrorIcon width={80} height={80} />
          ) : (
            <div className="w-20 h-20 border-black border-[10px] border-b-neutral-500 animate-spin rounded-full"></div>
          )}
          <Text tag="h2">{error ? "Error" : "Cargando"}</Text>
          <Text>
            {error
              ? "Sucedió un error al momento de cargar el contenido."
              : "Estamos cargando el contenido"}
          </Text>
        </main>
      )}
    </>
  );
};
