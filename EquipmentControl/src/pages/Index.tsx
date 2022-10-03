import { Avatar, Divider, Flex, Heading, IconButton, Link, Text } from "@chakra-ui/react";
import { Component, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { Dashboard } from "../components/Dashboard";
import { DeviceControlv2 } from "../components/DeviceControlv2";
import { NavItem } from "../components/NavItem";

export function Index() {
    const [navSize, changeNavSize] = useState("large")
    const [content, setContent] = useState(1)
    const [component, setComponent] = useState([
        {
            index: 1,
        },
        {
            index: 2,
        },
        {
            index: 3,
        },
    ])
    function handdleChangeContent(component: Component) {
        setContent(1);
        if (content == 1) {
            return <Dashboard />
        }
    }

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
                            aria-label={''}
                            background="none"
                            transition="width 2s, height 4s"
                            mt={5}
                            _hover={{ background: 'none' }}
                            icon={<FiMenu />}
                            onClick={() => {
                                if (navSize == "small")
                                    changeNavSize("large")
                                else
                                    changeNavSize("small")
                            }}
                        />
                        <Link onClick={handdleChangeContent} >
                            <NavItem navSize={navSize} icon={MdDashboard} title="Dashboard"></NavItem>
                        </Link>
                        <NavItem navSize={navSize} icon={BiEdit} title="Controle de Aparelhos"></NavItem>
                        <NavItem navSize={navSize} icon={TbReport} title="Relatórios"></NavItem>
                    </Flex>

                    <Flex
                        p="5"
                        flexDir="column"
                        w="100%"
                        alignItems="flex-start"
                        mb="4"
                    >
                        <Divider display={navSize == "small" ? "none" : "flex"} />
                        <Flex mt={4} align="center">
                            <Avatar size="sm" src="https://github.com/E-Mello.png" />
                            <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                                <Heading as="h3" size="sm">Édio Melo</Heading>
                                <Text color="gray">Suporte</Text>
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
                    h="97.5%"
                    left="1rem"
                    marginTop="2.5vh"
                    boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
                    borderRadius="4rem"
                    w={navSize == "small" ? "100%" : "99%"}
                    flexDir="column"
                    justifyContent="space-between"
                    backgroundColor="#f1f1f1 !important"
                    transition={navSize == "large" ? "all 0.3s ease-in" : "ease"}
                >
                    <Flex>

                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}