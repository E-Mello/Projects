import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
} from "@chakra-ui/react";
//Icons
import { BiDevices, BiEdit } from "react-icons/bi";
// import { PrestadorControl } from "../components/PrestadorControl";
// import { Reports } from "../components/Reports";
import { TbReport, TbSettings } from "react-icons/tb";

// import { BsJournalBookmarkFill } from "react-icons/bs";
// import { ConnectDeviceProvider } from "../components/ConnectDeviceProvider";
//Components-Pages
// import { Dashboard } from "../components/Dashboard";
// import { DeviceControl } from "../components/DeviceControl";
import { FiMenu } from "react-icons/fi";
//Libraries
import type { FlexProps } from "@chakra-ui/react";
import Link from "next/link";
import { MdDashboard } from "react-icons/md";
//Just-Components
import { NavItem } from "../components/NavItem";
import { SlLogout } from "react-icons/sl";
import { TiBusinessCard } from "react-icons/ti";
import { useState } from "react";

// import { animated, useSpring } from "@react-spring/web";

export default function Layout({ children, ...props }: FlexProps) {
  const [navSize, changeNavSize] = useState("large");

  return (
    <Flex w="100%">
      <Flex
        w={navSize == "small" ? "5%" : "15%"}
        transition={navSize == "small" ? "all 0.3s ease-in" : "ease"}
      >
        <Flex
          pos="relative"
          left="5"
          h="95vh"
          marginTop="2.5vh"
          boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
          borderRadius={navSize == "small" ? "4.6875rem" : "1.875rem"}
          w={navSize == "small" ? "4.6875rem" : "16.625rem"}
          flexDir="column"
          justifyContent="space-between"
          transition={navSize == "small" ? "all 0.3s ease-in-out" : "ease-in"}
          backgroundColor="#ebe9e9"
        >
          <Flex
            p="5%"
            flexDir="column"
            alignItems={navSize == "small" ? "center" : "flex-start"}
            as="nav"
          >
            <IconButton
              aria-label={""}
              background="none"
              transition="width 2s, height 4s"
              mt={5}
              _hover={{ background: "none" }}
              icon={<FiMenu />}
              onClick={() => {
                if (navSize == "small") changeNavSize("large");
                else changeNavSize("small");
              }}
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
                title="Controle de Aparelhos"
              ></NavItem>
            </Link>
            <Link href="/prestador-control">
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
            <Link href="/settings">
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
                size={"lg"}
                src="https://github.com/E-Mello.png"
                left={navSize == "small" ? "-0.9rem" : "auto"}
                top={navSize == "small" ? "-3rem" : "auto"}
              />
              <Flex flexDir="column" ml={4}>
                <Heading
                  as="h3"
                  size="md"
                  display={navSize == "small" ? "none" : "flex"}
                >
                  Édio Melo
                </Heading>
                <Text
                  color="gray"
                  fontSize={"1.1rem"}
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
                    />
                    <Text
                      ml={2}
                      color={"gray.500"}
                      display={navSize == "small" ? "none" : "flex"}
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
      <Flex
        w={navSize == "small" ? "93%" : "84%"}
        transition={navSize == "large" ? "all 0.3s ease-in" : "ease"}
      >
        <Flex
          pos="relative"
          h="56.5rem"
          left="1rem"
          marginTop=""
          borderRadius="4rem"
          w={navSize == "small" ? "100%" : "99%"}
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
