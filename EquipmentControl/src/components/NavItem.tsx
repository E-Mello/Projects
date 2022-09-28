import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from "@chakra-ui/react";
import {
    IconBaseProps,
    IconType
} from "react-icons/lib";
import { NavHoverBox } from "./NavHoverBox";

import { Link as ReachLink } from "@reach/router"
interface NavItemProps {
    navSize: string;
    title: string;
    icon: IconType;
    active?: boolean;
    description?: string;
}

export function NavItem({ navSize, title, icon, active, description }: NavItemProps) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="right">
                <Link
                    background={active ? "#AEC8CA" : ""}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: '#AEC8CA' }}
                    w={navSize == "large" ? "100%" : " sm"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#AEC8CA" : "gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                    <NavHoverBox title={title} icon={icon} description={description} />
                </MenuList>
            </Menu>


        </Flex >
    );
}