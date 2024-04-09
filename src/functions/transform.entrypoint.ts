// -----------------------------------------------------------------------------
// Purpose: Transform entrypoint
// this is the entrypoint that will be called when the transformer is invoked
// to transform an event, the return value of this function will be passed to
// the read model adapter.
// -----------------------------------------------------------------------------
import { env } from "../env";
import { db } from "../db";
import { base64Decode } from "../utils/base-64-decode";
import { createTable } from "../utils/create-table";
import { getSchema } from "../utils/get-schema";

export interface Input<T = any> {
  eventId: string;
  validTime: string;
  payload: T;
}

const MATCH_KEY = env.MATCH_KEY;
const TABLE_NAME = env.TABLE_NAME;
const TABLE_SCHEMA = env.TABLE_SCHEMA_BASE64 && base64Decode(env.TABLE_SCHEMA_BASE64);

export default async function(input: Input) {
  console.info(`Received event ${input.eventId}, with payload ${JSON.stringify(input.payload)} and valid time ${input.validTime}`);

  const combinedPayload = { eventid: input.eventId, validTime: input.validTime, ...input.payload };

  const schema = getSchema(TABLE_SCHEMA, combinedPayload);
  if (schema.error) {
    console.error("Failed to parse schema:", schema.error);
    return;
  }
  if (!schema.value) {
    console.error("Schema is empty");
    return;
  }

  const tableMissing = !await db.schema.hasTable(TABLE_NAME);
  if (tableMissing) {
    console.info(`Table "${TABLE_NAME}" does not exist! creating it now...`);
    await createTable(TABLE_NAME, schema.value);
  }

  // Process the payload to match the schema
  const finalPayload: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(schema.value)) {

    const finalName = value.mapFrom || name;
    const entry = combinedPayload[finalName];
    if (!entry) {
      console.warn(`Missing entry for ${finalName}`);
      continue;
    }

    if (typeof entry === "object") {
      console.debug(`Converting ${finalName} to JSON`);
      finalPayload[name] = JSON.stringify(entry);
      continue;
    }

    finalPayload[name] = entry;
  }

  if(MATCH_KEY){
    const result = await db(TABLE_NAME).insert(finalPayload).onConflict(MATCH_KEY).merge(finalPayload);
    if (result.length <= 0) {
      console.error("Failed to update data");
    }
  }else{
    const result = await db(TABLE_NAME).insert(finalPayload);
    if (result.length <= 0) {
      console.error("Failed to insert data");
    }
  }

  return finalPayload;
}