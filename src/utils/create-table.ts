import { TableSchema } from "../contracts/tableSchema";
import { db } from "../db";
import { Knex } from "knex";


// todo: adjust this code to be more context aware once we support multiple dbs (e.g. not all dbs support json, so instead, it would be stringified and stored as a text or string)
const COLUMN_FACTORY: TableMapper = {
  "text": (table: Knex.CreateTableBuilder, key: string) => table.text(key).nullable(),
  "string": (table: Knex.CreateTableBuilder, key: string) => table.string(key).nullable(),
  "integer": (table: Knex.CreateTableBuilder, key: string) => table.integer(key).nullable(),
  "decimal": (table: Knex.CreateTableBuilder, key: string) => table.decimal(key).nullable(),
  "boolean": (table: Knex.CreateTableBuilder, key: string) => table.boolean(key).nullable(),
  "json": (table: Knex.CreateTableBuilder, key: string) => table.json(key).nullable(),
  "jsonb": (table: Knex.CreateTableBuilder, key: string) => table.jsonb(key).nullable(),
  "uuid": (table: Knex.CreateTableBuilder, key: string) => table.uuid(key).nullable(),
  "timestamp": (table: Knex.CreateTableBuilder, key: string) => table.timestamp(key).nullable(),
  "binary": (table: Knex.CreateTableBuilder, key: string) => table.binary(key).nullable(),
  "biginteger": (table: Knex.CreateTableBuilder, key: string) => table.bigInteger(key).nullable(),
  "float": (table: Knex.CreateTableBuilder, key: string) => table.float(key).nullable(),
  "double": (table: Knex.CreateTableBuilder, key: string) => table.double(key).nullable(),
  "increments": (table: Knex.CreateTableBuilder, key: string) => table.increments(key).nullable(),
  "time": (table: Knex.CreateTableBuilder, key: string) => table.time(key).nullable(),
  "date": (table: Knex.CreateTableBuilder, key: string) => table.date(key).nullable(),
  "datetime": (table: Knex.CreateTableBuilder, key: string) => table.datetime(key).nullable(),
};

export async function createTable(tableName: string, schema: TableSchema) {
  await db.schema.createTable(tableName, (table) => {
    for (const [key, value] of Object.entries(schema)) {

      if (!value.type) {
        console.error(`Type missing for key ${key}`);
        continue;
      }

      const factory = COLUMN_FACTORY[value.type.toLowerCase()];
      if (!factory) {
        console.error(`Unknown type ${value.type} for key ${key}`);
        continue;
      }

      const builder = factory(table, key);
      if (value.primary) {
        builder.primary();
      }

    }
  });
  console.info(`Table ${tableName} created successfully.`);
}

type TableMapper = {
  [key: string]: (table: Knex.CreateTableBuilder, key: string) => Knex.ColumnBuilder
};

