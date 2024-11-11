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
  LOG_LEVEL: z.string().optional().default("INFO"),
  REQUIRE_VALUE_SET_PATH: z.string().optional().default(""),
});

export const env = envSchema.parse(process.env);