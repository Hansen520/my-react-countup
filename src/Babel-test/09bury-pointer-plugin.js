/*
 * @Author: Hansen
 * @Date: 2023-06-02 11:14:37
 * @LastEditors: Hansen
 * @LastEditTime: 2023-06-02 15:10:10
 * @FilePath: \zsks-userd:\project\my-react-countup\src\Babel-test\09bury-pointer-plugin.js
 * @Description: 函数埋点
 */
const { declare } = require("@babel/helper-plugin-utils");
const importModule = require("@babel/helper-module-imports");

const autoTrackPlugin = declare((api, options, dirname) => {
  api.assertVersion(7);
  // { trackerPath: 'tracker' } D:\project\my-react-countup\src\Babel-test
  return {
    visitor: {
      Program: {
        enter(path, state) {
          path.traverse({
            ImportDeclaration(curPath) {
            //   console.log(curPath.get("specifiers.0"), 21);
              // console.log(curPath.key,  curPath.get("source").node.value, options.trackerPath, 22);
              const requirePath = curPath.get("source").node.value;
              if (requirePath === options.trackerPath) {
                const specifierPath = curPath.get("specifiers.0");
                if (specifierPath.isImportSpecifier()) {
                  state.trackerImportId = specifierPath.toString();
                } else if (specifierPath.isImportNamespaceSpecifier()) {
                  state.trackerImportId = specifierPath.get("local").toString();
                }
                // console.log(state, 31);
                /* 结束遍历 */
                path.stop();
              }
            },
          });
        //   console.log(path.scope.generateUid("tracker"), 37);
        //   console.log(path.scope.generateUid("tracker"), 37);
          if (!state.trackerImportId) {
            state.trackerImportId = importModule.addDefault(path, "tracker", {
              nameHint: path.scope.generateUid("tracker"),
            }).name;
            state.trackerAST = api.template.statement(`${state.trackerImportId}()`)();
          }
        },
        
      },
      /* 函数插桩 */
      "ClassMethod|ArrowFunctionExpression|FunctionExpression|FunctionDeclaration"(path, state) {
        const bodyPath = path.get("body");
        console.log(state.trackerImportId, 51);
        if (bodyPath.isBlockStatement()) {
          bodyPath.node.body.unshift(state.trackerAST);
        } else {
          const ast = api.template.statement(`{${state.trackerImportId}();return PREV_BODY;}`)({
            PREV_BODY: bodyPath.node,
          });
          console.log(ast, 58);
          bodyPath.replaceWith(ast);
        }
      },
    },
  };
});

module.exports = autoTrackPlugin;
