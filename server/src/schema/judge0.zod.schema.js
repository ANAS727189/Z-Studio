import { z } from "zod";

export const judge0Schema = z.object({
  language_id: z.number().int().positive("Language ID must be a positive integer"),
  source_code: z.string().min(1, "Source code is required"),
  stdin: z.string().optional(),
});
