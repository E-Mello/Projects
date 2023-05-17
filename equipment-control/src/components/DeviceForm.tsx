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
import { BsBullseye, BsClipboard } from "react-icons/bs";

import type { DeviceResponseSchema } from "../server/common/DeviceSchema";
import { DeviceUpdateSchema } from "../server/common/DeviceSchema";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type DeviceFormProps = {
  device: z.infer<typeof DeviceResponseSchema>;
  onCancel: () => void;
  afterSubmit?: () => void;
};

export function DeviceForm({ device, onCancel, afterSubmit }: DeviceFormProps) {
  const utils = trpc.useContext();
  const { mutateAsync: update } = trpc.device.update.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof DeviceUpdateSchema>>({
    resolver: zodResolver(DeviceUpdateSchema),
    defaultValues: device,
  });
  const updateDevice: SubmitHandler<
    z.infer<typeof DeviceUpdateSchema>
  > = async (data) => {
    const res = await update(data);
    afterSubmit && afterSubmit();
    console.log("res", res);
    reset();
  };

  const { mutate } = trpc.device.delete.useMutation({
    onSuccess: () => {
      utils.device.invalidate();
    },
  });

  async function handleDeleteDevice() {
    try {
      await mutate({ id: device.id });
    } catch (error) {
      console.log("Error deleting provider:", error);
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(updateDevice)}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <FormLabel>Modelo</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Modelo"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<BsClipboard />}
          />
          <Input
            type="text"
            disabled={isSubmitting}
            placeholder="Modelo"
            w={"20rem"}
            h={"2rem"}
            isInvalid={errors.modelo?.message ? true : false}
            {...register("modelo")}
            key={device.id}
          />
        </InputGroup>

        <FormLabel>Serie</FormLabel>
        <InputGroup size="md">
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Phone"
            fontSize="1.2rem"
            w={"1.9rem"}
            h={"1.9rem"}
            icon={<BsClipboard />}
            mr={"0.5rem"}
          />
          <Input
            type="tel"
            placeholder="Serie"
            w={"20rem"}
            h={"2rem"}
            {...register("serie")}
            key={device.id}
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
              key={device.id}
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
        onClick={handleDeleteDevice}
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
