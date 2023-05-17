import {
  Box,
  Button,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import {
  MdAccountCircle,
  MdEmail,
  MdGroupWork,
  MdLock,
  MdPhone,
  MdWork,
} from "react-icons/md";

import { BiRename } from "react-icons/bi";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import type { UserResponseSchema } from "../server/common/UserSchema";
import { UserUpdateSchema } from "../server/common/UserSchema";
import { trpc } from "../utils/trpc";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type UserFormProps = {
  user: z.infer<typeof UserResponseSchema>;
  onCancel: () => void;
  afterSubmit?: () => void;
};

export function UserForm({ user, onCancel, afterSubmit }: UserFormProps) {
  const [show, setShow] = React.useState(false);
  const handleShowPassword = () => setShow(!show);
  const utils = trpc.useContext();
  const { mutateAsync: update } = trpc.user.update.useMutation({
    onSuccess: () => {
      utils.user.getAll.invalidate();
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: user,
  });
  const updateUser: SubmitHandler<z.infer<typeof UserUpdateSchema>> = async (
    data
  ) => {
    const res = await update(data);
    afterSubmit && afterSubmit();
    console.log("res", res);
    reset();
  };

  const { mutate } = trpc.user.delete.useMutation({
    onSuccess: () => {
      utils.user.invalidate();
    },
  });

  async function handleDeleteUser() {
    try {
      await mutate({ id: user.id });
    } catch (error) {
      console.log("Error deleting User:", error);
    }
  }

  return (
    <Box as="form" onSubmit={handleSubmit(updateUser)}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
      >
        <FormLabel>Username</FormLabel>
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
            placeholder="Write one username"
            w={"20rem"}
            h={"2rem"}
            isInvalid={errors.username?.message ? true : false}
            {...register("username")}
            key={user.id}
          />
        </InputGroup>

        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Password"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<MdLock />}
          />
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter one password"
            w={"20rem"}
            h={"2rem"}
            {...register("password")}
            key={user.id}
          />
          <InputRightElement width="4.5rem" right={"5rem"}>
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
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
            {...register("telefone")}
            key={user.id}
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
            key={user.id}
          />
        </InputGroup>
        <FormLabel>CPF / CNPJ</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Password"
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
            key={user.id}
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
            key={user.id}
          />
        </InputGroup>
        <FormLabel>Setor</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Password"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<MdGroupWork />}
          />
          <Input
            type="text"
            w={"20rem"}
            placeholder="Write your sector"
            h={"2rem"}
            {...register("setor")}
            key={user.id}
          />
        </InputGroup>
        <FormLabel>Cargo</FormLabel>
        <InputGroup>
          <IconButton
            variant="outline"
            colorScheme="blackAlpha"
            aria-label="Password"
            w={"1.9rem"}
            h={"1.9rem"}
            mr={"0.5rem"}
            icon={<MdWork />}
          />
          <Input
            type="text"
            w={"20rem"}
            placeholder="Write your position in the company"
            h={"2rem"}
            {...register("cargo")}
            key={user.id}
          />
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
        onClick={handleDeleteUser}
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
