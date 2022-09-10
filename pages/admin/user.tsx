import { NextPage } from "next";
import axios from "axios";
import { useRouter } from "next/router";
import { Layout, Text, Loader, UserItem } from "@/components";
import { useApi } from "@/hooks";
import { User } from "@prisma/client";

const AdminUsers: NextPage = () => {
  const { isLoading, data, error } = useApi<User[]>("admin/user");
  const router = useRouter();

  const handleUpdateUser = async (userId: string, role: string) => {
    await axios.put("/api/admin/user", { userId, role });
    router.reload();
  };

  return (
    <Layout title="Mantenimiento de usuarios">
      <Loader loading={isLoading} error={error} />
      {data && (
        <main className="pt-6 md:pt-12">
          <Text className="mb-6 md:mb-12" tag="h1">
            Mantenimiento de usuarios
          </Text>
          <div className="flex flex-col gap-6 md:grid md:grid-cols-2">
            {data.map((props) => (
              <UserItem key={props.id} action={handleUpdateUser} {...props} />
            ))}
          </div>
        </main>
      )}
    </Layout>
  );
};

export default AdminUsers;
