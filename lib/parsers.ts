import type { CSVParseParams } from "./typings/registry";

/**
 * Pushes a new value to the desired column and row.
 * @param params 
 */
function pushValue(params: CSVParseParams) {
	if (params.table[params.row] === undefined) {
		params.table[params.row] = [];
	}

	params.table[params.row].push(params.value);
}

/**
 *
 * @param params
 */
export function parseDelimiter(params: CSVParseParams) {

	// if we are not in quotes, we can safely ignore the delimiter.
	if (params.inQuotes) {
		return;
	}

	// check if the passed in delimiter matches the current character.
	if (params.delimiter !== params.current) {
		return;
	}

	pushValue(params);
	params.reset(true, true);
}

/**
 * handles the parsing of a backslash character.
 * @param params
 */
export function parseNewline(params: CSVParseParams) {

	if (params.inQuotes) {
		return;
	}

	pushValue(params);

	params.addRow();
	params.reset(true, true);
	params.table.push([]);
}

/**
 * handles the parsing of double quotes.
 * @param params
 */
export function parseDoubleQuotes(params: CSVParseParams) {

	if (!params.inQuotes) {
		params.inQuotes = true;
		return;
	}
}

/**
 * handles the parsing of empty characters.
 */
export function parseEmpty(params: CSVParseParams) {
	params.add(" ");
}

/**
 * Ignores a character.
 */
export function parseIgnore() {
	
}