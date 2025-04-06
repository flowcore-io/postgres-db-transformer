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
import { getSchema, tryExtendSchemaWithKeyValue } from "../utils/get-schema";
import { Logger } from "../utils/logger";
import { get } from "lodash";


export interface Input<T = any> {
  eventId: string;
  validTime: string;
  payload: T;
}

const MATCH_KEY = env.MATCH_KEY;
const TABLE_NAME = env.TABLE_NAME;
const TABLE_SCHEMA = env.TABLE_SCHEMA_BASE64 && base64Decode(env.TABLE_SCHEMA_BASE64);
const CONVERT_VALUES = env.CONVERT_VALUES;

export default async function(input: Input) {
  Logger.debug(`Received event ${input.eventId}, with payload ${JSON.stringify(input.payload)} and valid time ${input.validTime}`);

  const combinedPayload = { eventid: input.eventId, validTime: input.validTime, ...input.payload };
  
  const schema = getSchema(TABLE_SCHEMA, combinedPayload);
  if (schema.error) {
    Logger.error("Failed to parse schema:", schema.error);
    return;
  }
  if (!schema.value) {
    Logger.error("Schema is empty");
    return;
  }


  let finalSchema = schema.value;
  if (MATCH_KEY) {
    finalSchema = tryExtendSchemaWithKeyValue(
      finalSchema,
      MATCH_KEY,
      finalSchema[MATCH_KEY].mapFrom ? get(combinedPayload, finalSchema[MATCH_KEY].mapFrom):  combinedPayload[MATCH_KEY],
      { primary: true,  mapFrom: finalSchema[MATCH_KEY]?.mapFrom },
    );
  }


  const tableMissing = !await db.schema.hasTable(TABLE_NAME);
  if (tableMissing) {
    Logger.info(`Table "${TABLE_NAME}" does not exist! creating it now...`);
    await createTable(TABLE_NAME, finalSchema);
  }

  // Process the payload to match the schema
  const finalPayload: Record<string, unknown> = {};
  for (const [name, value] of Object.entries(finalSchema)) {

    const finalName = value.mapFrom || name;
    const entry = get(combinedPayload, finalName);
    if (!entry && value.required) {
      Logger.warn(`Missing entry for ${finalName}`);
      continue;
    }



    if (typeof entry === "object") {
      Logger.debug(`Converting ${finalName} to JSON`);
      finalPayload[name] = JSON.stringify(entry);
      continue;
    }
    if(CONVERT_VALUES === "true" &&  value.type === "integer") {
      try {
        if(entry === null || entry === undefined){
          finalPayload[name] = null;
          continue;
        }
        finalPayload[name] = Number.parseInt(entry, 10);
        Logger.debug(`Converting ${finalName} to integer '${entry}' -> '${finalPayload[name] }'` );

      }catch (e) {
        Logger.error(`Failed to convert ${finalName} to integer, setting to null`);
        finalPayload[name] = null;
      }
      continue;
    }
    finalPayload[name] = entry;
  }

  if (MATCH_KEY) {
    const result = await db(TABLE_NAME).insert(finalPayload).onConflict(MATCH_KEY).merge(finalPayload);
    if (result.length <= 0) {
      Logger.error("Failed to update data");
    }
  } else {
    const result = await db(TABLE_NAME).insert(finalPayload);
    if (result.length <= 0) {
      Logger.error("Failed to insert data");
    }
  }

  return finalPayload;
}