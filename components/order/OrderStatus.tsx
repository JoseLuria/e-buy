import { FC } from "react";
import { PayIcon, NotPayIcon } from "@/icons";

interface Props {
  status: boolean;
}

export const OrderStatus: FC<Props> = ({ status }) => {
  return (
    <div className="flex gap-2 items-center">
      {status ? (
        <PayIcon width={24} height={24} />
      ) : (
        <NotPayIcon width={24} height={24} />
      )}
      <p
        className={`font-bold uppercase ${status ? "text-green" : "text-red"}`}
      >
        {status ? "Orden pagada" : "Orden por pagar"}
      </p>
    </div>
  );
};
