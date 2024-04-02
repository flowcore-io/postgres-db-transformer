import {z} from "zod";

export const TransformerBlueprintDto = z.object({
  name: z.string(),
  version: z.string(),
  artifactUrl: z.string(),
  entrypoint: z.string(),
  runtime: z.string(),
  startTimeTimeout: z.coerce.number().default(5000),
  processTimeout: z.coerce.number().default(2000),
  port: z.coerce.number(),
});

export type TransformerBlueprint = z.infer<typeof TransformerBlueprintDto>;
