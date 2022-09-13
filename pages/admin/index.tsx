import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layout, AdminCard } from "@/components";
import { Text, Loader } from "@/components";
import { useApi } from "@/hooks";
import { ApiAdmin } from "@/interfaces";
import {
  PayIcon,
  NotPayIcon,
  MoneyIcon,
  UserIcon,
  AuthProductIcon,
  CartIcon,
  NoItemsIcons,
  ClockIcon,
} from "@/icons";

const title = "Panel de administrador";

const Admin: NextPage = () => {
  const [refreshIn, setRefreshIn] = useState(30);
  const { data, isLoading, error } = useApi<ApiAdmin>("admin/dashboard", {
    refreshInterval: 30 * 1000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout title={title}>
      <Loader loading={isLoading} error={error} />
      {data && (
        <main className="pt-6 md:pt-12">
          <Text className="mb-6 w-full line-clamp-2 md:mb-12" tag="h1">
            {title}
          </Text>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            <AdminCard
              title="Órdenes totales"
              icon={PayIcon}
              quantity={data.numberOfOrders}
            />
            <AdminCard
              title="Clientes"
              className="stroke-blue-900"
              icon={UserIcon}
              quantity={data.numberOfClients}
            />
            <AdminCard
              title="Órdenes pendientes"
              icon={NotPayIcon}
              quantity={data.notPaidOrders}
            />
            <AdminCard
              title="Órdenes pagadas"
              className="stroke-green"
              icon={MoneyIcon}
              quantity={data.paidOrders}
            />
            <AdminCard
              title="Productos"
              icon={AuthProductIcon}
              quantity={data.numberOfProducts}
            />
            <AdminCard
              title="Sin existencias"
              className="stroke-red"
              icon={NoItemsIcons}
              quantity={data.productsWithNoInventory}
            />
            <AdminCard
              title="Actualización en:"
              className="stroke-blue-900"
              icon={ClockIcon}
              quantity={refreshIn}
            />
            <AdminCard
              title="Poco inventario"
              icon={CartIcon}
              quantity={data.lowInventory}
            />
          </div>
        </main>
      )}
    </Layout>
  );
};

export default Admin;
