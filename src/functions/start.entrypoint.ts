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

  if (CLEAR_TABLE_ON_START) {
    console.info("CLEAR_TABLE_ON_START tag detected! dropping table if it exists...");
    await db.schema.dropTableIfExists(TABLE_NAME);
    console.info(`Table ${TABLE_NAME} dropped!`);
  }
}