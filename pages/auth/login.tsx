import { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { signIn, getSession, getProviders } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { User } from "@prisma/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout, Button, Input, Link, Form } from "@/components";
import { GithubIcon } from "@/icons";
import { yupLogin } from "@/validations";

const title = "Iniciar Sesión";
type loginForm = Pick<User, "email" | "password">;

const Login: NextPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginForm>({ resolver: yupResolver(yupLogin) });
  const [providers, setProviders] = useState<any>({});
  const router = useRouter();

  const handleLogin = async (data: loginForm) => {
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (!response?.ok) {
      toast.error("Credenciales inválidas");
    } else {
      router.reload();
    }
  };

  useEffect(() => {
    getProviders().then((prov) => setProviders(prov));
  }, []);

  return (
    <Layout title={title}>
      <Form submit={handleSubmit(handleLogin)} title={title}>
        <Input
          register={register}
          title="Correo electrónico"
          name="email"
          placeholder="alexei@mail.com"
          error={errors.email}
        />
        <Input
          register={register}
          title="Contraseña"
          name="password"
          type="password"
          placeholder="*********"
          error={errors.password}
        />
        <Button full>Ingresar</Button>
        <Link
          className="text-sm underline ml-auto"
          href={
            router.query.page
              ? `/auth/register?page=${router.query.page.toString()}`
              : "/auth/register"
          }
        >
          ¿No tienes cuenta?
        </Link>
      </Form>
      <div className="w-full max-w-[500px] mx-auto">
        <hr className="my-6 border-gray" />
        <div className="flex flex-col gap-4">
          {Object.values(providers).map((provider: any) => {
            if (provider.id !== "credentials") {
              return (
                <Button
                  action={() => signIn(provider.id)}
                  key={provider.id}
                  className="gap-2"
                  full
                >
                  {provider.name}
                  <GithubIcon />
                </Button>
              );
            }
          })}
        </div>
      </div>
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

export default Login;
