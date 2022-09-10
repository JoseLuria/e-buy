import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout, Button, Input, Form, CountriesList } from "@/components";
import { yupAddress } from "@/validations";
import { setAddress, useDispatch } from "@/toolkit";
import { Address } from "@prisma/client";

const title = "Dirección";

interface Props {
  address: Address;
}

const Address: NextPage<Props> = ({ address }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Address>({
    resolver: yupResolver(yupAddress),
    defaultValues: address ? address : undefined,
  });
  const router = useRouter();
  const dispatch = useDispatch();

  const handleAddress = (data: Address) => {
    dispatch(setAddress(data));
    router.push("/checkout/summary");
  };

  return (
    <Layout title={title}>
      <Form submit={handleSubmit(handleAddress)} title={title} big>
        <Input
          register={register}
          title="Nombre completo"
          name="name"
          type="text"
          placeholder="Alexei Ward"
          error={errors.name}
        />
        <Input
          register={register}
          title="Dirección"
          name="address"
          type="text"
          placeholder="1137 Williams Avenue"
          error={errors.address}
        />
        <Input
          register={register}
          title="Dirección 2 (Opcional)"
          name="addressTwo"
          type="text"
          placeholder="1137 Williams Avenue"
          error={errors.addressTwo}
          optional
        />
        <span className="grid grid-cols-2 gap-4">
          <Input
            register={register}
            title="Código Postal"
            name="zip"
            type="text"
            placeholder="10001"
            error={errors.zip}
          />
          <Input
            register={register}
            title="Teléfono"
            name="phone"
            type="text"
            placeholder="238521993"
            error={errors.phone}
          />
        </span>

        <CountriesList setValue={setValue} register={register} name="country" />

        <Input
          register={register}
          title="Ciudad"
          name="city"
          type="text"
          placeholder="Nueva York"
          error={errors.city}
        />
        <Button full>Revisar pedido</Button>
      </Form>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { address } = req.cookies;

  if (!address) {
    return {
      props: {
        address: null,
      },
    };
  }

  return {
    props: {
      address: JSON.parse(address),
    },
  };
};

export default Address;
