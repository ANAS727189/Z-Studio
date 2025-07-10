import { z } from "zod";

export const zLangSchema = z.object({
  code: z.string().min(1, "Code is required"),
});
