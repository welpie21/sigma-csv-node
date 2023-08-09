export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;
export type Tuple<T, L extends number> = [...T[]] & { length: L };

/**
 * Support of escape characters types for the CSV parser.
 */
export type EscapeCharacterType = "n" | "t";