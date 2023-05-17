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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react"; // Importação dos componentes do ReactJS

import CardPrestador from "../components/CardPrestador"; // Importação do CardPrestador para mostrar na minha rota de Aparelhos x Prestadores a informação retornada do banco, relacionada ao prestador
import { FcSearch } from "react-icons/fc"; // Importação do incone de pesquisa, utilizado para pesquisar os prestadores
import Layout from "../components/Layout";
import type { NextPageWithLayout } from "../types/layout";
import type { Prestador } from "../components/InterfacePrestador";
import type { ReactElement } from "react";
import { supabase } from "../server/db/supabaseClient";

//Minha função principal (componente para renderizar minha rota de Aparelhos x Prestadores)
const ConnectDeviceProvider: NextPageWithLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); //State usado para abrir e fechar meu Drawer
  const [value, setValue] = useState(); //State usado para captar o value escrito no campo, ou seja, sempre que digito ele vai captar o que eu digitei (armazena o que o usuário digitar)
  const [listPrestador, setListPrestador] = useState<Prestador>(); // State usado para armazenar a lista de prestador e setar a lista de prestador
  const [listCard, setListCard] = useState(); //Não faço a menor ideia porque coloquei esse state aqui, coloquei isso também no meu CardPrestador, e como estava funcionando, não parei pra entender

  //Necessáriamente não me lembro porque dupliquei isso, dessa forma, vou manter comentado, em algum momento vou usar (se necessário) se não, depois deleto
  // const handleChangeEquipValues = (value: { target: { name: string; value: string; }; }) => {
  //     //setValue(value);
  //     //console.log(value.target.value);
  //     setValue((prevValue: string | any) => ({
  //         ...prevValue,
  //         [value.target.name]: value.target.value,
  //     }));

  // }

  //Função criada para captar os valores digitados no determinado campo
  const handleChangeValues = (value: {
    target: { name: string; value: string };
  }) => {
    //setValue(value);
    //console.log(value.target.value);
    setValue((prevValue: string | any) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  //UseEffect criado para pegar os dados dessa rota /getPrestador e caso tenha algum dado, ele me retorna em forma de Json
  useEffect(() => {
    getPrestador();
  }, []);

  async function getPrestador() {
    try {
      const { data, error } = await supabase.from("prestador").select("*");
      if (error) throw error;
      if (data != null) {
        setListPrestador(data);
      }
    } catch (error: any) {
      alert(error.message);
    }
  }

  //Constante criado para me mostrar no console a minha lista de prestador (apenas para visualizar)
  const handleClickButton = () => {
    console.log(listPrestador);
  };

  //Não me recordo porque tive que fazer isso, eu lembro que a propriedade null eu tive que preencher pra corrigir um problema e sem isso não funciona corretamente
  const btnRef = React.useRef(null);

  return (
         //Em tese, essa é a divFlex que vai conter as informações da aba Aparelho x Prestador
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
          {/* Componente utilizado para criar as sessões, ou seja, quando clicar nos AccordionButton ele abstrai a informação da tela, ou seja, podemos criar varios conteúdos na mesma página e não deixa-lá "poluída"  */}
          <Accordion
            defaultIndex={[0]}
            allowMultiple
            borderRadius="1.6875rem"
            w="99%"
            pos="absolute"
            left="0.5rem"
          >
            {/* AccordionItem é responsável por representar cada sessões da "página", ou seja, podemos preenche-la com varios Items e deixa-los minimizados */}
            <AccordionItem borderRadius="2rem">
              {/* Aqui é a funcionabilidade de fechar e abrir os AccordioItems */}
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left" borderRadius="2rem">
                    Vincular/Desvincular
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              {/* Dentro do AccordionPanel é especificado o conteudo do meu Accordion, ou seja, tudo que vai ficar dentro de cada "Session" */}
              <AccordionPanel pb={4}>
                {/* Criado uma divFlex para inserir as informações necessárias do AccordionPanel */}
                <Flex
                  pos="sticky"
                  flexDir="row"
                  alignItems="center"
                  top="15rem"
                >
                  {/* Feito um FormControl, pois a ideia é ter dois campos de inputs para vincular/desvincular Aparelho x Prestador */}
                  <FormControl
                    pos="relative"
                    flexDir="row"
                    alignItems="center"
                    width="25rem"
                    left="5rem"
                  >
                    {/* Stack criada para registrar a Label e o Input  do campo leitor*/}
                    <Stack marginBottom="0.5rem">
                      <FormLabel>Serie do Leitor</FormLabel>
                      <Input placeholder="Ex: 150675" size="md" fontSize={15} />
                    </Stack>
                    {/* Stack criada para registrar a Label e o Input  do campo prestador */}
                    <Stack>
                      <FormLabel>Prestador</FormLabel>
                      <Input
                        placeholder="Digite o código ou o nome"
                        size="md"
                        fontSize={15}
                      />
                      {/* Não me recordo porque coloquei esse negocio aqui antes do button, uma hora eu vejo */}
                      <>
                        {/* Aqui foi um button de exemplo, para abrir um Drawer e pesquisar os prestadores para efetuar o vinculo */}
                        <Button
                          ref={btnRef}
                          colorScheme="teal"
                          onClick={onOpen}
                        >
                          Procurar Prestador
                        </Button>
                        {/* Aqui inicia o Drawer, ou seja, a estrutura que vai conter os campos derivados a pesquisa dos prestadores */}
                        <Drawer
                          isOpen={isOpen}
                          placement="right"
                          onClose={onClose}
                          finalFocusRef={btnRef}
                        >
                          TODO:{" "}
                          {/* Não lembro para que serve o DraweOverlay, uma hora pesquiso e coloco aqui */}
                          <DrawerOverlay />
                          {/* Aqui seria o conteudo do meu Drawer, os componentes e informações necessárias*/}
                          <DrawerContent>
                            {/* Aqui é o button utilizado para fechar o Drawer */}
                            <DrawerCloseButton />
                            {/* O Header do meu Drawer */}
                            <DrawerHeader>Pesquisar Prestador</DrawerHeader>
                            {/* Dentro do Body é onde vai estar as informações puxadas do banco */}
                            <DrawerBody overflow="hidden">
                              {/* Criado um componente Flex para as informações estarem de maneira organizadas dentro do Body */}
                              <Flex alignItems="center">
                                {/* TODO: Apenas criei o input, falta criar aqui uma forma de efetuar a pesquisa do prestador em forma de Like, ir digitando e a aplicação ir efetuand a busca no banco de dados */}
                                <Input
                                  placeholder="Type here..."
                                  w="90%"
                                  onChange={handleChangeValues}
                                  name="name"
                                />
                                {/* Icon de pesquisa, para ter a opção de pesquisar o prestador clicando nele*/}
                                <FcSearch
                                  size={30}
                                  cursor="pointer"
                                  onClick={() => handleClickButton()}
                                />
                              </Flex>
                              {/* Br foi utilizado aqui para dar um espaçamento entre o meu "header" do DrawerBody e do corpo em sí */}
                              <br></br>
                              {/* DivFlex utilizada para conter a busca pelos prestadores */}
                              <Flex display="inline-block">
                                {/* Map utilizado para buscar todos os prestadores que estavam contido no state listPrestador */}
                                {/* TODO: Ele estava buscando apenas quando abria manualmente a janela /getPrestador manualmente e estava trazendo todos, dessa forma, é necessário que a pesquisa seja feita enquanto o usuário digite e traga somente o necessário */}
                                {typeof listPrestador !== "undefined" &&
                                  listPrestador.map((value) => {
                                    return (
                                      <CardPrestador
                                        key={value.id}
                                        listCard={listPrestador}
                                        setListCard={setListPrestador}
                                        nome={value.nome}
                                        cpf={value.cpf}
                                      />
                                    );
                                  })}
                              </Flex>
                            </DrawerBody>
                          </DrawerContent>
                        </Drawer>
                      </>
                    </Stack>
                  </FormControl>
                  {/* Aqui seria a DivFlex a direita da tela, onde estariam contidos os botões de vincular e desvincular e o de buscar prestador e leitor */}
                  <Flex marginLeft="10rem" display="inline-flex">
                    {/* Stack criada para incluir os button */}
                    <Stack
                      direction="column"
                      spacing={2}
                      align="center"
                      display="flex"
                    >
                      {/* DivFlex criada para organizar os Button */}
                      <Flex display="inline">
                        {/* Button para vincular Aparelho x Prestador */}
                        <Button
                          colorScheme="cyan"
                          variant="outline"
                          top="0"
                          left="0rem"
                          margin="2rem"
                        >
                          Vincular
                        </Button>
                        {/* Button para desvincular Aparelho x Prestador */}
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
                    </Stack>
                  </Flex>
                </Flex>
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
