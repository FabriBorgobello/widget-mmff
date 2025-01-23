import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import drizzle from "eslint-plugin-drizzle";
import prettierPlugin from "eslint-plugin-prettier/recommended";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  eslintConfigPrettier,
  prettierPlugin, // Prettier should be last
  {
    plugins: { drizzle },
    rules: {
      ...drizzle.configs.recommended.rules,
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "next/*", group: "external", position: "before" },
          ],
          pathGroupsExcludedImportTypes: ["react", "next/*"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "drizzle/enforce-delete-with-where": [
        "error",
        { drizzleObjectName: ["db"] },
      ],
      "import/named": "off",
    },
  },
];

export default eslintConfig;
