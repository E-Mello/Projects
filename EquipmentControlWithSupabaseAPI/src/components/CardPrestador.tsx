import { Box, Center, Divider, Flex } from "@chakra-ui/react";
// import React, { useState } from "react"; // Não faço a menor ideia porque coloquei essas paradinha, mais vou deixar comentado para caso precisar
//import { BsListOl } from "react-icons/bs"; //Não me recordo para que utilizei esse icon, porém, deixei comentado para caso precise em algum momento

//Definido a interface de propriedades para utilizar no CardPrestador
export interface Props {
  key?: number; //Coloquei apenas para tirar um erro que estava aparecendo, não sei explicar a real necessidade dessa propriedade
  nome: string; //Tipado a propriedade nome
  cpf: string | any; //Tipo a propriedade cpf
  listCardPrestador: string | any; //Não me recordo porque tipei esse state, sei apenas que foi para corrigir um erro
  setListCardPrestador: string | any; //Não me recordo porque tipei esse state, sei apenas que foi para corrigir um erro
}

//Função CardPrestador utilizado para renderizar a lista de prestadores consultado no banco de dados
export default function CardPrestador(props: Props) {
  return (
    // Não me recordo da real necessidade desse componente, apenas fui inserindo para o layoyt ficar de acordo como desejava
    <Center display="inline-block">
      {/* Definido o componente Flex pois estava bugado o css e com isso resolveu */}
      <Flex fontSize="sm" display="block" width="18rem">
        {/* Para cada resultado do banco de dados, é retornado um box contendo as informações retornadas do banco */}
        <Box
          display="inline-block"
          boxShadow="-3px 0 8px #00995da3, 10px 0 8px -8px #00995da3"
          borderRadius="4px"
          cursor="pointer"
        >
          NOME: {props.nome}
          <br></br>
          CNPJ / CPF: {props.cpf}
        </Box>
        {/* Divisor de cada resultado encontrado do banco */}
        <Divider />
      </Flex>
      <br />
    </Center>
  );
}
