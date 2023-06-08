/*
 * @Author: Hansen
 * @Date: 2023-06-06 17:49:08
 * @LastEditors: Hansen
 * @LastEditTime: 2023-06-06 18:03:10
 * @FilePath: \zsks-userd:\project\my-react-countup\src\Babel-test\11document.js
 * @Description: 生成文档
 */
const { transformFromAstSync } = require('@babel/core');
const  parser = require('@babel/parser');
const autoDocumentPlugin = require('./11document-plugin.js');
const fs = require('fs');
const path = require('path');

const sourceCode = fs.readFileSync(path.join(__dirname, './11document-source.js'), {
    encoding: 'utf-8'
});

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['typescript']
});

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [[autoDocumentPlugin, {
        outputDir: path.resolve(__dirname, './docs'),
        format: 'markdown'// html // json
    }]]
});

console.log(code);
