import { FC, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import Cookie from "js-cookie";
import { SideBartList, SideBarItem } from "@/components";
import { sideBarVariants, modalVariants } from "@/animations";
import { LoginIcon, LogoutIcon, SearchIcon } from "@/icons";
import { navRoutes } from "@/data";
import { useSelector, getAuthState, useDispatch, logout } from "@/toolkit";

interface Props {
  exit: () => void;
  autoFocus?: boolean;
}

interface SearchForm extends HTMLFormElement {
  search: HTMLInputElement;
}

export const SideBar: FC<Props> = ({ exit, autoFocus }) => {
  const { isLoggedIn, user } = useSelector(getAuthState);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearchTerm = (e: ChangeEvent<SearchForm>) => {
    e.preventDefault();
    if (e.target.search.value.trim().length === 0) return;
    const searchTerm = e.target.search.value.trim();
    exit();
    router.push(`/search/${searchTerm}`);
  };

  const handleRedirect = (url: string) => {
    router.push(url);
    exit();
  };

  const handleLogOut = () => {
    signOut();
    dispatch(logout());
    localStorage.removeItem("address");
    Cookie.remove("address");
  };

  return (
    <motion.div
      variants={modalVariants}
      initial="initial"
      animate="animate"
      onClick={exit}
      className="w-full z-[3] h-full fixed top-0 left-0 bg-dark bg-opacity-60 flex"
    >
      <motion.div
        variants={sideBarVariants}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-[70%] max-w-[350px] bg-white ml-auto px-6 py-8 md:py-16 md:px-12"
      >
        <form
          onSubmit={handleSearchTerm}
          className="mb-8 gap-1 border-black border-b-[1px]"
        >
          <div className="mb-1 flex w-full">
            <input
              name="search"
              placeholder="Buscar..."
              className="grow"
              type="text"
              autoFocus={autoFocus}
            />
            <button className="flex" type="submit">
              <SearchIcon />
            </button>
          </div>
        </form>
        <SideBartList action={exit} list={navRoutes.products} separator />
        {user && user.role === "admin" && (
          <SideBartList action={exit} list={navRoutes.admin} separator />
        )}
        {isLoggedIn ? (
          <SideBartList action={exit} list={navRoutes.user}>
            <button onClick={handleLogOut}>
              <SideBarItem title="Salir" icon={LogoutIcon} />
            </button>
          </SideBartList>
        ) : (
          <button
            onClick={() => handleRedirect(`/auth/login?page=${router.asPath}`)}
          >
            <SideBarItem title="Ingresar" icon={LoginIcon} />
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};
