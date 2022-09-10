import { useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Layout,
  Text,
  MainGrid,
  Form,
  Input,
  TextArea,
  Button,
  Loader,
} from "@/components";
import { ApiUser } from "@/interfaces";
import { yupUser } from "@/validations";
import axios from "axios";
import { useApi } from "@/hooks";
import { User } from "@prisma/client";

type userForm = Pick<User, "description" | "password">;

const User: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<userForm>({ resolver: yupResolver(yupUser) });
  const router = useRouter();
  const { data, isLoading } = useApi<ApiUser>("user");

  useEffect(() => {
    if (data && data.user?.description) {
      setValue("description", data.user.description);
    }
  }, [data, setValue]);

  const handleUpdateUser = async ({ description, password }: userForm) => {
    const newPassword = password && password?.length > 1 ? password : undefined;
    await axios.put("/api/user", {
      description,
      password: newPassword,
    });
    router.reload();
  };

  return (
    <Layout title="Mi perfil">
      <Loader loading={isLoading} />
      {data && data.user && (
        <MainGrid>
          <div className="mx-auto w-full max-w-[400px] flex flex-col items-center gap-6">
            <div className="relative">
              {data.user.image ? (
                <span className="flex rounded-full">
                  <Image
                    className="rounded-full"
                    width={150}
                    height={150}
                    src={data.user.image}
                    alt="User"
                  />
                </span>
              ) : (
                <span className="flex bg-black rounded-full">
                  <Image
                    className="rounded-full"
                    width={150}
                    height={150}
                    src="/others/user-profile-icon.svg"
                    alt="User"
                  />
                </span>
              )}
            </div>
            <Text className="w-full text-center" tag="h1">
              {data.user.name}
            </Text>

            <div
              className={`px-4 py-2 text-white font-bold uppercase ${
                data.user.role === "admin" ? "bg-red" : "bg-green"
              }`}
            >
              <p>
                {data.user.role === "admin" ? "Administrador" : "Comprador"}
              </p>
            </div>

            <Text className="text-center">
              {data.user.description
                ? data.user.description
                : "Al parecer todavía no has agregado ninguna descripción"}
            </Text>
            <button
              onClick={() => router.push("/user/order")}
              className="p-4 bg-low-gray w-full flex uppercase font-bold justify-between items-center hover:bg-gray focus:bg-gray"
            >
              <p>Mis ordenes: </p>
              <p>{data.orders}</p>
            </button>
          </div>
          <Form submit={handleSubmit(handleUpdateUser)} noMargin>
            <Text className="mb-5 text-center" tag="h2">
              {"Actualiza tus datos de\nusuario"}
            </Text>
            <TextArea
              register={register}
              title="Descripción"
              name="description"
              placeholder="Agrega alguna descripción llamativa para tu perfil"
              error={errors.description}
            />
            {data.user.type === "credentials" && (
              <Input
                register={register}
                title="Contraseña"
                name="password"
                type="password"
                placeholder="*********"
                error={errors.password}
              />
            )}
            <Button full>Guardar cambios</Button>
          </Form>
        </MainGrid>
      )}
    </Layout>
  );
};

export default User;
