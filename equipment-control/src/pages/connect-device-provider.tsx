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
  IconButton,
  Input,
  InputGroup,
  List,
  ListIcon,
  ListItem,
  Select,
  Stack,
  Text,
  useDisclosure,
  useTabList,
  useToast,
} from "@chakra-ui/react";
import { BsPersonFill, BsSearch } from "react-icons/bs";
import React, { useState } from "react";

import { DeviceList } from "../components/DeviceList";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import { ProviderList } from "../components/ProviderList";
import type { ReactElement } from "react";
import { deviceIdAtom } from "../atoms/deviceIdAtom";
import { providerIdAtom } from "../atoms/providerIdAtom";
import { trpc } from "../utils/trpc";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Drawers = "device" | "provider" | "";

const ConnectDeviceProvider: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [openDrawer, setOpenDrawer] = useState<Drawers>("");
  const [deviceId, setDeviceId] = useAtom(deviceIdAtom);
  const [providerId, setProviderId] = useAtom(providerIdAtom);
  const [erro, setErro] = useState("");
  const toast = useToast();

  const utils = trpc.useContext();
  const { mutateAsync: updateProvider } = trpc.provider.update.useMutation({
    onSuccess: () => {
      utils.provider.getAll.invalidate();
    },
  });
  const { mutateAsync: updateDevice } = trpc.device.update.useMutation({
    onSuccess: () => {
      utils.device.getAll.invalidate();
    },
  });

  const junction = async () => {
    if (deviceId && providerId) {
      const updateProviderRes = await updateProvider({
        id: providerId,
        vinc_id_device: deviceId,
      });
      const updateDeviceRes = await updateDevice({
        id: deviceId,
        vinc_id_prest: providerId,
      });
      if (updateDeviceRes?.id && updateProviderRes?.id) {
        return true;
      }
    }
    return false;
  };

  const { data: providers } = trpc.provider.getAll.useQuery();
  const { data: devices } = trpc.device.getAll.useQuery();

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
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" borderRadius="2rem">
                <b>VINCULAR DISPOSITIVO E PRESTADOR</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex pos="sticky" flexDir="row" alignItems="center" top="15rem">
              <Stack>
                <FormLabel pl={"3.1rem"}>Buscar Prestador</FormLabel>
                <InputGroup>
                  <IconButton
                    variant="outline"
                    aria-label="Prestador a ser vinculado"
                    w={"1.9rem"}
                    h={"1.9rem"}
                    mr={"0.5rem"}
                    icon={<BsSearch />}
                    ref={btnRef}
                    colorScheme="teal"
                    onClick={() => {
                      onOpen();
                      setOpenDrawer("provider");
                    }}
                  />
                  {providers && (
                    <Text>
                      {
                        providers?.find(
                          (provider) => providerId === provider.id
                        )?.nome
                      }
                    </Text>
                  )}
                </InputGroup>
                <FormLabel pl={"3.1rem"}>Buscar Dispositivo</FormLabel>
                <InputGroup>
                  <IconButton
                    variant="outline"
                    aria-label="Dispositivo a ser vinculado"
                    w={"1.9rem"}
                    h={"1.9rem"}
                    mr={"0.5rem"}
                    icon={<BsSearch />}
                    ref={btnRef}
                    colorScheme="teal"
                    onClick={() => {
                      onOpen();
                      setOpenDrawer("device");
                    }}
                  />
                  {devices && (
                    <Text>
                      {devices?.find((device) => deviceId === device.id)?.serie}
                    </Text>
                  )}
                </InputGroup>

                <Flex display="inline">
                  <Button
                    colorScheme="cyan"
                    variant="outline"
                    top="0"
                    left="0rem"
                    margin="2rem"
                    onClick={async () => {
                      const junctionRes = await junction();
                      if (junctionRes === true) {
                        setDeviceId("");
                        setProviderId("");
                      } else {
                        if (!toast.isActive("junctionError")) {
                          toast({
                            id: "junctionError",
                            position: "top-right",
                            title: "Erro ao vincular",
                            description: "Erro ao vincular",
                            status: "error",
                          });
                        }
                      }
                    }}
                  >
                    Vincular
                  </Button>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    top="0"
                    left="0rem"
                    margin="2rem"
                    w="6.4475rem"
                  >
                    Desvincular
                  </Button>
                </Flex>
                <Drawer
                  isOpen={isOpen}
                  placement="right"
                  onClose={onClose}
                  size="lg"
                >
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Vincular</DrawerHeader>
                    <DrawerBody overflow="hidden">
                      <Divider />
                      {openDrawer === "device" ? (
                        <DeviceList onClose={onClose} />
                      ) : openDrawer === "provider" ? (
                        <ProviderList onClose={onClose} />
                      ) : null}
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Stack>
              <Flex marginLeft="10rem" display="inline-flex">
                <Stack
                  direction="column"
                  spacing={2}
                  align="center"
                  display="flex"
                ></Stack>
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" borderRadius="2rem">
                <b>LISTAGEM DE PRESTADORES COM APARELHOS</b>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <Box>
            <Text mb={"1rem"}>Filtros</Text>
            <Stack
              spacing={1}
              display={"flex"}
              flexDirection={"row"}
              mb={"1rem"}
            >
              <InputGroup>
                <IconButton
                  variant="outline"
                  aria-label="Buscar"
                  w={"1.9rem"}
                  h={"1.9rem"}
                  mr={"0.5rem"}
                  icon={<BsSearch />}
                  // ref={btnRef}
                  colorScheme="teal"
                />
                <Select w={"20rem"} size={"md"} placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <IconButton
                  variant="outline"
                  aria-label="Buscar"
                  w={"1.9rem"}
                  h={"1.9rem"}
                  mr={"0.5rem"}
                  icon={<BsSearch />}
                  // ref={btnRef}
                  colorScheme="teal"
                />
                <Select w={"20rem"} size={"md"} placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <IconButton
                  variant="outline"
                  aria-label="Buscar"
                  w={"1.9rem"}
                  h={"1.9rem"}
                  mr={"0.5rem"}
                  icon={<BsSearch />}
                  // ref={btnRef}
                  colorScheme="teal"
                />
                <Select w={"20rem"} size={"md"} placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </InputGroup>
              <InputGroup>
                <IconButton
                  variant="outline"
                  aria-label="Buscar"
                  w={"1.9rem"}
                  h={"1.9rem"}
                  mr={"0.5rem"}
                  icon={<BsSearch />}
                  // ref={btnRef}
                  colorScheme="teal"
                />
                <Select w={"20rem"} size={"md"} placeholder="Select option">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </InputGroup>
            </Stack>
          </Box>
          <Divider />
          <AccordionPanel pb={4}>
            <List spacing={1} display="flex" flexDirection={"column"}>
              {providers?.map((provider) => (
                <>
                  <Button
                    key={provider.id}
                    ref={btnRef}
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
                          <Text textTransform={"uppercase"}>
                            {provider.codigo}
                          </Text>
                          <Text fontSize={"0.7rem"} textTransform={"uppercase"}>
                            {provider.nome}
                          </Text>
                        </Stack>
                      </Stack>
                      <Box display={"flex"} justifyContent={"flex-end"}>
                        <Text textTransform={"uppercase"}>
                          Vinculado ao apararelho:{" "}
                        </Text>
                      </Box>
                    </ListItem>
                  </Button>
                  <Divider />
                </>
              ))}
            </List>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

ConnectDeviceProvider.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ConnectDeviceProvider;
