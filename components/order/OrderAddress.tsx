import { FC } from "react";
import { Text, Link } from "@/components";
import { Address } from "@prisma/client";

interface Props {
  address: Address;
  editable?: boolean;
}

export const OrderAddress: FC<Props> = ({ address, editable }) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Text className="line-clamp-1" tag="h2">
          Dirección de entrega
        </Text>
        {editable && (
          <Link
            className="text-black text-opacity-60 underline uppercase"
            href="/checkout/address"
          >
            Editar
          </Link>
        )}
      </div>
      <Text>{address.name}</Text>
      <Text>{address.address}</Text>
      {address.addressTwo && <Text>{address.addressTwo}</Text>}
      <Text>
        {address.city}, {address.zip}
      </Text>
      <Text>
        {address.country}, {address.phone}
      </Text>
    </section>
  );
};
