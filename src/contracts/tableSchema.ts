export type TableSchema = {
  [key: string]: ColumnDefinition
}

export type ColumnDefinition = {
  type: string;
  mapFrom?: string;
  primary?: boolean;
  required?: boolean;
}