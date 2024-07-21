import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReactRefresh from "eslint-plugin-react-refresh";
import pluginReactJsxRuntimeConfig from "eslint-plugin-react/configs/jsx-runtime.js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type { import("eslint").Linter.FlatConfig[] } */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    ignores: [
      "vite.config.ts",
      "eslint.config.js",
      "src/ising.*",
      "node_modules/**",
      "dist/**",
    ],
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: "./tsconfig.app.json",
        sourceType: "module",
      },
    },
    plugins: {
      "react-hooks": fixupPluginRules(pluginReactHooks),
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      "@typescript-eslint/consistent-type-imports": "error",
      "react-refresh/only-export-components": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  ...fixupConfigRules(pluginReactConfig),
  ...fixupConfigRules(pluginReactJsxRuntimeConfig),
];
