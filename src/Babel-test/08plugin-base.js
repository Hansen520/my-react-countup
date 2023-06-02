/*
 * @Author: Hansen
 * @Date: 2023-06-01 11:13:30
 * @LastEditors: Hansen
 * @LastEditTime: 2023-06-01 17:03:13
 * @FilePath: \zsks-userd:\project\my-react-countup\src\Babel-test\08plugin-base.js
 * @Description: babel内置的能力
 */

const { declare } = require('@babel/helper-plugin-utils');

/* 这段代码是解析的操作 */
declare(api => {
    api.assertVersion(7);

    return {
        name: "syntax-function-bind",

        manipulateOptions(opts, parserOpts) {
            parserOpts.plugins.push("functionBind")
        }
    }
});

const hoistVariables = require('@babel/helper-hoist-variables').default;
const plugin = function () {
    visitor: {
        VariableDeclaration: (path) => {
            hoistVariables(path.parentPath, (id) => {
                path.scope.parent.push({
                    id: path.scope.generateUidIdentifier(id.name)
                });
                return id;
            }, 'const' );
        }
    }
}

const importModule = require('@babel/helper-module-imports');

const plugin1 = function ({ template }) {
    visitor: {
        Program: (path) => {
            const reactIdentifier = importModule.addDefault(path, 'lodash',{
                nameHint: '_'
            });
            path.node.body.push(template.ast(`const get = _.get`));
        }
    }
} 
