Changelog

## 0.2.3 - parse improvements
- 

## 0.2.2 - parser fixes
- fixed parser that didn't work correctly
- added new option to safely parse the schema with `safe` field.
- added new option to omit / ignore a field with the `omit` field.

## 0.2.1 - recursive type fix
- fixed that typescript broke in visual studio code when you implementer schema in `readCSV`. When issue appears you should update to another zod version.

## 0.2.0 - Transforming support
- Added transform values per field
- removed initialize function
- typing improvements
- decleration files is now generated in tsup instead of vite dts plugin.

## 0.1.0 - Added ZOD schema support
- Added ZOD schema support
- Added support for parsing numbers
- Added vitest and unit tests
- Improved typing when parsing CSV