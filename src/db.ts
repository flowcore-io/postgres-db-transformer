import { knex } from "knex";
import { env } from "./env";

export const db = knex({
  client: "pg",
  connection: {
    connectionString: env.CONNECTION_STRING,
  },
});