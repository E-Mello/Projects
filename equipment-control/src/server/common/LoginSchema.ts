import * as z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(5).max(10),
  password: z.string().min(8),
});
