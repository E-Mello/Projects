import {
    AspectRatio,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Stack
} from "@chakra-ui/react";
import { useState } from "react";

export function RegisterDevice() {
    return (
        <Flex
            pos="relative"
            top="5rem"
            right="1rem"
            left="3rem"
            h="40rem"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0,0,0,0.5)"
            borderRadius="1.6875rem"
            w="100rem"
            flexDir="column"
            justifyContent="space-between"
            backgroundColor="#f1f1f1 !important"
        >
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
                    width="50rem"
                    left="5rem"
                >
                    <Stack spacing={3}
                        marginBottom="3rem"
                    >
                        <FormLabel>Modelo do Leitor</FormLabel>
                        <Input placeholder='Ex: BIOFII-S174' size='lg' fontSize={15} />
                    </Stack>
                    <Stack spacing={3}>
                        <FormLabel>Serie do Leitor</FormLabel>
                        <Input placeholder='Ex: 150675' size='lg' fontSize={15} />
                    </Stack>
                    <Stack
                        direction='column'
                        spacing={2}
                        align='center'
                    >
                        <Button
                            colorScheme='blackAlpha'
                            variant='outline'
                            top="5rem"
                            left="5rem"
                        >
                            Cadastrar
                        </Button>
                    </Stack>
                </FormControl>
            </Flex>
        </Flex>
    );
}