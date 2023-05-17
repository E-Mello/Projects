import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsFileEarmarkPersonFill, BsPersonFill } from "react-icons/bs";
import {
  MdAccountCircle,
  MdEmail,
  MdGroupWork,
  MdLock,
  MdPhone,
  MdWork,
} from "react-icons/md";

import { BiRename } from "react-icons/bi";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import React from "react";
import type { ReactElement } from "react";
import type { SubmitHandler } from "react-hook-form";
import { UserCreateSchema } from "../server/common/UserSchema";
import { UserForm } from "../components/UserForm";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Settings: NextPageWithLayout = () => {
  const [currentUserID, setCurrentUserID] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const utils = trpc.useContext();
  const { mutateAsync: createUser } = trpc.user.create.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof UserCreateSchema>>({
    resolver: zodResolver(UserCreateSchema),
  });
  const submitUser: SubmitHandler<z.infer<typeof UserCreateSchema>> = async (
    data
  ) => {
    const response = await createUser(data);

    console.log("res", response);
    reset();
  };

  const { data: users, isLoading: userIsLoading } = trpc.user.getAll.useQuery();
  return (
    <Flex
      pos="relative"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
      borderRadius="1.6875rem"
      w="100%"
      h="98%"
      flexDir="column"
      justifyContent="space-between"
      backgroundColor="#f1f1f1 !important"
    >
      <Accordion
        allowToggle
        borderRadius="1.6875rem"
        pos="absolute"
        left="0.5rem"
        w="99%"
      >
        <AccordionItem borderRadius="1.6875rem">
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <b>CRIAR ACESSO DE USUÁRIO</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box as="form" onSubmit={handleSubmit(submitUser)}>
              <HStack direction={"column"} spacing="5rem">
                <Box display="flex" flexDirection={"column"}>
                  <FormLabel>Username</FormLabel>
                  <InputGroup>
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Username"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      mr={"0.5rem"}
                      icon={<MdAccountCircle />}
                    />
                    <Input
                      type="text"
                      disabled={isSubmitting}
                      placeholder="Write one username"
                      w={"20rem"}
                      h={"2rem"}
                      // aria-invalid={errors.username?.message ? "true" : "false"}
                      isInvalid={errors.username?.message ? true : false}
                      {...register("username")}
                    />
                  </InputGroup>

                  <FormLabel>Password</FormLabel>
                  <InputGroup size="md">
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Password"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      mr={"0.5rem"}
                      icon={<MdLock />}
                    />
                    <Input
                      type={show ? "text" : "password"}
                      placeholder="Enter one password"
                      w={"20rem"}
                      h={"2rem"}
                      {...register("password")}
                    />
                    {/* {errors.password && <span>This field is required</span>} */}
                    <InputRightElement p="absolute">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormLabel>Telefone</FormLabel>
                  <InputGroup size="md">
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Phone"
                      fontSize="1.2rem"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      icon={<MdPhone />}
                      mr={"0.5rem"}
                    />
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      w={"20rem"}
                      h={"2rem"}
                      {...register("telefone")}
                    />
                    {/* {errors.telefone && <span>This field is required</span>} */}
                  </InputGroup>
                  <FormLabel>Nome / Razão Social</FormLabel>
                  <InputGroup>
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Password"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      mr={"0.5rem"}
                      icon={<BiRename />}
                    />
                    <Input
                      type="text"
                      w={"30rem"}
                      placeholder="Write your name or Corporate Name"
                      h={"2rem"}
                      {...register("nome")}
                    />
                    {/* {errors.nome && <span>This field is required</span>} */}
                  </InputGroup>
                </Box>
                <Box display="flex" flexDirection={"column"}>
                  <FormLabel>CPF / CNPJ</FormLabel>
                  <InputGroup>
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Password"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      mr={"0.5rem"}
                      icon={<BsFileEarmarkPersonFill />}
                    />
                    <Input
                      type="text"
                      w={"20rem"}
                      placeholder="Write your CPF or CNPJ"
                      h={"2rem"}
                      {...register("cpf")}
                    />
                    {/* {errors.cpf && <span>This field is required</span>} */}
                  </InputGroup>
                  <FormLabel>Email Address</FormLabel>
                  <InputGroup>
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Send email"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      mr={"0.5rem"}
                      icon={<MdEmail />}
                    />
                    <Input
                      type="email"
                      w={"20rem"}
                      placeholder="Write your e-mail adress"
                      h={"2rem"}
                      {...register("email")}
                    />
                    {/* {errors.email && <span>This field is required</span>} */}
                  </InputGroup>
                  <FormLabel>Setor</FormLabel>
                  <InputGroup>
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Password"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      mr={"0.5rem"}
                      icon={<MdGroupWork />}
                    />
                    <Input
                      type="text"
                      w={"20rem"}
                      placeholder="Write your sector"
                      h={"2rem"}
                      {...register("setor")}
                    />
                    {/* {errors.setor && <span>This field is required</span>} */}
                  </InputGroup>
                  <FormLabel>Cargo</FormLabel>
                  <InputGroup>
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Password"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      mr={"0.5rem"}
                      icon={<MdWork />}
                    />
                    <Input
                      type="text"
                      w={"20rem"}
                      placeholder="Write your position in the company"
                      h={"2rem"}
                      {...register("cargo")}
                    />
                    {/* {errors.cargo && <span>This field is required</span>} */}
                  </InputGroup>
                </Box>
              </HStack>
              <Button
                colorScheme="teal"
                variant="outline"
                mt={"2rem"}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Register"}
              </Button>
            </Box>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                <b>ALTERAR ACESSO DE USUÁRIO</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <List spacing={1} display="flex" flexDirection={"column"}>
              {users?.map((user) => (
                <>
                  <Button
                    key={user.id}
                    ref={btnRef}
                    onClick={() => {
                      onOpen();
                      setCurrentUserID(user.id);
                    }}
                    display={"flex"}
                    justifyContent={"space-between"}
                    h={"3.5rem"}
                  >
                    <ListItem
                      display="flex"
                      width={"50%"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Stack
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                      >
                        <ListIcon
                          as={BsPersonFill}
                          color="green.500"
                          mr={"1rem"}
                        />
                        <Stack
                          display={"flex"}
                          flexDirection={"column"}
                          alignItems={"start"}
                        >
                          <Text textTransform={"uppercase"}>{user.nome}</Text>
                          <Text fontSize={"0.7rem"} textTransform={"uppercase"}>
                            {user.setor}
                          </Text>
                        </Stack>
                      </Stack>
                      <Box display={"flex"} justifyContent={"flex-end"}>
                        <Text textTransform={"uppercase"}>{user.cargo}</Text>
                      </Box>
                    </ListItem>
                  </Button>
                  <Divider />
                </>
              ))}
            </List>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              size="lg"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Alterar os dados do usuário</DrawerHeader>
                {userIsLoading ? (
                  <Spinner />
                ) : (
                  users
                    ?.filter((user) => user.id === currentUserID)
                    .map((user) => (
                      <DrawerBody key={currentUserID}>
                        <UserForm
                          user={user}
                          onCancel={onClose}
                          key={user.id}
                          afterSubmit={onClose}
                        />
                      </DrawerBody>
                    ))
                )}
              </DrawerContent>
            </Drawer>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

Settings.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Settings;
