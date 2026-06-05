import nextVitals from "eslint-config-next/core-web-vitals";
import reactHooksPlugin from "eslint-plugin-react-hooks";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      ".open-next/**",
      "node_modules/**",
      "out/**",
      "dist/**",
      "build/**",
      "postcss.config.mjs",
      "next.config.mjs",
      "tailwind.config.ts"
    ]
  },
  ...nextVitals,
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn"
    }
  }
];

export default eslintConfig;
