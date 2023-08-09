import {defineConfig} from "vite";
import {resolve} from "path";

export default defineConfig({
    build: {
        minify: false,
        lib: {
            entry: resolve(__dirname, "lib/index.ts"),
            name: "index",
            fileName: "sigma-csv"
        },
        rollupOptions: {
            output: {
                extend: true,
                minifyInternalExports: true
            },
            external: (id: string) => {
                return id.includes("/test/") || id.includes("/assets/");
            }
        }
    },
    esbuild: {
        sourcemap: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
        target: "esnext"
    }
});