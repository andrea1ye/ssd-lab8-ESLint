import js from "@eslint/js";
import globals from "globals";
import pluginSecurity from "eslint-plugin-security";
import pluginSecurityNode from "eslint-plugin-security-node";
import pluginNoUnsanitized from "eslint-plugin-no-unsanitized";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      js,
      security: pluginSecurity,
      "security-node": pluginSecurityNode,
      "no-unsanitized": pluginNoUnsanitized
    },
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,

      // Security plugin rules
      ...pluginSecurity.configs.recommended.rules,

      // Security-node plugin rules
      ...pluginSecurityNode.configs.recommended.rules,

      // No-unsanitized plugin rules (manually added, since no flat config)
      "no-unsanitized/method": "error",
      "no-unsanitized/property": "error",

      // Extra: specific rule override
      "security/detect-eval-with-expression": "error"
    }
  }
]);
