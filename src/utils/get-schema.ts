import { ColumnDefinition, TableSchema } from "../contracts/tableSchema";
import { jsonTryParse, JsonTryParseResult } from "./json-try-parse";

const AUTO_SCHEMA_FACTORY: Record<string, (value: unknown) => ColumnDefinition> = {
  "string": () => ({ type: "string" }),
  "boolean": () => ({ type: "boolean" }),
  "object": () => ({ type: "json" }),

  // note: if the value exceeds the decimal limit the db will throw this error:
  // "A field with precision 8, scale 2 must round to an absolute value less than 10^6."
  "number": (value: unknown) => ({ type: precisionBelowDouble(value as number) ? "decimal" : "double" }),
};

export function getSchema<T extends object>(schemaString: string | undefined, fallbackObject: T): JsonTryParseResult<TableSchema> {
  if (schemaString) {
    return jsonTryParse<TableSchema>(schemaString);
  }
  console.info("No schema provided, generating schema from input");

  return {
    value: generateSchemaFromInput(fallbackObject),
    error: null,
  };
}

function generateSchemaFromInput(input: object): TableSchema {
  const schema: TableSchema = {};
  for (const [key, value] of Object.entries(input)) {

    const factory = AUTO_SCHEMA_FACTORY[typeof value];
    if (!factory) {
      schema[key] = { type: "text" };
    }

    schema[key] = factory(value);
  }
  return schema;
}


function precisionBelowDouble(value: number): boolean {
  // note: if the value exceeds the decimal limit the db will throw this error:
  // "A field with precision 8, scale 2 must round to an absolute value less than 10^6."

  // Check if absolute value is less than 10^6
  if (Math.abs(value) >= 1000000) {
    return false;
  }

  // Check if there are up to 2 digits after decimal point
  const parts = value.toString().split(".");

  return !(parts.length > 1 && parts[1].length > 2);
}