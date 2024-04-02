import { TableSchema } from "../contracts/tableSchema";
import { db } from "../db";
import { Knex } from "knex";

const COLUMN_FACTORY: TableMapper = {
  "text": (table: Knex.CreateTableBuilder, key: string) => table.text(key),
  "string": (table: Knex.CreateTableBuilder, key: string) => table.string(key),
  "integer": (table: Knex.CreateTableBuilder, key: string) => table.integer(key),
  "decimal": (table: Knex.CreateTableBuilder, key: string) => table.decimal(key),
  "boolean": (table: Knex.CreateTableBuilder, key: string) => table.boolean(key),
  "json": (table: Knex.CreateTableBuilder, key: string) => table.json(key),
  "jsonb": (table: Knex.CreateTableBuilder, key: string) => table.jsonb(key),
  "uuid": (table: Knex.CreateTableBuilder, key: string) => table.uuid(key),
  "timestamp": (table: Knex.CreateTableBuilder, key: string) => table.timestamp(key),
  "binary": (table: Knex.CreateTableBuilder, key: string) => table.binary(key),
  "bigInteger": (table: Knex.CreateTableBuilder, key: string) => table.bigInteger(key),
  "float": (table: Knex.CreateTableBuilder, key: string) => table.float(key),
  "double": (table: Knex.CreateTableBuilder, key: string) => table.double(key),
  "increments": (table: Knex.CreateTableBuilder, key: string) => table.increments(key),
  "time": (table: Knex.CreateTableBuilder, key: string) => table.time(key),
  "date": (table: Knex.CreateTableBuilder, key: string) => table.date(key),
  "dateTime": (table: Knex.CreateTableBuilder, key: string) => table.dateTime(key),
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

      console.log("dog", factory);
      factory(table, key);
    }
  });
  console.info(`Table ${tableName} created successfully.`);
}

type TableMapper = {
  [key: string]: (table: Knex.CreateTableBuilder, key: string) => void
};

