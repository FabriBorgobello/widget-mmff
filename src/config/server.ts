/**
 * Server-side configuration.
 * NOTE: Do not include this variables in client-side code.
 */
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
});
