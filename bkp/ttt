import { BiChat, BiLogOut, BiUser } from "react-icons/bi";
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillBookmarkHeartFill,
  BsJournalBookmarkFill,
  BsSearch,
} from "react-icons/bs";
import { HiMenuAlt1, HiMenuAlt3 } from "react-icons/hi";
import { MdDashboard, MdOutlineBuild, MdSchool } from "react-icons/md";
import type { ReactElement, ReactNode } from "react";

import { Avatar } from "../Avatar";
import Head from "next/head";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import React from "react";
import { VscFiles } from "react-icons/vsc";
import { cn } from "../../utils/cn";
import { useState } from "react";

export default function Layout({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}): JSX.Element {
  const [isActive, setIsActive] = useState(true);

  function changeStateBtn() {
    setIsActive(!isActive);
    console.log(isActive);
  }

  const menus = [
    { name: "Dashboard", Link: "/dashboard", icon: MdDashboard },
    { name: "TCC's Feitos", Link: "/", icon: MdSchool },
    { name: "Arquivos", Link: "/", icon: BsJournalBookmarkFill, margin: true },
    { name: "Midias", Link: "/", icon: VscFiles },
    { name: "Canais Discord", Link: "/", icon: BiUser, margin: true },
    { name: "Configuracao", Link: "/", icon: IoMdSettings },
  ];

  return (
    <section className={`flex `}>
      <aside
        className={`relative min-h-screen ${
          isActive ? "w-72" : "w-16"
        } duration-4000 rounded-md border-2 border-zinc-100
        border-opacity-5 bg-[#0e0e0e] bg-opacity-5 px-4
        text-gray-100 transition-all ease-in-out`}
      >
        <div className="duration-4000 flex justify-end py-3 transition-all ease-in-out">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setIsActive(!isActive)}
          />
        </div>
        <div className="relative mt-4 flex flex-col gap-4">
          {menus?.map((menu, i) => (
            <Link
              href={menu?.Link}
              key={i}
              className={`${
                menu?.margin && "mt-5"
              } group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
            >
              <div>{React.createElement(menu.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i * 0.05}s`,
                }}
                className={`whitespace-pre duration-500 ${
                  !isActive && "translate-x-28 overflow-hidden opacity-0"
                }`}
              >
                {menu?.name}
              </h2>
              <span
                className={` ${
                  isActive && "hidden"
                } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
                 duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
              >
                {menu?.name}
              </span>
            </Link>
          ))}
        </div>
      </aside>
      <main className={`flex w-full`}>
        <div {...props} className={`w-full`}>
          {children}
        </div>
      </main>
    </section>
  );
}

