// eslintrc.cjs

module.exports = {
  root: true, // 停止向上查找父级目录中的配置文件
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 解决使用自动导入api报错
    "./.eslintrc-auto-import.json",
    // 单独解决使用vue api时报错
    // 'vue-global-api',
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier", // eslint-config-prettier 的缩写
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser", // 指定要使用的解析器
  // 给解析器传入一些其他的配置参数
  parserOptions: {
    ecmaVersion: "latest", // 支持的es版本
    parser: "@typescript-eslint/parser",
    sourceType: "module", // 模块类型，默认为script，我们设置为module
  },
  plugins: ["vue", "@typescript-eslint", "prettier"], // eslint-plugin- 可以省略
  rules: {
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
};
