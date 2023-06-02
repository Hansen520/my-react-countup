/*
 * @Author: Hansen
 * @Date: 2023-05-23 14:26:09
 * @LastEditors: Hansen
 * @LastEditTime: 2023-05-23 15:16:53
 * @FilePath: \user-endd:\project\my-react-countup\src\Babel-test\console-test03.js
 * @Description: description
 */
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const types = require("@babel/types");
const template = require("@babel/template").default;

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

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(item => `console.${item}`);

traverse(ast, {
  CallExpression(path, state) {
    if (path.node.isNew) {
      return;
    }
    const calleeName = generate(path.node.callee).code;
    if (targetCalleeName.includes(calleeName)) {
      const { line, column } = path.node.loc.start;

      const newNode = template.expression(`console.log("filename: (${line}, ${column})")`)();
      newNode.isNew = true;

      if (path.findParent(path => path.isJSXElement())) {
        path.replaceWith(types.arrayExpression([newNode, path.node]));
        path.skip();// 跳过子节点处理
      } else {
        path.insertBefore(newNode);
      }
    }
  },
});

const { code, map } = generate(ast);
console.log(code, map, 18);
