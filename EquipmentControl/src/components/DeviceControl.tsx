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
    Input,
    Stack,
    Switch,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,

} from "@chakra-ui/react";
import React from "react";

export function DeviceControl() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
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
                <AccordionItem
                    borderRadius="2rem"
                >
                    <AccordionButton>
                        <Box
                            flex='1'
                            textAlign='left'
                            borderRadius="1.7rem"
                        >
                            Cadastrar Aparelho
                        </Box>
                        <AccordionIcon />

                    </AccordionButton>
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
                                            colorScheme='cyan'
                                            variant='outline'
                                            top="0"
                                            left="0rem"
                                            margin="2rem"

                                        >
                                            Cadastrar
                                        </Button>
                                        <Stack
                                            direction='row'
                                        >

                                            <Switch
                                                left="2rem"
                                                colorScheme='cyan'
                                                size='lg'
                                            />
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
                            <Box flex='1' textAlign='left' borderRadius="2rem">
                                Vincular/Desvincular
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
                                    <FormLabel>Serie do Leitor</FormLabel>
                                    <Input placeholder='Ex: 150675' size='md' fontSize={15} />
                                </Stack>
                                <Stack>
                                    <FormLabel>Prestador</FormLabel>
                                    <Input placeholder='Digite o código ou o nome' size='md' fontSize={15} />
                                    <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
                                        Open
                                    </Button>
                                    <Drawer
                                        isOpen={isOpen}
                                        placement='right'
                                        onClose={onClose}
                                        initialFocusRef={btnRef}
                                    >
                                        <DrawerOverlay />
                                        <DrawerContent>
                                            <DrawerCloseButton />
                                            <DrawerHeader>Create your account</DrawerHeader>

                                            <DrawerBody>
                                                <Input placeholder='Type here...' />
                                            </DrawerBody>

                                            <DrawerFooter>
                                                <Button variant='outline' mr={3} onClick={onClose}>
                                                    Cancel
                                                </Button>
                                                <Button colorScheme='blue'>Save</Button>
                                            </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
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
                                            colorScheme='cyan'
                                            variant='outline'
                                            top="0"
                                            left="0rem"
                                            margin="2rem"

                                        >
                                            Vincular
                                        </Button>
                                        <Button
                                            colorScheme='red'
                                            variant='outline'
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
            </Accordion >
        </Flex >
    );
}