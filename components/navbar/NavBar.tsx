import { useState, useEffect } from "react";
import { Link, SideBar } from "@/components";
import { Logo, CartIcon, MenuIcon, SearchIcon } from "@/icons";
import { navRoutes } from "@/data";

export const NavBar = () => {
  const [sideBar, setSideBar] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);

  useEffect(() => {
    if (sideBar) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [sideBar]);

  const handleSearch = () => {
    setSideBar(true);
    setAutoFocus(true);
  };

  const handleOpenSideBar = () => setSideBar(true);

  const handleCloseSideBar = () => {
    setSideBar(false);
    setAutoFocus(false);
  };

  return (
    <>
      <nav className="h-[90px] z-[1] flex justify-center bg-white w-full fixed top-0 left-0 px-6 md:px-12">
        <div className="w-full h-full relative border-b-2 border-low-gray flex items-center justify-between max-w-container">
          <Link href="/" className="flex">
            <Logo />
          </Link>

          <ul className="hidden absolute left-[50%] translate-x-[-50%] gap-4 md:flex">
            {navRoutes.products.map(({ title, href }, index) => (
              <Link
                key={index}
                href={href}
                className="font-medium text-sm hover:underline focus-visible:underline"
              >
                {title}
              </Link>
            ))}
          </ul>

          <div className="flex gap-4">
            <button onClick={handleSearch} className="flex">
              <SearchIcon />
            </button>
            <Link href="/cart" className="flex">
              <CartIcon width={24} height={24} />
            </Link>
            <button onClick={handleOpenSideBar} className="flex">
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {sideBar && <SideBar autoFocus={autoFocus} exit={handleCloseSideBar} />}
    </>
  );
};
