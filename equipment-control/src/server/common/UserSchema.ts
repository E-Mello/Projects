import { string, z } from "zod";

export const UserCreateSchema = z.object({
  username: z.string({
    invalid_type_error: "Apenas para lembrar que da para mexer com erro",
  }),
  password: z.string(),
  telefone: z.string().nullish(),
  nome: z.string(),
  cpf: z.string(),
  email: z.string().nullish(),
  setor: z.string(),
  cargo: z.string(),
});

export const UserUpdateSchema = z.object({
  id: z.string(),
  username: z
    .string({
      invalid_type_error: "Apenas para lembrar que da para mexer com erro",
    })
    .optional(),
  password: string().optional(),
  telefone: z.string().nullish(),
  nome: z.string().optional(),
  cpf: z.string().optional(),
  email: z.string().nullish(),
  setor: z.string().optional(),
  cargo: z.string().optional(),
});

export const UserLoginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const UserResponseSchema = z.object({
  id: z.string(),
  username: z.string({
    invalid_type_error: "Apenas para lembrar que da para mexer com erro",
  }),
  password: string().optional(),
  telefone: z.string().nullish(),
  nome: z.string(),
  cpf: z.string(),
  email: z.string().nullish(),
  setor: z.string(),
  cargo: z.string(),
});

export const UserResponseListSchema = z.array(UserResponseSchema);
