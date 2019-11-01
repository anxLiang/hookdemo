module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
    allowImportExportEverywhere: false,
    codeFrame: true
  },
  plugins: ["react", "react-hooks", "babel"],
  rules: {
    "no-console": 1,
    "no-unused-vars": 0,
    "react/prop-types": 0,
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": "warn", // 检查 effect 的依赖
    "babel/new-cap": 1,
    "babel/camelcase": 1,
    "babel/no-invalid-this": 1,
    "babel/quotes": 1,
    "babel/semi": 1,
    "babel/no-unused-expressions": 0,
    "babel/valid-typeof": 1
  }
};
