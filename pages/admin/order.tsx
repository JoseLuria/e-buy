import { NextPage } from "next";
import { Layout, OrderItem, Text, Loader } from "@/components";
import { useApi } from "@/hooks";
import { Order } from "@prisma/client";

const AdminOrders: NextPage = () => {
  const { data, isLoading, error } = useApi<Order[]>("admin/order");

  return (
    <Layout title="Mantenimiento de ordenes">
      <Loader loading={isLoading} error={error} />
      {data && (
        <main className="pt-6 md:pt-12">
          <Text className="mb-6 md:mb-12" tag="h1">
            Mantenimiento de ordenes
          </Text>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
            {data.map(({ id, isPaid, address }) => (
              <OrderItem
                key={id}
                id={id}
                isPaid={isPaid}
                userName={address.name}
                admin
              />
            ))}
          </div>
        </main>
      )}
    </Layout>
  );
};

export default AdminOrders;
