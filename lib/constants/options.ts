import type { CSVParseOptions } from "../typings/options";

/**
 * Default values for read options
 */
export const ReadOptions: CSVParseOptions<true, false> = {
    delimiter: ",",
    includeHeaders: true
};