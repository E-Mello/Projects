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
    SlideFade
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
import {
    BrowserRouter,
    Route,
    Routes,
    Link
} from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { RegisterDevice } from '../pages/RegisterDevice';
import { DeviceControl } from '../pages/DeviceControl';
import { Settings } from '../pages/Settings';
import { Reports } from '../pages/Reports';

// import { Link as ReachLink } from "@reach/router"


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
                    <NavItem navSize={navSize} icon={MdDashboard} title="Dashboard">
                        <Link to='/'></Link>
                    </NavItem>
                    <NavItem navSize={navSize} icon={BiEdit} title="Cadastrar Aparelhos">
                        <Link to="/RegisterDevice"></Link>
                    </NavItem>
                    <NavItem navSize={navSize} icon={BsJournalBookmarkFill} title="Controle de Aparelhos">
                        <Link to="/DeviceControl"></Link>
                    </NavItem>
                    <NavItem navSize={navSize} icon={TbReport} title="Reports">
                        <Link to="/Reports"></Link>
                    </NavItem>
                    <NavItem navSize={navSize} icon={FiSettings} title="Settings">
                        <Link to="/Settings"></Link>
                    </NavItem>
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