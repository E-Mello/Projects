import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";

import { supabase } from './supabaseClient'
import { useState } from 'react'
import { useToast } from "@chakra-ui/react";

export default function Auth() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const toast = useToast();

    const handleLogin = async (email) => {
        try {
            setLoading(true);
            const { error } = await supabase.auth.signIn({ email });
            console.log(error)
            if (error) {
                console.log(error)
            };
            toast({
                title: "Account Created",
                position: "top",
                description: "Check your e-mail for the login link",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
        } catch {
            toast({
                title: "Error ",
                position: "top",
                description: Error,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex>
            <Flex
                minH={"100vh"}
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("blackAlpha.600", "blue.300")}
            >
                <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
<<<<<<< HEAD
                    <Stack align={"center"}>
                        <Heading fontSize={"4xl"}>Sign in to Supabase</Heading>
                        <Text fontSize={"lg"} color={"gray.600"}>
                            Via Magic Link With Your Email Below 💕💕
                        </Text>
=======
                    <Heading fontSize={"4xl"}>Sign in to Supabase</Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        Via Magic Link With Your Email Below 💕💕
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("green.600", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email Address</FormLabel>
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogin(email);
                                }}
                                isLoading={loading}
                                loadingText="Signing in ..."
                                colorScheme="teal"
                                variant="outline"
                                spinnerPlacement="start"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                {loading || "Send Magic Link"}
                            </Button>
                        </Stack>
>>>>>>> 110fb5bba7e8ffc6f02cb14d27da75812e0b1b23
                    </Stack>

                    <Box
                        rounded={"lg"}
                        bg={useColorModeValue("white", "gray.700")}
                        boxShadow={"lg"}
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email Address</FormLabel>
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleLogin(email);
                                    }}
                                    isLoading={loading}
                                    loadingText="Signing in ..."
                                    colorScheme="teal"
                                    variant="outline"
                                    spinnerPlacement="start"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    {loading || "Send Magic Link"}
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Flex>
    )
}
