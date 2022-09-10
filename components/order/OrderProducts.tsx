import { FC } from "react";
import { Text, Link } from "@/components";
import { format } from "@/utils";

interface Props {
  editable?: boolean;
  cartProducts: number;
  subTotal: number;
  tax: number;
  grandTotal: number;
}

export const OrderProducts: FC<Props> = ({
  editable,
  cartProducts,
  subTotal,
  tax,
  grandTotal,
}) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Text tag="h2">Productos</Text>
        {editable && (
          <Link
            className="text-black text-opacity-60 underline uppercase"
            href="/cart"
          >
            Editar
          </Link>
        )}
      </div>
      <span className="flex justify-between">
        <Text>No. Productos</Text>
        <Text>
          {cartProducts} {cartProducts <= 1 ? "Producto" : "Productos"}
        </Text>
      </span>
      <span className="flex justify-between">
        <Text>Subtotal</Text>
        <Text>{format(subTotal)} </Text>
      </span>
      <span className="flex justify-between">
        <Text>Impuestos (%15)</Text>
        <Text>{format(tax)} </Text>
      </span>

      <span className="flex justify-between font-bold uppercase text-[22px] md:text-2xl">
        <p>Total</p>
        <p>{format(grandTotal)}</p>
      </span>
    </section>
  );
};
