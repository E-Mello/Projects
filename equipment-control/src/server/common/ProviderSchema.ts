import { z } from "zod";

export const ProviderCreateSchema = z.object({
  codigo: z.string(),
  email: z.string(),
  nome: z.string(),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  tel_first: z.string(),
  tel_sec: z.string().optional(),
  active: z.boolean().optional(),
});

export const ProviderUpdateSchema = z.object({
  id: z.string(),
  codigo: z.string().optional(),
  email: z.string().optional(),
  nome: z.string().optional(),
  cpf: z.string().nullish(),
  cnpj: z.string().nullish(),
  tel_first: z.string().optional(),
  tel_sec: z.string().optional(),
  vinc_id_device: z.string().optional(),
  active: z.boolean().optional(),
});

export const ProviderResponseSchema = z.object({
  id: z.string(),
  codigo: z.string(),
  email: z.string(),
  nome: z.string(),
  cpf: z.string().nullish(),
  cnpj: z.string().nullish(),
  tel_first: z.string(),
  tel_sec: z.string().optional(),
  vinc_id_device: z.string().optional(),
  active: z.boolean(),
});

export const ProviderResponseListSchema = z.array(ProviderResponseSchema);
