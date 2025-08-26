import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  // JS + TS setup
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      "unused-imports": unusedImports,
    },
    extends: [
      js.configs.recommended,        // JS recommended
      ...tseslint.configs.recommended, // TS recommended
    ],
    rules: {
      "no-unused-vars": "off", // disable core rule
      "@typescript-eslint/no-unused-vars": "off", // disable TS rule
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },

  // CSS setup
  {
    files: ["**/*.css"],
    language: "css/css",
    plugins: { css },
    extends: ["css/recommended"],
    rules: {
      "css/no-invalid-properties": "off",
    },
  },
]);
