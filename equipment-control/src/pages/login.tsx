// https://supabase-schema.vercel.app/
// supabase token: sbp_a9476c8be4789bc12bda7f1e8c5144f0c5a51565
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormEventHandler, useState } from "react";

import { BsWindowSidebar } from "react-icons/bs";
import { signIn } from "next-auth/react";
import { trpc } from "../utils/trpc";

export default function Login() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLDivElement> = async (e) => {
    //validate user info
    e.preventDefault();

    const res = await signIn("credentials", {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);

    if (res?.ok) {
      window.alert("Login Successful");
    } else {
      window.alert("Login Failed");
    }
  };

  return (
    <Flex
      pos={"relative"}
      w="100vw"
      h="85vh"
      align={["start", "center"]}
      justify="center"
      mt={["8", "0"]}
      px="4"
    >
      <Center
        flexDirection={"column"}
        justifyContent={"top"}
        pos={"relative"}
        display={"flex"}
      >
        <Box
          boxSize="sm"
          opacity={"0.2"}
          pos={"relative"}
          justifyContent={"center"}
          display={"flex"}
          h={"10rem"}
        >
          <Image
            src="unimed.svg"
            fallbackSrc="../../public/unimed.svg"
            alt="unimed"
            justifyContent={"top"}
            display={"flex"}
            w={"10rem"}
            h={"10rem"}
          />
        </Box>
        <FormControl
          pos="relative"
          flexDirection="column"
          as="form"
          w={"30rem"}
          h={"15rem"}
          // maxW={360}
          bg="gray.100"
          p="8"
          borderRadius={8}
          //   onSubmit={handleLogin}
          boxShadow={"0 3px 20px rgb(0 0 0 / 0.7)"}
          onSubmit={handleSubmit}
          alignContent={"center"}
        >
          <Stack spacing="4">
            <Input
              type="text"
              placeholder="Usuário"
              flexDirection={"row"}
              name="username"
              defaultValue=""
              // rules={{ required: true }}
              // error={errors.username?.message}
            />
            <Input
              type="password"
              placeholder="Senha"
              name="password"
              defaultValue=""
              // rules={{ required: true }}
              // error={errors.password?.message}
            />

            <Stack
              spacing="8"
              direction={"row"}
              alignItems={"flex-end"}
              justify="center"
              paddingTop={2}
            >
              <Button
                // onClick={}
                pos="relative"
                colorScheme="cyan"
                variant="outline"
                //disabled={loading}
                type="submit"
              >
                Login
              </Button>
            </Stack>
            <Center>
              <Text>Esqueceu sua senha?</Text>
              <Link ml={2}>Clique Aqui!</Link>
            </Center>
          </Stack>
        </FormControl>
      </Center>
    </Flex>
  );
}
