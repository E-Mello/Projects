//https://dev.to/franciscomendes10866/build-a-full-stack-app-with-nextjs-tailwind-trpc-and-prisma-orm-4ail
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import CardDevice from "../components/CardDevice";
import type { Device } from "../components/InterfaceDevice";
import { FcSearch } from "react-icons/fc";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
// import type { Props } from "../components/CardDevice";
import type { ReactElement } from "react";
import { supabase } from "../server/db/supabaseClient";

const DeviceControl: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [value, setValue] = useState<any[]>([]);
  const [equipValues, setEquipValues] = useState({
    id: "",
    modelo: "",
    serie: "",
    idprestador: "",
  });
  const [listEquipment, setListEquipment] = useState<Device>();
  const [listCardDevice, setListCardDevice] = useState<Device>();

  const [editDeviceControl, setEditDeviceControl] = useState<any[]>([]);

  useEffect(() => {
    getDevice();
  }, []);

  async function getDevice() {
    try {
      const { data: equipamento, error } = await supabase
        .from("equipamento")
        .select("id, modelo, serie, active");

      if (error) throw error;
      if (equipamento != null) {
        setListEquipment(equipamento); //Aqui eu estou tentando setar o state listEquipment com o valor que vem do banco de dados
        console.log("listEquipment", listEquipment);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  const handleChangeEquipValues = (value: {
    target: { name: string; value: string };
  }) => {
    //setValue(value);
    //console.log(value.target.value);
    setEquipValues((prevValue: string | any) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };
  const handleChangeValues = (value: {
    target: { name: string; value: string };
  }) => {
    setValue((prevValue: string | any) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };
  async function handleRegisterEquip() {
    try {
      const { data, error } = await supabase
        .from("equipamento")
        .insert([{ modelo: equipValues.modelo, serie: equipValues.serie }]);
    } catch (error: any) {
      alert(error.message);
    }
  }
  // console.log(listEquipment);
  const handleClickButton = () => {
    console.log(listEquipment);
  };

  const btnRef = useRef(null);

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
        defaultIndex={[0]}
        allowMultiple
        borderRadius="1.6875rem"
        w="99%"
        pos="absolute"
        left="0.5rem"
      >
        <AccordionItem borderRadius="2rem">
          <AccordionButton>
            <Box flex="1" textAlign="left" borderRadius="1.7rem">
              Cadastrar Aparelho
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <Flex pos="sticky" flexDir="row" alignItems="center" top="15rem">
              <FormControl
                pos="relative"
                flexDir="row"
                alignItems="center"
                width="25rem"
                left="5rem"
              >
                <Stack marginBottom="0.5rem">
                  <FormLabel>Modelo do Leitor</FormLabel>
                  <Input
                    placeholder="Ex: BIOFII-S174"
                    size="md"
                    fontSize={15}
                    name="modelo"
                    onChange={handleChangeEquipValues}
                    value={value.modelo}
                  />
                </Stack>
                <Stack>
                  <FormLabel>Serie do Leitor</FormLabel>
                  <Input
                    placeholder="Ex: 150675"
                    size="md"
                    fontSize={15}
                    name="serie"
                    onChange={handleChangeEquipValues}
                    value={value.serie}
                  />
                </Stack>
              </FormControl>
              <Flex marginLeft="10rem" display="inline-flex">
                <Stack
                  direction="column"
                  spacing={2}
                  align="center"
                  display="flex"
                >
                  <Flex display="inline">
                    <Button
                      colorScheme="cyan"
                      variant="outline"
                      top="0"
                      left="0rem"
                      margin="2rem"
                      onClick={handleRegisterEquip}
                    >
                      Cadastrar
                    </Button>
                    <Stack direction="row">
                      <Switch left="2rem" colorScheme="cyan" size="lg" />
                    </Stack>
                    Ativar/Desativar
                  </Flex>
                </Stack>
              </Flex>
            </Flex>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left" borderRadius="2rem">
                Editar Cadastro de Aparelho
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Flex pos="sticky" flexDir="row" alignItems="center" top="15rem">
              <FormControl
                pos="relative"
                flexDir="row"
                alignItems="center"
                width="25rem"
                left="5rem"
              >
                <Stack marginBottom="0.5rem">
                  <FormLabel>Modelo do Leitor</FormLabel>
                  <Input size="md" fontSize={15} name="modelo" />
                </Stack>
                <Stack>
                  <FormLabel>Serie do Leitor</FormLabel>
                  <Input size="md" fontSize={15} name="serie" />
                </Stack>
              </FormControl>
              <Flex marginLeft="10rem" display="inline-flex">
                <Stack>
                  <Flex position="relative" left="5rem">
                    <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                      Localizar Aparelho
                    </Button>
                    <Drawer
                      isOpen={isOpen}
                      placement="right"
                      onClose={onClose}
                      finalFocusRef={btnRef}
                    >
                      <DrawerOverlay />
                      <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>Listagem de Aparelhos</DrawerHeader>

                        <DrawerBody
                        // overflow='hidden'
                        >
                          <Flex alignItems="center">
                            <Input
                              placeholder="Type here..."
                              w="90%"
                              onChange={handleChangeValues}
                              name="name"
                            />
                            <FcSearch
                              size={30}
                              cursor="pointer"
                              onClick={() => handleClickButton()}
                            />
                          </Flex>
                          <br></br>
                          <Flex display="inline-block">
                            {typeof listEquipment !== "undefined" &&
                              listEquipment.map((value) => {
                                return (
                                  <CardDevice
                                    key={value.id}
                                    listCardDevice={listEquipment}
                                    setListCardDevice={setListEquipment}
                                    modelo={value.modelo}
                                    serie={value.serie}
                                    // onClick={handleGetDeviceData(value.id, value)}
                                  />
                                );
                              })}
                          </Flex>
                        </DrawerBody>
                      </DrawerContent>
                    </Drawer>
                  </Flex>
                </Stack>
                <Stack
                  direction="column"
                  spacing={2}
                  align="center"
                  display="flex"
                >
                  <Flex
                    display="inline"
                    position="relative"
                    top="2rem"
                    left="-14rem"
                  >
                    <Button
                      colorScheme="cyan"
                      variant="outline"
                      top="0"
                      left="0rem"
                      margin="2rem"
                    >
                      Salvar Alterações
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      top="0"
                      left="0rem"
                      margin="2rem"
                    >
                      Excluir Aparelho
                    </Button>
                  </Flex>
                </Stack>
              </Flex>
            </Flex>
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
