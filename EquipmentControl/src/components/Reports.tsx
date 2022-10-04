import {
    Flex,
    Tab,
    Table,
    TableCaption,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";


export function Reports() {
    return (
        <Flex
            pos="relative"
            h="50rem"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
            borderRadius="1.6875rem"
            w="100%"
            flexDir="column"
            justifyContent="space-between"
            backgroundColor="#f1f1f1 !important"
        >
            <Tabs align='end' variant='enclosed'>
                <TabList>
                    <Tab _selected={{ color: 'white', bg: 'green.400' }} borderRadius="1.6875rem 0 0 0">One</Tab>
                    <Tab _selected={{ color: 'white', bg: 'green.400' }} borderRadius="0 1.6875rem 0 0">Two</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <TableContainer>
                            <Table variant='striped' colorScheme='blackAlpha'>
                                <TableCaption>Relatorio de aparelhos x prestadores</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Codigo do prestador</Th>
                                        <Th>Nome do prestador</Th>
                                        <Th>Quantidade atual de aparelhos locados</Th>
                                        <Th>Serie dos aparelhos locados</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>279002000030</Td>
                                        <Td>FUNDACAO DE SAUDE COMUNITARIA DE SINOP</Td>
                                        <Td>2</Td>
                                        <Td>1542489</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>279002000030</Td>
                                        <Td>FUNDACAO DE SAUDE COMUNITARIA DE SINOP</Td>
                                        <Td>2</Td>
                                        <Td>1542489</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>279002000030</Td>
                                        <Td>FUNDACAO DE SAUDE COMUNITARIA DE SINOP</Td>
                                        <Td>2</Td>
                                        <Td>1542489</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel>
                        <TableContainer>
                            <Table variant='striped' colorScheme='blackAlpha'>
                                <TableCaption>Relatorio de aparelhos x prestadores</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Codigo do prestador</Th>
                                        <Th>Nome do prestador</Th>
                                        <Th>Quantidade atual de aparelhos locados</Th>
                                        <Th>Serie dos aparelhos locados</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td>279002000013</Td>
                                        <Td>HOSPITAL E MATERNIDADE DOIS PINHEIROS LTDA</Td>
                                        <Td>1</Td>
                                        <Td>9852361</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>279002000013</Td>
                                        <Td>HOSPITAL E MATERNIDADE DOIS PINHEIROS LTDA</Td>
                                        <Td>1</Td>
                                        <Td>9852361</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>279002000013</Td>
                                        <Td>HOSPITAL E MATERNIDADE DOIS PINHEIROS LTDA</Td>
                                        <Td>1</Td>
                                        <Td>9852361</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
}