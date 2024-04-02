// -----------------------------------------------------------------------------
// Purpose: Transform entrypoint
// this is the entrypoint that will be called when the transformer is invoked
// to transform an event, the return value of this function will be passed to
// the read model adapter.
// -----------------------------------------------------------------------------
import { env } from "../env";
import { db } from "../db";
import { jsonTryParse } from "../utils/json-try-parse";
import { base64Decode } from "../utils/base-64-decode";
import { TableSchema } from "../contracts/tableSchema";

interface Input<T = any> {
  eventId: string;
  validTime: string;
  payload: T;
}

const TABLE_NAME = env.TABLE_NAME;
const TABLE_SCHEMA = base64Decode(env.TABLE_SCHEMA_BASE64) ?? "{}";

export default async function(input: Input) {
  console.info(`Received event ${input.eventId}, with payload ${JSON.stringify(input.payload)} and valid time ${input.validTime}`);

  const schema = jsonTryParse<TableSchema>(TABLE_SCHEMA);
  if (schema.error) {
    console.error("Failed to parse schema:", schema.error);
    return;
  }
  if (!schema.value) {
    console.error("Schema is empty");
    return;
  }

  if (!await db.schema.hasTable(TABLE_NAME)) {
    console.warn(`Table ${TABLE_NAME} does not exist, creating it now...`);
    await createTable(schema.value);
  }

  // only take the payload entries that are in the schema
  const validKeys = Object.keys(schema.value);
  const combinedPayload = { eventid: input.eventId, validTime: input.validTime, ...input.payload };
  const schemaOnlyPayload = Object.fromEntries(
    Object.entries(combinedPayload).filter(([key]) => validKeys.includes(key))
      .map(([key, value]) => {
        if (typeof value == "object") {
          return [key, JSON.stringify(value)];
        }
        return [key, value];
      }),
  );

  const result = await db(TABLE_NAME).insert(schemaOnlyPayload);
  if (result.length <= 0) {
    console.error("Failed to insert data");
  }

  console.info("data inserted");
  return schemaOnlyPayload;
}

const createTable = async (schema: TableSchema) => {
  await db.schema.createTable(TABLE_NAME, (table) => {
    for (const [key, value] of Object.entries(schema)) {
      switch (value.type) {
        case "text":
          table.text(key);
          break;
        case "string":
          table.string(key);
          break;
        case "number":
          table.float(key);
          break;
        case "boolean":
          table.boolean(key);
          break;
        default:
          console.error(`Unknown type ${value} for key ${key}`);
      }
    }
  });
  console.info(`Table ${TABLE_NAME} created successfully.`);
};