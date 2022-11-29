import { Box, Flex, Divider, Center, Text } from "@chakra-ui/react";
// import { ValueTarget } from "framer-motion"; //Acabei não usando mais, porém, não lembro porque usei, então deixei comentado aqui
import React, { useState, PropsWithChildren } from "react";
//import { BsListOl } from "react-icons/bs"; //Acabei não usando mais, porém, não lembro porque usei, então deixei comentado aqui

//Aqui foi criado a interface para utilizar nas propriedades desse componente (CardDevice)
export interface Props {
    children?: React.ReactNode | React.ReactNode[]; //Estava dando um erro de children na importação desse componente no (DeviceControl)
    key?: number; //Não faço a menor ideia porque coloquei essa propriedade, porém, tava dando erro e fui preenchendo :3
    modelo: string; //Aqui eu acreditei estar tipando minha propriedade modelo
    serie: string;//Aqui eu acreditei estar tipando minha propriedade serie
    listCardDevice: string | any; //Não faço a menor ideia porque coloquei esse state no (DeviceControl), porém, como coloquei, deu erro e para corrigir, acrescentei essa propriedade
    setListCardDevice: string | any; //Não faço a menor ideia porque coloquei esse state no (DeviceControl), porém, como coloquei, deu erro e para corrigir, acrescentei essa propriedade
}

//Componente CardDevice utilizado para renderizar as informações dos aparelhos do banco de dados
export default function CardDevice(props: Props) {
    return (
        //Inserido esse componente para tentar deixar o layout de uma forma agradavel (layout para mostrar os aparelhost)
        <Center
            display='inline-block'
        >
            {/* Inserido esse componente para tentar deixar o layout de uma forma agradavel (layout para mostrar os aparelhost*/}
            <Flex
                fontSize='sm'
                display='block'
                width='18rem'
            >
                {/* O box eu usei para deixar as linhas coerentes e em forma de coluna */}
                <Box
                    display='inline-block'
                    // boxShadow="-3px 0 8px #00995da3, 10px 0 8px -8px #00995da3"
                    // borderRadius="4px"
                    cursor="pointer"
                // onClick={handleChangeValues}
                >
                    {/* Estava procurando um componente no Chakra que mais se assemelha ao p(paragraph) do html */}
                    <Text
                        margin="0.2rem 0.2rem 0.2rem 0.2rem"
                    >
                        Modelo: {props.modelo}
                    </Text>
                    <Text>Serie: {props.serie}</Text>
                </Box>
                {/* Divisor para separar cada linha criada (cada resultado do banco que vai ser retornado) */}
                <Divider />
            </Flex>
            <br />
        </Center >
    )
}