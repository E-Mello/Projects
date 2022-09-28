import {
    Flex,
    Heading,
    Text,
    Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { IconBaseProps } from "react-icons";
import { IconType } from "react-icons/lib";

interface NavHoverBoxProps {
    icon: IconType;
    title: string;
    description?: string;
}

export function NavHoverBox({ icon, title, description }: NavHoverBoxProps) {
    const [flag, setFlag] = useState(Boolean)
    return (
        <>
            <Flex
                visibility={flag ? 'visible' : 'hidden'}
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
                >
                    <Icon as={icon} fontSize="3xl" mb={4} />
                    <Heading size="md" fontWeight="normal">{title}</Heading>
                    <Text>{description}</Text>
                </Flex>
            </Flex>
        </>
    );
}