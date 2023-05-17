import {
  Avatar,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { BiDevices, BiEdit } from "react-icons/bi";
import { TbReport, TbSettings } from "react-icons/tb";
import { useEffect, useState } from "react";

import { FiMenu } from "react-icons/fi";
import type { FlexProps } from "@chakra-ui/react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
import { NavItem } from "../components/NavItem";
import { SlLogout } from "react-icons/sl";
import { TiBusinessCard } from "react-icons/ti";

export default function Layout({ children, ...props }: FlexProps) {
  const [navSize, setNavSize] = useState("large");

  useEffect(() => {
    // Create the media query to match the resolution above 62em
    const mediaQuery = window.matchMedia("(min-width: 62em)");

    // Update the navSize state when the media query matches
    if (mediaQuery.matches) {
      setNavSize("large");
    } else {
      setNavSize("small");
    }

    // Add an event listener to update the navSize state when the media query changes
    const handleMediaQueryChange = () => {
      if (mediaQuery.matches) {
        setNavSize("large");
      } else {
        setNavSize("small");
      }
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Clean up the event listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []); // The empty array ensures that the effect only runs on mount and unmount

  return (
    // Aqui é meu layout todo, ou seja o projeto se baseia em 2 div's, uma lateral e outra central
    <Flex
      display={"flex"}
      justifyContent={"space-between"}
      flexDir={"row"}
      w={"118.5rem"}
      h="100%"
    >
      {/* Aqui representa a div pai da esquerda a "NavBar" */}
      <Flex
        w={navSize == "small" ? "3%" : "15%"}
        // transition={navSize == "small" ? "all 0.3s ease-in" : "ease"}
        h={"57rem"}
      >
        {/* Aqui é uma div dentro da div pai, que contém os links dentro, a div pai é a caixa e dentro dela esta essa aqui contendo os links de navegação */}
        <Flex
          pos="relative"
          left="1rem"
          h={"100%"}
          marginTop="2vh"
          boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
          borderRadius={navSize == "small" ? "4.6875rem" : "1.875rem"}
          width={"100%"}
          flexDir="column"
          justifyContent="space-between"
          transition={navSize == "small" ? "all 0.3s ease-in-out" : "ease-in"}
          backgroundColor="#ebe9e9"
        >
          {/* Aqui dentro que de fato está o icone de expandir e diminuir o menu e os links,  */}
          <Flex
            p="5%"
            flexDir="column"
            alignItems={navSize == "small" ? "center" : "flex-start"}
            as="nav"
            fontSize={"100%"}
            w={"100%"}
            h={"100%"}
          >
            <IconButton
              aria-label={""}
              background="none"
              transition="width 2s, height 4s"
              mt={5}
              _hover={{ background: "none" }}
              // display={navSize === "small" ? "none" : "flex"}
              icon={<FiMenu />}
              onClick={() => {
                if (navSize == "small") setNavSize("large");
                else setNavSize("small");
              }}
              // display={["none", "none", "none", "flex"]}
            />
            <Link href="/dashboard">
              <NavItem
                navSize={navSize}
                icon={MdDashboard}
                title="Dashboard"
              ></NavItem>
            </Link>
            <Link href="/device-control">
              <NavItem
                navSize={navSize}
                icon={BiDevices}
                title={"Controle de Dispositivos"}
              ></NavItem>
            </Link>
            <Link href="/provider-control">
              <NavItem
                navSize={navSize}
                icon={TiBusinessCard}
                title="Controle de Prestador"
              ></NavItem>
            </Link>
            <Link href="/connect-device-provider">
              <NavItem
                navSize={navSize}
                icon={BiEdit}
                title="Aparelho x Prestador"
              ></NavItem>
            </Link>
            <Link href="/reports">
              <NavItem
                navSize={navSize}
                icon={TbReport}
                title="Relatórios"
              ></NavItem>
            </Link>
            <Link href="/maintenance">
              <NavItem
                navSize={navSize}
                icon={TbSettings}
                title="Manutenção"
              ></NavItem>
            </Link>
          </Flex>

          <Flex p="5" flexDir="column" w="100%" alignItems="flex-start" mb="4">
            <Divider display={navSize == "small" ? "none" : "flex"} />
            <Flex mt={4} align="center">
              <Avatar
                size={navSize == "small" ? "md" : "lg"}
                src="https://github.com/E-Mello.png"
                left={navSize == "small" ? "-0.9rem" : "auto"}
                top={navSize == "small" ? "-3rem" : "auto"}
              />
              <Flex flexDir="column" ml={4}>
                <Heading
                  as="h3"
                  size="md"
                  display={navSize == "small" ? "none" : "flex"}
                  fontSize={[
                    "0.95rem", // 0-30em
                    "1rem", // 30em - 48em
                    "1.05", // 48em - 62em
                    "1.10rem", // 62em+
                  ]}
                >
                  Édio Melo
                </Heading>
                <Text
                  color="gray"
                  fontSize={[
                    "0.6rem", // 0-30em
                    "0.7rem", // 30em - 48em
                    "0.8rem", // 48em - 62em
                    "1rem", // 62em+
                  ]}
                  size="20px"
                  display={navSize == "small" ? "none" : "flex"}
                >
                  Suporte
                </Text>
                <Link href="/login">
                  <Flex
                    right={navSize == "small" ? "3rem" : "1rem"}
                    position="absolute"
                  >
                    <Icon
                      as={SlLogout}
                      color={navSize == "small" ? "black" : "gray.500"}
                      fontSize="xl"
                      position={navSize == "small" ? "absolute" : "relative"}
                      bottom={navSize == "small" ? "-2rem" : "auto"}
                      left={navSize == "small" ? "0.4rem" : "auto"}
                    />
                    <Text
                      ml={2}
                      color={"gray.500"}
                      display={navSize == "small" ? "none" : "flex"}
                      fontSize={[
                        "0.80rem", // 0-30em
                        "0.90rem", // 30em - 48em
                        "0.95rem", // 48em - 62em
                        "1rem", // 62em+
                      ]}
                    >
                      Logout
                    </Text>
                  </Flex>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      {/* Aqui representa a div central, nela possui a interação com a  "NavBar", ou seja, ao clicar em algum dos links, o conteúdo dessa aqui se altera*/}
      <Flex
        w={
          navSize == "small"
            ? "96%"
            : [
                "60%", // 0-30em
                "70%", // 30em - 48em
                "75%", // 48em - 62em
                "84%", // 62em+
              ]
        }
        transition={navSize == "large" ? "all 0.3s ease-in" : "ease"}
        right={navSize == "small" ? "-1rem" : "auto"}
      >
        {/* Aqui vai e div que irá ser trocada entre as páginas */}
        <Flex
          pos="relative"
          h={"57.7rem"}
          left="1rem"
          borderRadius="4rem"
          w={
            navSize == "small"
              ? "100%"
              : [
                  "90%", // 0-30em
                  "92%", // 30em - 48em
                  "94%", // 48em - 62em
                  "98%", // 62em+
                ]
          }
          justifyContent="space-between"
          transition={navSize == "large" ? "all 0.3s ease-in" : "ease"}
          {...props}
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
