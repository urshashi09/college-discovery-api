import { z } from "zod";

export const predictorSchema = z.object({
  examName: z.string().min(1),
  category: z.string().min(1),
  rank: z.number().positive()
});