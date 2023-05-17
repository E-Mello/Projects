import { z } from "zod";

export const guestbookInput = z.object({
  name: z.string(),
  message: z.string().min(2, 'Minimo 2 caracteres'),
});
