import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypescriptConfig from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = [
  ...nextConfig,
  ...nextTypescriptConfig,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  prettierConfig,
];

export default eslintConfig;