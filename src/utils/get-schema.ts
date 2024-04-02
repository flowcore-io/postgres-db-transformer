import { TableSchema } from "../contracts/tableSchema";
import { jsonTryParse, JsonTryParseResult } from "./json-try-parse";

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
    switch (typeof value) {
      case "string":
        schema[key] = { type: "string" };
        break;
      case "number":
        schema[key] = { type: "decimal" };
        break;
      case "boolean":
        schema[key] = { type: "boolean" };
        break;
      case "object":
        schema[key] = { type: "json" };
      default:
        schema[key] = { type: "text" };
    }
  }
  return schema;
}