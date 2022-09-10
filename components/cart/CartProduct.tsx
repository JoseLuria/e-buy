import { FC } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { CartProductQuantity, Link } from "@/components";
import { CartProductInterface } from "@/interfaces";
import { format } from "@/utils";
import { useDispatch, removeFromCart, changeQuantity } from "@/toolkit";

type CartProductType = Omit<CartProductInterface, "inStock">;

interface Props extends CartProductType {
  editable?: boolean;
  inStock?: number;
}

export const CartProduct: FC<Props> = ({
  image,
  price,
  quantity,
  size,
  slug,
  title,
  editable,
  inStock,
}) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    const productToRemove = { size, slug };
    dispatch(removeFromCart(productToRemove));
    toast.error("Producto removido");
  };

  const handleChangeQuantity = (value: number) => {
    const newQuantity = Math.max(quantity + value, 1);
    if (inStock && newQuantity > inStock) return;
    dispatch(changeQuantity({ slug, size, quantity: newQuantity }));
  };

  return (
    <div className="border-2 border-low-gray flex" key={slug}>
      <Link className="flex" href={`/product/${slug}`}>
        <Image width={120} height={120} src={image} alt={title} />
      </Link>
      <div className="w-[calc(100%-120px)] p-3 flex flex-col">
        <p className="text-base font-bold line-clamp-1 uppercase">{title}</p>
        <div className="w-full flex text-sm justify-between my-auto">
          <p className="font-medium">
            <span className="text-black text-opacity-60">Talla: </span>
            {size}
          </p>
          <p className="font-bold">{format(price)}</p>
        </div>
        <div className="flex justify-between">
          {inStock && !editable ? (
            <>
              <CartProductQuantity
                changeQuantity={handleChangeQuantity}
                quantity={quantity}
              />
              <button
                onClick={handleRemoveFromCart}
                className="bg-black text-white h-6 px-3 text-xs font-bold uppercase"
              >
                Remover
              </button>
            </>
          ) : (
            <>
              <p className="text-sm">Cantidad:</p>
              <p className="text-sm font-bold">
                {quantity} {quantity > 1 ? "Productos" : "Producto"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
