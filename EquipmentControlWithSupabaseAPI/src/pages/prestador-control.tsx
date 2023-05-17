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
// import CardDevice, { Props } from "../components/CardDevice";
import React, { useEffect, useRef, useState } from "react";

import CardPrestador from "../components/CardPrestador";
import { FcSearch } from "react-icons/fc";
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { Prestador } from "../components/InterfacePrestador";
import type { ReactElement } from "react";
import { supabase } from "../server/db/supabaseClient";

const PrestadorControl: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState<any[]>([]);
  const [listPrestador, setListPrestador] = useState<Prestador>(); // State usado para armazenar a lista de prestador e setar a lista de prestador
  const [listCardPrestador, setListCardPrestador] = useState<Prestador>();

  useEffect(() => {
    getPrestador();
  }, []);

  async function getPrestador() {
    try {
      const { data, error } = await supabase.from("prestador").select("*");

      if (error) throw error;
      if (data != null) {
        setListPrestador(data); //Aqui eu estou tentando setar o state listEquipment com o valor que vem do banco de dados
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  const handleChangePrestValues = (value: {
    target: { name: string; value: string };
  }) => {
    //setValue(value);
    //console.log(value.target.value);
    setValue((prevValue: string | any) => ({
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
  async function handleRegisterPrest() {
    try {
      const { data, error } = await supabase
        .from("prestador")
        .insert([{ some_column: "someValue" }, { some_column: "otherValue" }]);
    } catch (error: any) {
      alert(error.message);
    }
  }

  async function handleUpdatePrest() {
    try {
      const { data, error } = await supabase
        .from("prestador")
        .update({ other_column: "otherValue" })
        .eq("some_column", "someValue");
    } catch (error: any) {
      alert(error.message);
    }
  }

  // console.log(listEquipment);
  const handleClickButton = () => {
    console.log(listPrestador);
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
              Cadastrar Prestador
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
                  <FormLabel>Nome / Razão Social</FormLabel>
                  <Input
                    size="md"
                    fontSize={15}
                    name="name"
                    onChange={handleChangePrestValues}
                    value={value.name}
                  />
                </Stack>
                <Stack>
                  <FormLabel>CPF / CNPJ</FormLabel>
                  <Input
                    size="md"
                    fontSize={15}
                    name="cpf"
                    onChange={handleChangePrestValues}
                    value={value.cpf}
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
                      onClick={handleRegisterPrest}
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
                Editar Cadastro de Prestador
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
                  <FormLabel>Nome / Razão Social</FormLabel>
                  <Input size="md" fontSize={15} name="modelo" />
                </Stack>
                <Stack>
                  <FormLabel>CPF / CNPJ</FormLabel>
                  <Input size="md" fontSize={15} name="serie" />
                </Stack>
              </FormControl>
              <Flex marginLeft="10rem" display="inline-flex">
                <Stack>
                  <Flex position="relative" left="5rem">
                    <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
                      Localizar Prestador
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
                        <DrawerHeader>Listagem de Prestadores</DrawerHeader>

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
                            {typeof listPrestador !== "undefined" &&
                              listPrestador.map((value) => {
                                return (
                                  <CardPrestador
                                    key={value.id}
                                    listCardPrestador={listCardPrestador}
                                    setListCardPrestador={setListCardPrestador}
                                    nome={value.nome}
                                    cpf={value.cpf}
                                    // onClick={handlegetPrestadorData(value.id, value)}
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
                      Excluir Prestador
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

PrestadorControl.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default PrestadorControl;
