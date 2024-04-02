// -----------------------------------------------------------------------------
// Purpose: Start entrypoint
// this is the entrypoint that will be called when the transformer is started
// -----------------------------------------------------------------------------

import { db } from "../db";
import { env } from "../env";

const TABLE_NAME = env.TABLE_NAME;
const CLEAR_TABLE_ON_START = env.CLEAR_TABLE_ON_START.toLowerCase() === "true";

export default async function() {
  console.log("Hello from start");

  if (CLEAR_TABLE_ON_START && await db.schema.hasTable(TABLE_NAME)) {
    console.log(`Table "${TABLE_NAME}" exists and CLEAR_TABLE_ON_START is set to true, clearing table...`);
    await db(TABLE_NAME).delete();
    console.log(`Table ${TABLE_NAME} cleared`);
  }
}