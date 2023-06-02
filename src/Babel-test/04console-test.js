/*
 * @Author: Hansen
 * @Date: 2023-05-23 14:26:09
 * @LastEditors: Hansen
 * @LastEditTime: 2023-05-31 17:09:59
 * @FilePath: \zsks-userd:\project\my-react-countup\src\Babel-test\04console-test.js
 * @Description: 将console.log()改写成插件,功能就是在console前面添加一行
 */
const generate = require("@babel/generator").default;
const { transformFileSync } = require('@babel/core');
// const insertParametersPlugin = require('./plugin/parameters-insert-plugin');
const path = require('path');


const targetCalleeName = ["log", "info", "error", "debug"].map((item) => `console.${item}`);

// 1编写插件
/*
  可以用此导出插件，然后const insertParametersPlugin = require('./plugin/parameters-insert-plugin');方式引用
  export.module = function ({ types, template }) {...
*/
const insertParametersPlugin = function ({ types, template }) {
  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.isNew) {
          return;
        }
        const calleeName = generate(path.node.callee).code;

        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start;

          const newNode = template.expression(
            `console.log("${state.filename || "unkown filename"}: (${line}, ${column})")`
          )();
          newNode.isNew = true;
          console.log(path.findParent((path) => path.isJSXElement()), 38);
          if (path.findParent((path) => path.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]));
            path.skip();
          } else {
            // 在前面新增加一行
            path.insertBefore(newNode);
          }
        }
      },
    },
  };
};

// 2然后通过 @babel/core 的 transformSync 方法来编译代码，并引入上面的插件：
const { code } = transformFileSync(path.join(__dirname, './console-text-by-04-test.js'), {
  plugins: [insertParametersPlugin],
  parserOpts: {
    sourceType: 'unambiguous',
    plugins: ['jsx']
  }
})
console.log(code, 59);