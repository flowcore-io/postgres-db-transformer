import { z } from "zod";

export const SourceEventDto = z.object({
  eventId: z.string(),
  dataCore: z.string(),
  aggregator: z.string(),
  eventType: z.string(),
  timeBucket: z.string(),
  metadata: z.record(z.string()).optional(),
  serializedPayload: z.string(),
  validTime: z.string(),
});

export const TransformDataDto = z.object({
  destination: z.string(),
  definition: z.any(),
  event: SourceEventDto,
});

export type TransformData = z.infer<typeof TransformDataDto>;
