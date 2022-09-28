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
import { NavHoverBox } from "./NavHoverBox";

import { Link as ReachLink } from "@reach/router"
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
                    <MenuButton w="100%"
                    // onMouseOver={handleFlagState}
                    >
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
                    <Flex
                    >
                        <Flex
                            pos="absolute"
                            mt="calc(6.25rem - 0.46875rem)"
                            ml="-0.625rem"
                            w={0}
                            h={0}
                            borderTop="0.625rem solid transparent"
                            borderRight="0.625rem solid #82AAAD"
                        />
                        <Flex
                            h={200}
                            w={200}
                            flexDir="column"
                            alignItems="center"
                            justify="center"
                            backgroundColor="#82AAAD"
                            borderRadius="0.625rem"
                            color="#fff"
                            textAlign="center"
                            textDecoration="none"
                            _hover={{ textDecorationLine: 'none' }}
                        >
                            <Icon as={icon} fontSize="3xl" mb={4} />
                            <Heading size="md" fontWeight="normal">{title}</Heading>
                            <Text>{description}</Text>
                        </Flex>
                    </Flex>
                    <NavHoverBox title={title} icon={icon} description={description}></NavHoverBox>
                </MenuList>
            </Menu>


        </Flex >
    );
}