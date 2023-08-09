# Documentation for sigma-csv

---

## Initialize the parser

```ts
import { initialize } from "sigma-csv";

// we initialize the parser with the default options and also you can extend the parser further if needed.
initialize((registry) => {
    registry.registerParser("", (params) => {
        // do something
    });
})
```

## Parsing a CSV file

```ts
import { readCSV } from "sigma-csv";

const result = readCSV(csvfile, {
    /**
     * The delimiter used to separate columns in the CSV file.
     * @default ","
     */
    delimiter?: string;

    /**
     * parse the result as a json string.
     * @default false
     */
    asJSON?: boolean;

    /**
     * If you want the parser to include the header in the result.
     * @default true
     */
    includeHeaders?: boolean;

    /**
     * Override the headers. Recommended when you have set "includeHeaders" to false.
     * else the result will be an array of arrays.
     */
    headers?: string[];

    /**
     * Converts the string to a number if possible.
     * @default false
     */
    parseNumbers?: boolean;

	/**
	 * 
	 */
	schema?: ZodSchema;
});
```

when will the result be a json, array of arrays or array of objects?

1. if you have set "asJSON" to true, the result will be a json string.
2. if you have set "includeHeaders" to false, the result will be an array of arrays. ( like a table with rows and columns)
3. if you have set "includeHeaders" to true, the result will be an array of objects.
4. if you have set "headers" to an array of strings, the result will be an array of objects.