import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  ...nextVitals,
  {
    rules: {
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn"
    },
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "dist/**",
      "build/**",
      "postcss.config.mjs",
      "next.config.mjs",
      "tailwind.config.ts"
    ]
  }
];

export default eslintConfig;
