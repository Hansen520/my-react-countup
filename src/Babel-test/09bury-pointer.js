/*
 * @Author: Hansen
 * @Date: 2023-06-02 10:40:25
 * @LastEditors: Hansen
 * @LastEditTime: 2023-06-02 15:01:33
 * @FilePath: \zsks-userd:\project\my-react-countup\src\Babel-test\09bury-pointer.js
 * @Description: 埋点
 */
const { transformFromAstSync } = require('@babel/core');
const  parser = require('@babel/parser');
const autoTrackPlugin = require('./09bury-pointer-plugin');
const fs = require('fs');
const path = require("path");

const sourceCode = fs.readFileSync(path.join(__dirname, './09bury-pointer-source.js'), {
    encoding: 'utf-8'
});

const ast = parser.parse(sourceCode, {
    sourceType: 'unambiguous' // 根据import和export导出
});

const { code } = transformFromAstSync(ast, sourceCode, {
    plugins: [[autoTrackPlugin, {
        trackerPath: 'tracker' // 模块名称为tracker
    }]]
});

console.log(code, 29);
