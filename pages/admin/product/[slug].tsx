import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axios from "axios";
import {
  Layout,
  Form,
  Input,
  TextArea,
  Button,
  InputRadio,
  InputCheckBox,
  InputImage,
  ProductTags,
  ProductImages,
} from "@/components";
import { validGenders, validTypes, validSizes, defaultProduct } from "@/data";
import { ApiMessage, CreateProductType } from "@/interfaces";
import { yupCreateProduct } from "@/validations";
import { handleCreateSlug, filterProps, newProductProps } from "@/utils";
import { Product } from "@prisma/client";
import { prisma } from "@/prisma";

interface Props {
  product: Product | null;
}

const AdminProduct: NextPage<Props> = ({ product }) => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateProductType>({
    resolver: yupResolver(yupCreateProduct),
    defaultValues: product ? product : defaultProduct,
  });
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

  const handleUpdateProduct = async (newProduct: CreateProductType) => {
    if (!product) return;
    setIsPosting(true);
    try {
      const productData = filterProps(newProduct, ...newProductProps);
      const { data } = await axios.put<Product>(
        `/api/admin/product/${product.id}`,
        { ...productData }
      );
      if (product.slug === data.slug) {
        router.reload();
      } else {
        router.replace(`/admin/product/${data.slug}`);
        setIsPosting(false);
      }
    } catch (error: any) {
      setIsPosting(false);
      toast.error(error.response.data.message);
    }
  };

  const handleCreateProduct = async (newProduct: CreateProductType) => {
    setIsPosting(true);
    try {
      const { data } = await axios.post<Product>("/api/admin/product", {
        ...newProduct,
      });
      router.replace(`/admin/product/${data.slug}`);
      setIsPosting(false);
    } catch (error: any) {
      setIsPosting(false);
      toast.error(error.response.data.message);
    }
  };

  const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== "Space") return;
    const tags = getValues("tags");
    const newTag = e.currentTarget.value.trim().toLowerCase();
    if (newTag.length === 0) return;
    if (tags.includes(newTag)) return;
    setValue("tags", [...tags, newTag], { shouldValidate: true });
    e.currentTarget.value = "";
  };

  const handleRemoveTag = (tag: string) => {
    const tags = getValues("tags");
    const newTags = tags.filter((value) => value !== tag);
    setValue("tags", newTags, { shouldValidate: true });
  };

  const handleAddImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    try {
      for (const file of e.target.files) {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await axios.post<ApiMessage>(
          "/api/admin/upload",
          formData
        );
        setValue("images", [...getValues("images"), data.message], {
          shouldValidate: true,
        });
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteImage = async (image: string) => {
    if (image.startsWith("https")) {
      const imageId = image.substring(image.lastIndexOf("/") + 1).split(".")[0];
      await axios.delete(`/api/admin/delete/${imageId}`);
    }
    setValue(
      "images",
      getValues("images").filter((formImage) => formImage !== image),
      { shouldValidate: true }
    );
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const newSlug = handleCreateSlug(value.title || "");
        setValue("slug", newSlug, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue]);

  return (
    <Layout
      title={product ? product.title : "Crear un producto"}
      description={product ? product.description : undefined}
      otg={product ? `/products/${product.images[1]}` : undefined}
    >
      <main>
        <Form
          submit={handleSubmit(
            product ? handleUpdateProduct : handleCreateProduct
          )}
          title={
            product ? `Editando: ${product.title}` : "Creando: Producto nuevo"
          }
          big
        >
          <Input
            title="Título"
            register={register}
            name="title"
            placeholder="Título del producto"
            error={errors.title}
          />
          <Input
            title="Slug"
            register={register}
            name="slug"
            placeholder="Slug - URL del producto"
            error={errors.slug}
          />
          <TextArea
            title="Descripción"
            register={register}
            name="description"
            placeholder="Descripción del producto"
            error={errors.description}
          />
          <Input
            title="Inventario"
            register={register}
            name="inStock"
            placeholder="Número de elementos en inventario"
            error={errors.inStock}
          />
          <Input
            title="Precio"
            register={register}
            name="price"
            placeholder="Precio del producto"
            error={errors.price}
          />
          <InputRadio
            register={register}
            name="gender"
            title="Generos"
            elements={validGenders}
            error={errors.gender}
          />
          <InputRadio
            register={register}
            name="type"
            title="Tipo"
            elements={validTypes}
            error={errors.type}
          />
          <InputCheckBox
            register={register}
            name="sizes"
            title="Tamaños"
            elements={validSizes}
            error={errors.sizes}
          />
          <Input
            title="Etiquetas"
            name="tags"
            placeholder="Etiquetas del producto"
            onKeyDown={handleAddTag}
            error={errors.tags}
          />
          <ProductTags tags={getValues("tags")} action={handleRemoveTag} />
          <InputImage onChange={handleAddImage} error={errors.images} />
          <ProductImages
            onDelete={handleDeleteImage}
            images={getValues("images")}
          />
          <Button disabled={isPosting} full>
            {product ? "Actualizar producto" : "Crear producto"}
          </Button>
        </Form>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  if (slug === "new") {
    return {
      props: {
        product: null,
      },
    };
  }

  const product = await prisma.product.findFirst({ where: { slug } });

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default AdminProduct;
