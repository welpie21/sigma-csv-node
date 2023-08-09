import { 
	parseDelimiter, 
	parseDoubleQuotes, 
	parseEmpty, 
	parseIgnore, 
	parseNewline 
} from "./parsers";
import type { CSVParseParams } from ".";

export const parserRegistry = new Map<string, (params: CSVParseParams) => void>([
	[",", parseDelimiter],
	[";", parseDelimiter],
	["\n", parseNewline],
	["\r", parseIgnore],
	[" ", parseEmpty],
	["\"", parseDoubleQuotes]
]);