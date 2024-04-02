export type JsonTryParseResult<T extends object> = {
  value: T | null;
  error: string | null;
}

export function jsonTryParse<T extends object>(str: string): JsonTryParseResult<T> {
  try {
    return { value: JSON.parse(str) as T, error: null };
  } catch (e: any) {
    return { value: null, error: e.message };
  }
}