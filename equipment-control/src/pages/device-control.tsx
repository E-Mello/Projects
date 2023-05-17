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
import { MdGroupWork, MdWork } from "react-icons/md";

import { BiDevices } from "react-icons/bi";
import { DeviceCreateSchema } from "../server/common/DeviceSchema";
import { DeviceForm } from "../components/DeviceForm";
import Layout from "../components/Layout";
import { NextPageWithLayout } from "../types/layout";
import React from "react";
import type { ReactElement } from "react";
import type { SubmitHandler } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const DeviceControl: NextPageWithLayout = () => {
  const [currentDeviceID, setCurrentDeviceID] = React.useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const utils = trpc.useContext();
  const { mutateAsync: createDevice } = trpc.device.create.useMutation({
    onSuccess: () => {
      utils.device.getAll.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof DeviceCreateSchema>>({
    resolver: zodResolver(DeviceCreateSchema),
  });
  const submitdevice: SubmitHandler<
    z.infer<typeof DeviceCreateSchema>
  > = async (data) => {
    const response = await createDevice(data);
    console.log("response is: ", response);
    reset();
  };

  const { data: devices, isLoading: deviceIsLoading } =
    trpc.device.getAll.useQuery();
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
                <b>CADASTRAR APARELHO</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box as="form" onSubmit={handleSubmit(submitdevice)}>
              <HStack direction={"column"} spacing="5rem">
                <Box display="flex" flexDirection={"column"}>
                  <FormLabel>Modelo</FormLabel>
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
                      placeholder="Ex: BIOFII-S174"
                      h={"2rem"}
                      {...register("modelo")}
                    />
                  </InputGroup>
                  <FormLabel>Serie</FormLabel>
                  <InputGroup>
                    <IconButton
                      variant="outline"
                      colorScheme="blackAlpha"
                      aria-label="Serie"
                      w={"1.9rem"}
                      h={"1.9rem"}
                      mr={"0.5rem"}
                      icon={<MdWork />}
                    />
                    <Input
                      type="text"
                      w={"20rem"}
                      placeholder="Ex: 150675"
                      h={"2rem"}
                      {...register("serie")}
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
              <Box flex="1" textAlign="left">
                <b>ALTERAR CADASTRO DE APARELHO</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <List spacing={1} display="flex" flexDirection={"column"}>
              {devices?.map((device) => (
                <Box key={device.id}>
                  <Button
                    ref={btnRef}
                    onClick={() => {
                      onOpen();
                      setCurrentDeviceID(device.id);
                    }}
                    display={"flex"}
                    justifyContent={"space-between"}
                    h={"3.5rem"}
                    w="100%"
                  >
                    <ListItem
                      display="flex"
                      width={"50%"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Stack
                        display={"flex"}
                        flexDirection={"row"}
                        alignItems={"center"}
                      >
                        <ListIcon
                          as={BiDevices}
                          color="green.500"
                          mr={"1rem"}
                        />
                        <Stack display={"flex"} alignItems={"start"}>
                          <Text textTransform={"uppercase"}>
                            {device.modelo}
                          </Text>
                          <Text fontSize={"0.7rem"} textTransform={"uppercase"}>
                            {device.serie}
                          </Text>
                        </Stack>
                      </Stack>
                      <Box>
                        <Text textTransform={"uppercase"}>
                          Status: {device.active === true ? "Ativo" : "Inativo"}
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
                <DrawerHeader>Alterar os dados do usuário</DrawerHeader>
                {deviceIsLoading ? (
                  <Spinner />
                ) : (
                  devices
                    ?.filter((device) => device.id === currentDeviceID)
                    .map((device) => (
                      <DrawerBody key={currentDeviceID}>
                        <DeviceForm
                          device={device}
                          onCancel={onClose}
                          key={device.id}
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

DeviceControl.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default DeviceControl;
