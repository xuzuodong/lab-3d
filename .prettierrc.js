module.exports = {
  extends: ["prettier"],
  singleQuote: true, // 使用单引号
  printWidth: 110, // 超过最大值换行
  htmlWhitespaceSensitivity: "ignore",
  semi: false, // 结尾不用分号
  arrowParens: 'always', // 箭头函数只有一个参数时，必用括号包裹之
}
