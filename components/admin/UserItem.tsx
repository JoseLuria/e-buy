import { FC } from "react";
import { User } from "@prisma/client";

type typeProps = Pick<User, "id" | "name" | "email" | "role">;

interface Props extends typeProps {
  action: (userId: string, role: string) => Promise<void>;
}

export const UserItem: FC<Props> = ({ id, name, email, role, action }) => {
  const newRole = role === "admin" ? "client" : "admin";

  return (
    <div className="p-4 w-full border-2 border-low-gray flex flex-col gap-1">
      <p className="text-sm font-bold">
        <span className="uppercase">Id:</span> {id}
      </p>
      <p className="text-sm font-bold">
        <span className="uppercase">Nombre:</span> {name}
      </p>
      <p className="text-sm font-bold">
        <span className="uppercase">Correo:</span> {email}
      </p>
      <div className="flex justify-between">
        <p className="text-sm font-bold">
          <span className="uppercase">Rol:</span>
          <span className={`${role === "admin" ? "text-red" : "text-green"}`}>
            {" "}
            {role === "admin" ? "Administrador" : "Cliente"}
          </span>
        </p>
        <button
          onClick={() => action(id, newRole)}
          className={`${
            role === "admin" ? "text-green" : "text-red"
          } w-fit text-sm uppercase underline`}
        >
          Cambiar a {role === "admin" ? "client" : "admin"}
        </button>
      </div>
    </div>
  );
};
