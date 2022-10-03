import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList,
    Heading,
    Fade,
    Box
} from "@chakra-ui/react";
import {
    IconBaseProps,
    IconType
} from "react-icons/lib";

import { useState } from "react";
interface NavItemProps {
    navSize: string;
    title: string;
    icon: IconType;
    active?: boolean;
    description?: string;
}

export function NavItem({ navSize, title, icon, active, description }: NavItemProps) {
    const [flag, setFlag] = useState(Boolean)

    function handleFlagState() {
        setFlag(!flag)
    }

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
                    _hover={{ textDecorationStyle: 'none', backgroundColor: '#AEC8CA' }}
                    w={navSize == "large" ? "100%" : "small"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#AEC8CA" : "gray.500"} />
                            <Text ml={5} display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>


        </Flex >
    );
}