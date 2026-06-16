import { z } from "zod";

export const reportSchema = z.object({
  description: z.string().min(3).max(500),
  lat: z.number(),
  lng: z.number(),
});

export type ReportSchema = z.infer<typeof reportSchema>;
