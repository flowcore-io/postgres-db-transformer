// -----------------------------------------------------------------------------
// Purpose: Start entrypoint
// this is the entrypoint that will be called when the transformer is started
// -----------------------------------------------------------------------------

import { db } from "../db";
import { env } from "../env";
import { Logger } from "../utils/logger";

const TABLE_NAME = env.TABLE_NAME;
const CLEAR_TABLE_ON_START = env.CLEAR_TABLE_ON_START.toLowerCase() === "true";

export default async function() {

  if (CLEAR_TABLE_ON_START) {
    Logger.info("CLEAR_TABLE_ON_START tag detected! dropping table if it exists...");
    await db.schema.dropTableIfExists(TABLE_NAME);
    Logger.info(`Table ${TABLE_NAME} dropped!`);
  }
}