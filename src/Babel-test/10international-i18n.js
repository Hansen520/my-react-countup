/*
 * @Author: Hansen
 * @Date: 2023-06-02 15:12:11
 * @LastEditors: Hansen
 * @LastEditTime: 2023-06-02 17:52:04
 * @FilePath: \zsks-userd:\project\my-react-countup\src\Babel-test\10international-i18n.js
 * @Description: 国际化
 */
const { transformFromAstSync } = require('@babel/core');
const parser = require('@babel/parser');
const autoI18nPlugin = require('./10international-i18n-plugin');
const fs = require('fs');
const path = require('path');

const sourceCode = fs.readFileSync(path.join(__dirname, './10international-i18n-source.js'), {
    encoding: 'utf-8'
});

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous',
    plugins: ['jsx']
});

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [[autoI18nPlugin, {
        outputDir: path.resolve(__dirname, './output')
    }]]
});

console.log(code);