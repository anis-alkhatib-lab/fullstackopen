import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import stylisticJs from "@stylistic/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],

    plugins: {
      js,
      react: pluginReact,
      "@stylistic/js": stylisticJs,
    },

    extends: [
      "js/recommended",
      pluginReact.configs.flat.recommended,
    ],

    languageOptions: {
      globals: {
        ...globals.browser,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      // React
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // Style rules
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/quotes": ["error", "double"],
      "@stylistic/js/semi": ["error", "always"],

      // General rules
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],

      // Allow console.log during development
      "no-console": "off",
    },
  },

  {
    ignores: [
      "dist/**",
      "node_modules/**",
    ],
  },
]);
