import { useState, useRef, useEffect, KeyboardEvent, FC } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { motion } from "framer-motion";
import { countries } from "@/data";
import { useSelector, getAuthState } from "@/toolkit";
import { ArrowDownIcon } from "@/icons";

interface Props {
  name: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
}

export const CountriesList: FC<Props> = ({ name, register, setValue }) => {
  const [showList, setShowList] = useState(false);
  const [country, setCountry] = useState(countries[0].name);
  const ref = useRef<HTMLSpanElement>(null);
  const { address } = useSelector(getAuthState);

  const handleSetCountry = (name: string) => {
    setCountry(name);
    setValue("country", name);
    setShowList(false);
  };

  const handleKeyOpen = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      setShowList(!showList);
    }
  };

  const handleClickOutside = (e: globalThis.MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as any)) {
      setShowList(false);
    }
  };

  const handleKeyboardCountry = (
    e: KeyboardEvent<HTMLElement>,
    name: string
  ) => {
    if (e.key === "Enter") {
      setCountry(name);
      setValue("country", name);
      setShowList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    if (address && address.country) {
      setCountry(address.country);
    }
  }, [address]);

  return (
    <span ref={ref} className="flex flex-col">
      <label className="mb-2 text-sm font-bold" htmlFor={name}>
        País
      </label>

      <input
        {...register(name)}
        id={name}
        className="hidden"
        type="text"
        value={country}
        readOnly
      />

      <div
        tabIndex={0}
        onClick={() => setShowList(!showList)}
        onKeyDown={handleKeyOpen}
        className="w-full p-4 text-left relative select-none cursor-pointer bg-low-gray hover:bg-gray focus:bg-gray"
      >
        {country}
        <span className="absolute right-4 flex top-[50%] translate-y-[-50%]">
          <motion.span
            className="flex"
            initial={{ rotate: 180 }}
            animate={{ rotate: showList ? 0 : 180 }}
            transition={{ type: "keyframes" }}
          >
            <ArrowDownIcon />
          </motion.span>
        </span>
      </div>

      {showList && (
        <ul className="w-full no-scroll-bar h-[180px] overflow-auto mt-2 bg-low-gray">
          {countries.map(({ name }) => (
            <li
              onClick={() => handleSetCountry(name)}
              onKeyDown={(e) => handleKeyboardCountry(e, name)}
              tabIndex={0}
              className="h-[60px] px-4 flex items-center cursor-pointer font-medium hover:bg-gray focus:bg-gray"
              key={name}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </span>
  );
};
