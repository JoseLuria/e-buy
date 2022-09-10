import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { User } from "@prisma/client";
import { Layout, Button, Input, Link, Form } from "@/components";
import { yupRegister } from "@/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { showToastError } from "@/utils";

const title = "Crear cuenta";
type registerForm = Pick<User, "email" | "password" | "name">;

const Register: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<registerForm>({ resolver: yupResolver(yupRegister) });
  const router = useRouter();

  const handleRegister = async ({ email, name, password }: registerForm) => {
    try {
      await axios.post("/api/user", {
        email,
        name,
        password,
      });
      await signIn("credentials", {
        email,
        password,
      });
    } catch (error) {
      showToastError(error);
    }
  };

  return (
    <Layout title={title}>
      <Form submit={handleSubmit(handleRegister)} title={title}>
        <Input
          title="Nombre de usuario"
          name="name"
          placeholder="Alexei Ward"
          register={register}
          error={errors.name}
        />
        <Input
          title="Correo electrónico"
          name="email"
          placeholder="alexei@mail.com"
          register={register}
          error={errors.email}
        />
        <Input
          title="Contraseña"
          name="password"
          type="password"
          placeholder="*********"
          register={register}
          error={errors.password}
        />
        <Button full>Ingresar</Button>
        <Link
          className="text-sm underline ml-auto"
          href={
            router.query.page
              ? `/auth/login?page=${router.query.page.toString()}`
              : "/auth/login"
          }
        >
          ¿Ya tienes cuenta?
        </Link>
      </Form>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  const { page = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: page.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Register;
