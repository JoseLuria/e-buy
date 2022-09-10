import { Text, Button } from "@/components";
import { format } from "@/utils";
import { useSelector, getCartState } from "@/toolkit";

export const CartCheckout = () => {
  const { cartProducts, subTotal, tax, grandTotal } = useSelector(getCartState);

  return (
    <div className="flex flex-col gap-4">
      <Text tag="h1">Orden</Text>
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
      <Button href="/checkout/address" link full>
        Dirección
      </Button>
    </div>
  );
};
