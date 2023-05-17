import {
  HiAcademicCap,
  HiArchive,
  HiChartPie,
  HiChatAlt2,
  HiCog,
  HiMenu,
  HiNewspaper,
  HiOutlineLogout,
  HiOutlineX,
  HiPhotograph,
} from "react-icons/hi";

import { Avatar } from "../Avatar";
import Link from "next/link";
import React from "react";
import { cn } from "../../utils/cn";
import { isActiveNavAtom } from "../../atoms/activeNavAtom";
import { useAtom } from "jotai";

export function SideNav() {
  const [isActiveNav, setIsActiveNav] = useAtom(isActiveNavAtom);

  // function changeStateBtn() {
  //   setIsActiveNav(!isActiveNav);
  //   console.log(isActiveNav);
  // }

  const menus = [
    {
      name: "Dashboard",
      Link: "/dashboard",
      icon: HiChartPie,
      haveOptions: false,
    },
    {
      name: "TCC's Feitos",
      Link: "/tcc",
      icon: HiAcademicCap,
      haveOptions: false,
    },
    {
      name: "Canais Discord",
      Link: "/discordchannels",
      icon: HiChatAlt2,
      haveOptions: false,
      margin: true,
    },
    {
      name: "Midias",
      Link: "/media",
      icon: HiPhotograph,
      haveOptions: true,
    },
    {
      name: "Informativos",
      Link: "/informatives",
      icon: HiNewspaper,
      haveOptions: false,
      margin: true,
    },
    {
      name: "Configuracao",
      Link: "/",
      icon: HiCog,
      haveOptions: false,
    },
    {
      name: "Logout",
      Link: "/login",
      icon: HiOutlineLogout,
      haveOptions: false,
      footer: true,
    },
  ];
  return (
    <aside
      className={`fixed top-0 left-0 z-50 min-h-screen justify-end ${
        isActiveNav ? "w-[15vw] " : "w-[4vw]"
      } duration-4000 rounded-md border-2 border-zinc-100
        border-opacity-5 bg-[#0e0e0e] bg-opacity-5 px-4
        text-gray-100 transition-all ease-in-out`}
    >
      <div
        className={` flex justify-between py-3 transition-all duration-500 ${
          isActiveNav ? "" : "flex-initial flex-col-reverse"
        }`}
      >
        <div className={`${isActiveNav ? "" : "-ml-3 w-[3.5vw]"}`}>
          <Avatar src="https://github.com/E-Mello.png" width={50} height={50} />
        </div>
        <div
          className={`flex flex-col justify-center ${
            isActiveNav ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className={`whitespace-nowrap text-xs transition-all`}>
            Édio Melo
          </span>
          <span className={`whitespace-nowrap text-xs transition-all`}>
            Web Developer
          </span>
        </div>
        {isActiveNav ? (
          <HiOutlineX
            size={26}
            className="cursor-pointer transition-all duration-500"
            onClick={() => setIsActiveNav(!isActiveNav)}
          />
        ) : (
          <HiMenu
            size={26}
            className="cursor-pointer transition-all duration-500"
            onClick={() => setIsActiveNav(!isActiveNav)}
          />
        )}
      </div>
      <div className="relative mt-[3vh] flex flex-col gap-4">
        {menus?.map((menu, i) => (
          <Link
            href={menu?.Link}
            key={i}
            className={`${
              (menu?.margin && "mt-[5vh]") || (menu?.footer && "mt-[5vh]")
            } group flex items-center gap-4  rounded-md p-2 text-sm font-medium transition-all duration-500 ease-out hover:bg-gray-700`}
          >
            <div>{React.createElement(menu.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i * 0.05}s`,
              }}
              className={`whitespace-pre duration-500 ${
                !isActiveNav && "translate-x-[7vw] overflow-hidden opacity-0"
              }`}
            >
              {menu?.name}
            </h2>
            <span
              className={` ${
                isActiveNav && "hidden"
              } fixed left-16 whitespace-pre rounded-md px-0 py-0 font-semibold text-white opacity-0 drop-shadow-lg transition-all
                 duration-500 ease-out group-hover:px-2 group-hover:py-1 group-hover:opacity-100 group-hover:duration-200`}
            >
              {menu?.name}
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
