import { defineConfig } from "vitest/config";

export default defineConfig((event) => ({
	publicDir: event.command === "serve" ? "public" : undefined,
	build: {
		lib: {
			entry: "lib/index.ts",
			name: "sigma-csv",
			fileName: "sigma-csv"
		},
		rollupOptions: {
			external: ["zod"],
			output: {
				globals: {
					zod: "Zod"
				}
			}
		}
	},
	test: {
		globals: true,
		include: ["**/*.test.ts"],
		dir: "./test"
	}
}));