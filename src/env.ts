import { z } from "zod";
import { config } from "dotenv";

config();

export const envSchema = z.object({
  CONNECTION_STRING: z.string().min(1),
  TABLE_NAME: z.string().min(1).refine((value) => !value.includes(" "), {
    message: "TABLE_NAME must not contain spaces",
  }),
  TABLE_SCHEMA_BASE64: z.string().optional().default(""),
  CLEAR_TABLE_ON_START: z.string().default("false"),
  MATCH_KEY: z.string().optional().default(""),
  CONVERT_VALUES: z.string().optional().default("false"),
});

export const env = envSchema.parse(process.env);