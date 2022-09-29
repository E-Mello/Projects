import React, { useState } from 'react'
import {
    Flex,
    Text,
    Divider,
    Avatar,
    Heading,
    IconButton,
    Fade,
    ScaleFade,
    Slide,
    SlideFade,
    Link
} from "@chakra-ui/react";
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import {
    BiChat,
    BiLogOut,
    BiUser,
    BiEdit
} from "react-icons/bi";
import {
    BsFillArrowLeftSquareFill,
    BsSearch,
    BsFillArrowRightSquareFill,
    BsJournalBookmarkFill,
    BsFillBookmarkHeartFill
} from "react-icons/bs";
import { VscFiles } from "react-icons/vsc";
import { TbReport } from "react-icons/tb";
import {
    MdDashboard,
    MdOutlineBuild,
    MdSchool
} from "react-icons/md";
import { NavItem } from './NavItem'

export function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <>
            <Flex
                pos="sticky"
                left="5"
                h="95vh"
                marginTop="2.5vh"
                boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
                borderRadius={navSize == "small" ? "4.6875rem" : "1.875rem"}
                w={navSize == "small" ? "4.6875rem" : "15.625rem"}
                flexDir="column"
                justifyContent="space-between"
                transition={navSize == "small" ? "all 0.3s ease-in-out" : ""}
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
                    <Link href='/'
                        _hover={{ textDecor: 'none' }}
                    >
                        <NavItem navSize={navSize} icon={MdDashboard} title="Dashboard"></NavItem>
                    </Link>
                    <Link href='/register-device'
                        _hover={{ textDecor: 'none' }}
                    >
                        <NavItem navSize={navSize} icon={BiEdit} title="Cadastrar Aparelhos"></NavItem>
                    </Link>
                    <Link href='/device-control'
                        _hover={{ textDecor: 'none' }}
                    >
                        <NavItem navSize={navSize} icon={BsJournalBookmarkFill} title="Controle de Aparelhos"></NavItem>
                    </Link>
                    <Link href='/reports'
                        _hover={{ textDecor: 'none' }}
                    >
                        <NavItem navSize={navSize} icon={TbReport} title="Relatórios"></NavItem>
                    </Link>
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

            </Flex >
        </>
    );
}