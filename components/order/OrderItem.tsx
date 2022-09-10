import { FC, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { OrderStatus, Link } from "@/components";

interface Props {
  id: string;
  userName: string;
  isPaid: boolean;
  admin?: boolean;
}

export const OrderItem: FC<Props> = ({ id, isPaid, userName, admin }) => {
  const [deleting, setDeteling] = useState(false);
  const router = useRouter();

  const handleDeleteOrder = async () => {
    setDeteling(true);
    await axios.delete(`/api/order/${id}`);
    router.reload();
  };

  return (
    <div className="p-4 w-full border-2 border-low-gray flex flex-col gap-1">
      <OrderStatus status={isPaid} />
      <p className="text-sm font-bold">
        <span className="uppercase">Id:</span> {id}
      </p>
      <p className="text-sm font-bold">
        <span className="uppercase">Nombre:</span> {userName}
      </p>
      <div className="flex justify-between">
        <Link
          className="text-black text-opacity-60 w-fit text-sm uppercase underline"
          href={`/order/${id}`}
        >
          Ver orden
        </Link>
        {!isPaid && !deleting && !admin && (
          <button
            onClick={handleDeleteOrder}
            className="text-red w-fit text-sm uppercase underline"
          >
            Eliminar orden
          </button>
        )}
      </div>
    </div>
  );
};
