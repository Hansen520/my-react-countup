/*
 * @Author: Hansen
 * @Date: 2023-05-23 14:26:09
 * @LastEditors: Hansen
 * @LastEditTime: 2023-05-23 15:00:54
 * @FilePath: \user-endd:\project\my-react-countup\src\Babel-test\console-test02.js
 * @Description: description
 */
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");

const sourceCode = `
    console.log(1);

    function func() {
        console.info(2);
    }

    export default class Clazz {
        say() {
            console.debug(3);
        }
        render() {
            return <div>{console.error(4)}</div>
        }
    }
`;

const ast = parser.parse(sourceCode, {
  sourceType: "unambiguous", // 让 babel 根据内容是否包含 import、export 来自动设置
  plugins: ["jsx"],
});

traverse(ast, {
  CallExpression(path, state) {
    if (
      types.isMemberExpression(path.node.callee) &&
      path.node.callee.object.name === "console" &&
      ["log", "info", "error", "debug"].includes(path.node.callee.property.name)
    ) {
        const { line, column } = path.node.loc.start;
        path.node.arguments.unshift(types.stringLiteral(`文件名filename: (${line}, ${column})`));
    }
  },
});

const { code, map } = generate(ast);
console.log(code, map, 18);
