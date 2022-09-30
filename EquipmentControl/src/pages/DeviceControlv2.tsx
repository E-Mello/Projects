import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Switch,
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
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";

export function DeviceControlv2() {
    return (

        <Flex
            pos="relative"
            right="1rem"
            left="3rem"
            h="50rem"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
            borderRadius="1.6875rem"
            w="100rem"
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
                <AccordionItem
                    borderRadius="2rem"
                >
                    <h2>
                        <AccordionButton>
                            <Box
                                flex='1'
                                textAlign='left'
                                borderRadius="1.7rem"
                            >
                                Aparelho
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <Flex
                            pos="sticky"
                            flexDir="row"
                            alignItems="center"
                            top="15rem"
                        >
                            <FormControl
                                pos="relative"
                                flexDir="row"
                                alignItems="center"
                                width="25rem"
                                left="5rem"
                            >
                                <Stack marginBottom="0.5rem">
                                    <FormLabel>Modelo do Leitor</FormLabel>
                                    <Input placeholder='Ex: BIOFII-S174' size='md' fontSize={15} />
                                </Stack>
                                <Stack>
                                    <FormLabel>Serie do Leitor</FormLabel>
                                    <Input placeholder='Ex: 150675' size='md' fontSize={15} />
                                </Stack>
                            </FormControl>
                            <Flex
                                marginLeft="10rem"
                                display="inline-flex"
                            >
                                <Stack
                                    direction='column'
                                    spacing={2}
                                    align='center'
                                    display="flex"
                                >
                                    <Flex display="inline">
                                        <Button
                                            colorScheme='blackAlpha'
                                            variant='outline'
                                            top="0"
                                            left="0rem"
                                            margin="2rem"

                                        >
                                            Cadastrar
                                        </Button>
                                        <Button
                                            colorScheme='blackAlpha'
                                            variant='outline'
                                            top="0"
                                            left="0rem"
                                        >
                                            Cadastrar
                                        </Button>
                                        <Stack direction='row'>
                                            <Switch colorScheme='blue' size='lg' />
                                        </Stack>
                                    </Flex>
                                </Stack>
                            </Flex>
                        </Flex>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left' borderRadius="2rem">
                                Section 2 title
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Flex>
    );
}