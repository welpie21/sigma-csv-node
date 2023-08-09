import { parserRegistry } from "./initializer";
import { ReadOptions } from "./constants/options";
import type { ZodIssue } from "zod";
import type { CSVParseOptions, CSVParseParams } from ".";
import type { Tuple } from "./typings/global";

type CSVSuccessResult<T> = {
	success: true;
	data: T[];
};

type CSVErrorResult = {
	success: false;
	errors: ZodIssue[];
};

type CSVResult<T> = CSVSuccessResult<T> | CSVErrorResult;

export function readCSV<
	T extends {},
	I extends boolean = false
>(
	csv: string,
	options?: CSVParseOptions<I, T>
): CSVResult<I extends true ? T : string[]> {

	csv = csv.trim();

	const {
		delimiter,
		includeHeaders,
		transform,
		safe,
		schema,
		omit
	} = options ?? ReadOptions as unknown as CSVParseOptions<I, T>;

	let table: Tuple<Tuple<any, number>, number> = [];
	let result: T[] | string[][] = [];

	let value: string = "";
	let row: number = 0;
	let isQuoted: boolean = false;
	let column: number = 0;

	// add a new character to the value.
	const add = (str: string) => {
		value += str;
	};

	// reset the value.
	const reset = (current: boolean, quoted: boolean) => {

		if (current) {
			value = "";
		}

		if (quoted) {
			isQuoted = false;
		}
	};

	// add a new row to the table.
	const addRow = () => {
		if (table[++row] === undefined) {
			table[row] = [];
		}
	};

	/**
	 * pre-define options for the parameters.
	 * we do not want to re-apply / re-calculate each loop.
	 */
	const preParams: Partial<CSVParseParams> = {
		add,
		reset,
		addRow,
		csv,
		delimiter: delimiter || ","
	};

	const skip = (_current: number) => (amount: number) => {
		_current += amount;
	};

	for (let i = 0; i < csv.length; i++) {

		const char = csv[i];
		const next = csv[i + 1];
		const prev = csv[i - 1];

		const params: Partial<CSVParseParams> = {
			current: char,
			inQuotes: isQuoted,
			table: table,
			previousChar: prev,
			nextChar: next,
			value,
			column,
			index: i,
			row,
			skip: skip(i)
		};

		if (parserRegistry.has(char)) {
			const args = Object.assign(params, preParams) as CSVParseParams;
			parserRegistry.get(char)!(args);
		}
		else {
			add(char);
		}
	}

	if (value !== "") {

		// check if the row exists.
		if (table[row] === undefined) {
			table[row] = [];
		}

		table[row].push(value);
	}

	// delete the last row.
	table.pop();

	const keys: (keyof T)[] = table[0].slice();
	table.shift();

	// constructing the table object.
	if (includeHeaders) {

		for (const row of table.values()) {

			const obj = {} as any;

			// assign the values to the object with the correct fields.
			for (const [j, key] of keys.entries()) {

				// omit the key if it is in the omit array.
				if (omit?.includes(key)) {
					continue;
				}

				const hasTransform = transform?.[key] !== undefined;
				obj[key] = hasTransform ? transform[key]!(row[j]) : row[j];
			}

			result.push(obj);
		}
	}

	if (schema !== undefined) {

		// validate the result when safe is enabled.
		if (safe) {
			const validation = schema.array().safeParse(result);

			if (!validation.success) {
				return {
					errors: validation.error.errors,
					success: false
				};
			}
		} else {
			schema.array().parse(result);
		}
	}

	return {
		data: result as any,
		success: true
	};
}