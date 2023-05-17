import { Prisma } from "@prisma/client";
import { z } from "zod";

export const DeviceCreateSchema = z.object({
  modelo: z.string(),
  serie: z.string(),
  user_last_update: z.string().optional(),
  active: z.boolean().optional(),
});

export const DeviceUpdateSchema = z.object({
  id: z.string(),
  modelo: z.string().optional(),
  serie: z.string().optional(),
  vinc_id_prest: z.string().optional(),
  user_last_update: z.string().optional(),
  active: z.boolean().optional(),
});

export const DeviceResponseSchema = z.object({
  id: z.string(),
  modelo: z.string(),
  serie: z.string(),
  vinc_id_prest: z.string().optional(),
  user_last_update: z.string().optional(),
  active: z.boolean(),
});

export const DeviceResponseListSchema = z.array(DeviceResponseSchema);
