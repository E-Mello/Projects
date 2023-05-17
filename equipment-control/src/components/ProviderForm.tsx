import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  Spinner,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { BsBullseye, BsFileEarmarkPersonFill } from "react-icons/bs";
import { MdAccountCircle, MdEmail, MdPhone } from "react-icons/md";

import { BiRename } from "react-icons/bi";
import type { ProviderResponseSchema } from "../server/common/ProviderSchema";
import { ProviderUpdateSchema } from "../server/common/ProviderSchema";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ProviderFormProps = {
  provider: z.infer<typeof ProviderResponseSchema>;
  onCancel: () => void;
  afterSubmit?: () => void;
};

export function ProviderForm({
  provider,
  onCancel,
  afterSubmit,
}: ProviderFormProps) {
  const utils = trpc.useContext();
  const { mutateAsync: update } = trpc.provider.update.useMutation({
    onSuccess: () => {
      utils.provider.getAll.invalidate();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof ProviderUpdateSchema>>({
    resolver: zodResolver(ProviderUpdateSchema),
    defaultValues: provider,
  });
  const updateProvider: SubmitHandler<
    z.infer<typeof ProviderUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    afterSubmit && afterSubmit();
    console.log("res", res);
    reset();
  };

  const { mutate } = trpc.provider.delete.useMutation({
    onSuccess: () => {
      utils.provider.invalidate();
    },
  });

  async function handleDeleteProvider() {
    try {
      await mutate({ id: provider.id });
    } catch (error) {
      console.log("Error deleting provider:", error);
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(updateProvider)}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <FormLabel>Codigo</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Password"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<MdAccountCircle />}
          />
          <Input
            type="text"
            disabled={isSubmitting}
            placeholder="Write de Provider Code"
            w={"20rem"}
            h={"2rem"}
            isInvalid={errors.codigo?.message ? true : false}
            {...register("codigo")}
          />
        </InputGroup>
        <FormLabel>Email Address</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Send email"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<MdEmail />}
          />
          <Input
            type="email"
            w={"20rem"}
            placeholder="Write your e-mail adress"
            h={"2rem"}
            {...register("email")}
          />
        </InputGroup>
        <FormLabel>Nome / Razão Social</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Password"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<BiRename />}
          />
          <Input
            type="text"
            w={"30rem"}
            placeholder="Write your name or Corporate Name"
            h={"2rem"}
            {...register("nome")}
          />
        </InputGroup>
        <FormLabel>CPF / CNPJ</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="cpf/cnpj"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<BsFileEarmarkPersonFill />}
          />
          <Input
            type="text"
            w={"20rem"}
            placeholder="Write your CPF or CNPJ"
            h={"2rem"}
            {...register("cpf")}
          />
        </InputGroup>
        <FormLabel>Telefone</FormLabel>
        <InputGroup size="md">
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Phone"
            fontSize="1.2rem"
            w={"1.9rem"}
            h={"1.9rem"}
            icon={<MdPhone />}
            mr={"0.5rem"}
          />
          <Input
            type="tel"
            placeholder="Phone number"
            w={"20rem"}
            h={"2rem"}
            {...register("tel_first")}
          />
        </InputGroup>
        <FormLabel>Telefone 02</FormLabel>
        <InputGroup size="md">
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Phone"
            fontSize="1.2rem"
            w={"1.9rem"}
            h={"1.9rem"}
            icon={<MdPhone />}
            mr={"0.5rem"}
          />
          <Input
            type="tel"
            placeholder="Phone number"
            w={"20rem"}
            h={"2rem"}
            {...register("tel_sec")}
          />
        </InputGroup>
        <FormLabel>Status</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Password"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<BsBullseye />}
          />
          <Stack
            flexDirection="row"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Switch
              mr={"1rem"}
              colorScheme="cyan"
              size="lg"
              {...register("active")}
            />
            <FormLabel display={"flex"}>Ativar/Desativar</FormLabel>
          </Stack>
        </InputGroup>
      </Box>
      <Button
        variant="outline"
        mr={3}
        mt={"2rem"}
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button
        colorScheme="teal"
        variant="outline"
        mt={"2rem"}
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Changing..." : "Change data"}
      </Button>
      <Button
        colorScheme="red"
        variant="outline"
        mt={"2rem"}
        ml={"1rem"}
        type="button"
        disabled={isSubmitting}
        onClick={handleDeleteProvider}
      >
        {isSubmitting ? (
          <Spinner color="red.500" size={"md"} />
        ) : (
          "Delete Provider"
        )}
      </Button>
    </Box>
  );
}
