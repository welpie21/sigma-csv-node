import { Tuple } from "./global";

export interface CSVParseParams {

    /**
     * The csv string that the parser is going to parse / process all of it.
     */
    csv: string;

    /**
     * The current index the parser is at.
     */
    index: number;

    /**
     * The results of the parsing operating(s) are being stored in here.
     */
    table: Tuple<Tuple<any, number>, number>;

    /**
     * The value of the current character the parser is currently on.
     */
    current: string;

    /**
     * The index of the current row being parsed.
     */
    row: number;

    /**
     * Checks if the current character is wrapped inside quotes.
     */
    inQuotes: boolean;

    /**
     * Gives the next character where the parser is currently on.
     */
    nextChar: string;

    /**
     * Gives the previous character where the parser is currently on.
     */
    previousChar: string;

    /**
     * The value what the column is holding.
     */
    value: string;

    /**
     * The current column the parser is currently on.
     */
    column: number;

    /**
     * What the parser needs to parse to separate the values.
     */
    delimiter: string;

    /**
     * A function that adds a new character to the current value.
     */
    add: (str: string) => void;

    /**
     * resets the value and the isQuoted variable.
     */
    reset: (current: boolean, quoted: boolean) => void;

    /**
     * Adds a new row to the table.
     */
    addRow: () => void;

    /**
     * Skips the parser to the x amount of characters.
     */
    skip: (amount: number) => void;
}

/**
 * The result of a parse operation. Contains the parsed data and information in a JSON format or an array of objects.
 */
export type CSVParseResult<T> = Tuple<Tuple<any, number>, number> | T[];
