import { FC, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeVariants } from "@/animations";
import { ArrowLeft, ArrowRight } from "@/icons";

interface Props {
  gallery: string[];
  title: string;
  inStock: number;
}

export const ProductGallery: FC<Props> = ({ gallery, title, inStock }) => {
  const [galleryIndex, setGalleryIndex] = useState(0);

  const lastIndex = gallery.length - 1;

  const handleNextImage = () => {
    setGalleryIndex((index) => (index === lastIndex ? 0 : index + 1));
  };

  const handleLastImage = () => {
    setGalleryIndex((index) => (index === 0 ? lastIndex : index - 1));
  };

  return (
    <div className="w-full flex relative">
      <motion.span
        key={galleryIndex}
        variants={fadeVariants}
        initial="initial"
        animate="animate"
      >
        <Image
          width={1024}
          height={1024}
          src={gallery[galleryIndex]}
          alt={title}
        />
      </motion.span>
      <span className="absolute flex justify-between w-full top-[50%] translate-y-[-50%] px-2 md:px-4">
        <button onClick={handleLastImage}>
          <ArrowLeft width={40} height={40} />
        </button>
        <button onClick={handleNextImage}>
          <ArrowRight width={40} height={40} />
        </button>
      </span>
      {inStock === 0 && (
        <span className="absolute w-full text-center bg-red uppercase text-white text-sm font-bold p-2 bottom-0 left-0">
          Producto agotado
        </span>
      )}
    </div>
  );
};
