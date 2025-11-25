import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default defineConfig([
  // Ignore build output and config files
  globalIgnores(["dist", "src/firebase.js"]),
  {
    extends: [
      js.configs.all,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      // NOTE: Disabled import sorting for now due to conflicts between single vs multi imports.
      "sort-imports": "off",
    },
  },
]);
