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
// import CardDevice, { Props } from "../components/CardDevice";
import React, { useState } from "react";

import { BiRename } from "react-icons/bi";
import { DeviceForm } from "../components/DeviceForm";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { ProviderCreateSchema } from "../server/common/ProviderSchema";
import { ProviderForm } from "../components/ProviderForm";
import type { ReactElement } from "react";
import type { SubmitHandler } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const PrestadorControl: NextPageWithLayout = () => {
  const btnRef = React.useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentProviderID, setcurrentProviderID] = useState("");
  const utils = trpc.useContext();
  const { mutateAsync: createDevice } = trpc.provider.create.useMutation({
    onSuccess: () => {
      utils.device.getAll.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof ProviderCreateSchema>>({
    resolver: zodResolver(ProviderCreateSchema),
  });

  const submitProvider: SubmitHandler<
    z.infer<typeof ProviderCreateSchema>
  > = async (data) => {
    const response = await createDevice(data);
    console.log("res", response);
    reset();
  };

  const { data: providers, isLoading: providerIsLoading } =
    trpc.provider.getAll.useQuery();

  return (
    <Flex
      pos="relative"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
      borderRadius="1.6875rem"
      w="100%"
      flexDir="column"
      justifyContent="space-between"
      backgroundColor="#f1f1f1 !important"
    >
      <Accordion
        allowToggle
        borderRadius="1.6875rem"
        w="99%"
        pos="absolute"
        left="0.5rem"
      >
        <AccordionItem borderRadius="2rem">
          <AccordionButton>
            <Box flex="1" textAlign="left" borderRadius="1.7rem">
              <b>CADASTRAR PRESTADOR</b>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Box as="form" onSubmit={handleSubmit(submitProvider)}>
              <HStack direction={"column"} spacing="5rem">
                <Box display="flex" flexDirection={"column"}>
                  <Stack>
                    <FormLabel>Codigo</FormLabel>
                    <InputGroup>
                      <IconButton
                        variant="outline"
                        colorScheme="blackAlpha"
                        aria-label="Password"
                        w={"1.9rem"}
                        h={"1.9rem"}
                        mr={"0.5rem"}
                        icon={<MdAccountCircle />}
                      />
                      <Input
                        type="text"
                        disabled={isSubmitting}
                        placeholder="Write de Provider Code"
                        w={"20rem"}
                        h={"2rem"}
                        isInvalid={errors.codigo?.message ? true : false}
                        {...register("codigo")}
                      />
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
                    </InputGroup>
                    <FormLabel>CPF / CNPJ</FormLabel>
                    <InputGroup>
                      <IconButton
                        variant="outline"
                        colorScheme="blackAlpha"
                        aria-label="cpf/cnpj"
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
                    </InputGroup>
                  </Stack>
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
                      {...register("tel_first")}
                    />
                  </InputGroup>
                  <FormLabel>Telefone 02</FormLabel>
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
                      {...register("tel_sec")}
                    />
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
              <Box flex="1" textAlign="left" borderRadius="2rem">
                <b>EDITAR CADASTRO DE PRESTADOR</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <List spacing={1} display="flex" flexDirection={"column"}>
              {providers?.map((provider) => (
                <Box key={provider.id}>
                  <Button
                    ref={btnRef}
                    onClick={() => {
                      onOpen();
                      setcurrentProviderID(provider.id);
                    }}
                    display={"flex"}
                    justifyContent={"space-between"}
                    h={"3.5rem"}
                    w="100%"
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
                        <Stack display={"flex"} alignItems={"start"}>
                          <Text textTransform={"uppercase"}>
                            {provider.nome}
                          </Text>
                          <Text fontSize={"0.7rem"} textTransform={"uppercase"}>
                            {provider.cpf}
                          </Text>
                        </Stack>
                      </Stack>
                      <Box>
                        <Text textTransform={"uppercase"}>
                          Status:{" "}
                          {provider.active === true ? "Ativo" : "Inativo"}
                        </Text>
                      </Box>
                    </ListItem>
                  </Button>
                  <Divider />
                </Box>
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
                <DrawerHeader>Alterar os dados do prestador</DrawerHeader>
                {providerIsLoading ? (
                  <Spinner />
                ) : (
                  providers
                    ?.filter((provider) => provider.id === currentProviderID)
                    .map((provider) => (
                      <DrawerBody key={currentProviderID}>
                        <ProviderForm
                          provider={provider}
                          onCancel={onClose}
                          key={provider.id}
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

PrestadorControl.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PrestadorControl;
