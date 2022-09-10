import {
  MenIcon,
  WomenIcon,
  KidsIcon,
  UserIcon,
  OrderIcon,
  AuthIcon,
  AuthUserIcon,
  AuthProductIcon,
} from "@/icons";

export const navRoutes = {
  products: [
    {
      title: "Hombres",
      href: "/category/men",
      icon: MenIcon,
    },
    {
      title: "Mujeres",
      href: "/category/women",
      icon: WomenIcon,
    },
    {
      title: "Niños",
      href: "/category/kid",
      icon: KidsIcon,
    },
  ],
  admin: [
    {
      title: "Panel",
      href: "/admin",
      icon: AuthIcon,
    },
    {
      title: "Usuarios",
      href: "/admin/user",
      icon: AuthUserIcon,
    },
    {
      title: "Ordenes",
      href: "/admin/order",
      icon: OrderIcon,
    },
    {
      title: "Productos",
      href: "/admin/product",
      icon: AuthProductIcon,
    },
  ],
  user: [
    {
      title: "Perfil",
      href: "/user",
      icon: UserIcon,
    },
    {
      title: "Mis ordenes",
      href: "/user/order",
      icon: OrderIcon,
    },
  ],
};
