import { z, ZodSchema } from "zod";

/**
 * CSV specific types
 */
export interface CSVParseOptions<
	I extends boolean = boolean,
	T extends {} = {},
	Schema extends ZodSchema<T> = ZodSchema<T>
> {

	/**
	 * The delimiter used to separate columns in the CSV file.
	 * @default ","
	 */
	delimiter?: "," | "." | (string & {});

	/**
	 * Define object keys for each column in the CSV file.
	 * @default false
	 */
	includeHeaders?: I;

	/**
	 * Returns zod error instead of throwing it.
	 * @default false
	 */
	safe?: boolean;

	/**
	 * After parsing the CSV, the result will be validated against this schema.
	 * recommended when you have set "includeHeaders".
	 */
	schema?: I extends true ? Schema : never;

	/**
	 * Omit a selected field from the result.
	 */
	omit?: ((keyof z.infer<Schema>) | (string & {}))[];

	/**
	 * Transform a selected field to a different type.
	 */
	transform?: Partial<
		Record<
			keyof z.infer<Schema>,
			(value: string) => boolean | string | number | Date
		>
	>;
}